import 'server-only'

import { Resend } from 'resend'
import { serverEnv } from '@/lib/env'
import {
  GuideDeliveryEmail,
  guideDeliveryText,
  type GuideDeliveryEmailProps,
} from '@/emails/guide-delivery'

let client: Resend | null = null

function getResend(): Resend {
  client ??= new Resend(serverEnv.RESEND_API_KEY)
  return client
}

export type SendResult = { ok: true; id: string | null } | { ok: false; reason: string }

export async function sendGuideEmail(
  to: string,
  props: GuideDeliveryEmailProps,
): Promise<SendResult> {
  try {
    const { data, error } = await getResend().emails.send({
      from: serverEnv.RESEND_FROM,
      replyTo: serverEnv.RESEND_REPLY_TO,
      to,
      subject: `Ton guide : ${props.guideTitle}`,
      react: GuideDeliveryEmail(props),
      text: guideDeliveryText(props),
      headers: { 'List-Unsubscribe': `<${props.unsubscribeUrl}>` },
    })

    if (error) return { ok: false, reason: error.message }
    return { ok: true, id: data?.id ?? null }
  } catch (cause) {
    return { ok: false, reason: cause instanceof Error ? cause.message : 'envoi impossible' }
  }
}
