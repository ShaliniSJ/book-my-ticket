// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://krzaiusegdnvstakdgra.supabase.co/';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyemFpdXNlZ2RudnN0YWtkZ3JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4NzE2MzUsImV4cCI6MjA0MTQ0NzYzNX0.3gaZDcSm3KWzYL1UYIhBrbhyhmhhHcT2muNvIzH-WGc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
