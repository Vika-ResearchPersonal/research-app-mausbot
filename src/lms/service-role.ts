import { createClient } from "@supabase/supabase-js";

// The only module allowed to hold the service-role key (R42). Import it only
// from src/lms and src/app/api; eslint.config.mjs fails any other import.
export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service role is not configured");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
