import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { serverEnv } from '@/lib/env'
import type { Database } from '@/lib/types'

let cached: SupabaseClient<Database> | null = null

/**
 * Client `anon`, sans session. La RLS est active et aucune policy n’est définie pour ce rôle :
 * il ne peut donc rien lire des tables applicatives. Il n’existe que pour les lectures
 * publiques qui seraient explicitement ouvertes par une policy plus tard. Toute écriture ou
 * lecture de données personnelles passe par `lib/supabase/admin.ts`.
 */
export function getSupabaseReadClient(): SupabaseClient<Database> {
  cached ??= createClient<Database>(serverEnv.SUPABASE_URL, serverEnv.SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { 'x-application-name': 'impactandprocess-web' } },
  })
  return cached
}
