import { NextResponse } from 'next/server'
import { clientEnv } from '@/lib/env'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function goTo(etat: 'ok' | 'inconnu' | 'erreur') {
  const url = new URL('/desinscription', clientEnv.NEXT_PUBLIC_SITE_URL)
  url.searchParams.set('etat', etat)
  return NextResponse.redirect(url, { status: 303, headers: { 'cache-control': 'no-store' } })
}

/**
 * Désinscription en un clic, sans confirmation ni compte : c’est ce que promet le libellé
 * de la case à cocher, et ce qu’impose le RGPD. Accessible en GET et en POST, parce que
 * certains clients mail préchargent l’un ou l’autre via List-Unsubscribe.
 */
async function unsubscribe(token: string) {
  if (!UUID.test(token)) return goTo('inconnu')

  const { data, error } = await getSupabaseAdminClient()
    .from('leads')
    .update({ newsletter_opt_in: false, unsubscribed_at: new Date().toISOString() })
    .eq('unsubscribe_token', token)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('[desinscription] échec', error.message)
    return goTo('erreur')
  }

  return goTo(data ? 'ok' : 'inconnu')
}

export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params
  return unsubscribe(token)
}

export async function POST(_request: Request, context: { params: Promise<{ token: string }> }) {
  const { token } = await context.params
  return unsubscribe(token)
}
