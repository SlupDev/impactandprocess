import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { serverEnv } from '@/lib/env'
import type { Database } from '@/lib/types'

if (typeof window !== 'undefined') {
  throw new Error(
    'lib/supabase/admin.ts a été importé côté client. Ce module porte la clé service_role, ' +
      'qui contourne la RLS : il ne doit être importé que depuis un route handler, ' +
      'une Server Action ou un Server Component.',
  )
}

let cached: SupabaseClient<Database> | null = null

/**
 * Client `service_role` : contourne la RLS. Serveur uniquement.
 */
export function getSupabaseAdminClient(): SupabaseClient<Database> {
  cached ??= createClient<Database>(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { 'x-application-name': 'impactandprocess-web-admin' } },
  })
  return cached
}
