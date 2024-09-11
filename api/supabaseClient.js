// src/api/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_API_KEY } from "@env";


export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
