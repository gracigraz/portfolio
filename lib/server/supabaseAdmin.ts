import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { requireEnv } from "@/lib/server/env";

let client: SupabaseClient | undefined;

// One client per warm serverless instance, created on first use.
export function getSupabaseAdmin() {
  client ??= createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return client;
}
