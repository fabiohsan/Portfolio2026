import { createClient } from '@supabase/supabase-js'

const fallbackSupabaseUrl = 'https://koodphmrnnyngpdzqvah.supabase.co'
const fallbackSupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvb2RwaG1ybm55bmdwZHpxdmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTI2NTMsImV4cCI6MjA4MDc2ODY1M30.kEDecgxP2lEnchXDBOBz7aYlgYUBY65qI5O5NUs2VF4'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || fallbackSupabaseUrl
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || fallbackSupabaseKey

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase env missing. Falling back to the public project config.')
}

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)
