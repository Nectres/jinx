
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://nfhskpsofmdccutmxogf.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY 

export const supabase = createClient(supabaseUrl, supabaseKey)