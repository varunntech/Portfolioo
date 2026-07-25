import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Helper to check if credentials are valid and not default placeholders
const isValidSupabaseConfig = () => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (supabaseUrl.includes('your_supabase_project_url')) return false;
  if (supabaseAnonKey.includes('your_supabase_anon_public_key')) return false;
  return supabaseUrl.startsWith('https://');
};

// Initialize Supabase client safely
export const supabase = isValidSupabaseConfig()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
