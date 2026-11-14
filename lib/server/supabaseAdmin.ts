import "server-only";
import { createClient } from "@supabase/supabase-js";
import { requireEnv } from "@/lib/server/env";

export function getSupabaseAdmin() {
  return createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SECRET_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
