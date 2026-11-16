import { Resend } from "resend";
import { requireEnv } from "@/lib/server/env";
import { getSupabaseAdmin } from "@/lib/server/supabaseAdmin";
import { validateContact } from "@/lib/validateContact";

const FROM = "Portfolio <onboarding@resend.dev>";

let resendClient: Resend | undefined;

// One client per warm serverless instance, created on first use.
function getResend() {
  resendClient ??= new Resend(requireEnv("RESEND_API_KEY"));
  return resendClient;
}

// Far above any valid message (5,000 characters), so only abuse is rejected.
const MAX_BODY_BYTES = 20_000;

export async function POST(request: Request) {
  // Check the real body, not the Content-Length header, which can be absent
  // (chunked requests) or wrong.
  const raw = await request.text().catch(() => "");
  if (raw.length > MAX_BODY_BYTES) {
    return Response.json(
      { ok: false, error: "Request too large" },
      { status: 413 },
    );
  }

  try {
    return await handleContact(raw);
  } catch {
    // e.g. a missing environment variable: answer in the same JSON shape the
    // form expects, without leaking details.
    console.error("contact(): unexpected error");
    return Response.json(
      { ok: false, error: "Could not send message" },
      { status: 500 },
    );
  }
}

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function handleContact(raw: string) {
  const body: unknown = parseJson(raw);
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
    const resend = getResend();
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
