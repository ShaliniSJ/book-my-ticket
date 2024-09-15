// src/api/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_API_KEY } from "@env";

console.log("SUPABASE_URL", SUPABASE_URL, "SUPABASE_API_KEY", SUPABASE_API_KEY);
export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
