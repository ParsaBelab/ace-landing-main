import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
}

if (!anon) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// ✅ Client-side (safe for frontend)
export const supabase = createClient(url, anon)

// ✅ Server-side only (API routes / server actions)
export const supabaseAdmin = serviceRole
  ? createClient(url, serviceRole, {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  : null