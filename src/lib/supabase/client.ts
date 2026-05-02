import { createBrowserClient } from '@supabase/ssr'

// Tipos se regeneran con: npm run db:types tras crear el proyecto Supabase
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
