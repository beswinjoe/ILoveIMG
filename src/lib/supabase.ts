import { createClient } from '@supabase/supabase-js';

// Server-side client with admin privileges (for API routes)
// Bypasses RLS to generate signed URLs and manage files
export const getSupabaseAdmin = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('Missing Supabase environment variables for server-side initialization.');
    return null;
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { 
      auth: { 
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      } 
    }
  );
};

// Client-side client for anonymous public access
export const getSupabaseClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase public environment variables.');
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
};
