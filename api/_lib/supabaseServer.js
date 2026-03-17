import { createClient } from '@supabase/supabase-js';

const FALLBACK_SUPABASE_URL = 'https://koodphmrnnyngpdzqvah.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb2RwaG1ybm55bmdwZHpxdmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTI2NTMsImV4cCI6MjA4MDc2ODY1M30.kEDecgxP2lEnchXDBOBz7aYlgYUBY65qI5O5NUs2VF4';

export const createSupabaseServerClient = () => {
  const supabaseUrl =
    process.env.SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL ||
    FALLBACK_SUPABASE_URL;

  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    FALLBACK_SUPABASE_ANON_KEY;

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};
