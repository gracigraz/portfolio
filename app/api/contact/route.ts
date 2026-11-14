import { Resend } from "resend";
import { requireEnv } from "@/lib/server/env";
import { getSupabaseAdmin } from "@/lib/server/supabaseAdmin";
import { validateContact } from "@/lib/validateContact";

const FROM = "Portfolio <onboarding@resend.dev>";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }
  const input = body as Record<string, unknown>;

  if (typeof input.company === "string" && input.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const result = validateContact(input);
  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }
  const { name, email, message } = result.data;

  const supabase = getSupabaseAdmin();
  const { data: row, error: insertError } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message })
    .select("id")
    .single();

  if (insertError) {
    console.error(`contact(): insert failed (code = ${insertError.code})`);
    return Response.json(
      { ok: false, error: "Could not send message" },
      { status: 500 },
    );
  }

  const sendError = await sendNotification({ name, email, message });

  const { error: updateError } = await supabase
    .from("contact_submissions")
    .update({ email_status: sendError ? "failed" : "sent" })
    .eq("id", row.id);

  if (updateError) {
    console.error(
      `contact(): status update failed (id = ${row.id}, code = ${updateError.code})`,
    );
  }
  if (sendError) {
    console.error(
      `contact(): email failed (id = ${row.id}, error = ${sendError})`,
    );
  } else {
    console.info(`contact(): sent (id = ${row.id})`);
  }

  return Response.json({ ok: true });
}

async function sendNotification({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<string | null> {
  try {
    const resend = new Resend(requireEnv("RESEND_API_KEY"));
    const { error } = await resend.emails.send({
      from: FROM,
      to: requireEnv("CONTACT_TO_EMAIL"),
      replyTo: email,
      subject: `Portfolio message from ${name.replace(/\s+/g, " ")}`,
      text: `${message}\n\nFrom: ${name}\nEmail: ${email}`,
    });
    return error ? error.name : null;
  } catch {
    return "send threw";
  }
}
