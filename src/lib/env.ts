import { z } from 'zod'

const isBrowser = typeof window !== 'undefined'

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  SUPABASE_URL: z.url(),
  SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  SUPABASE_GUIDES_BUCKET: z.string().min(1),

  RESEND_API_KEY: z.string().startsWith('re_'),
  RESEND_FROM: z.string().min(3),
  RESEND_REPLY_TO: z.email(),
  CONTACT_NOTIFICATION_EMAIL: z.email(),

  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  STRIPE_PRICE_HYBRID_FAT_BURNER: z.string().startsWith('price_'),

  CALENDLY_URL: z.url(),

  IP_HASH_SALT: z.string().min(32),
})

const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().min(1),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export type ClientEnv = z.infer<typeof clientEnvSchema>

function formatIssues(context: string, error: z.ZodError): string {
  const lines = error.issues.map((issue) => `  - ${issue.path.join('.') || '(racine)'} : ${issue.message}`)
  return [
    `Variables d’environnement ${context} invalides ou manquantes :`,
    ...lines,
    '',
    'Copie .env.example vers .env.local et renseigne les valeurs manquantes.',
  ].join('\n')
}

function readServerEnv(): ServerEnv {
  if (isBrowser) {
    return new Proxy({} as ServerEnv, {
      get(_target, property) {
        throw new Error(
          `serverEnv.${String(property)} a été lu depuis le navigateur. ` +
            'Les variables sans préfixe NEXT_PUBLIC_ restent serveur : passe la valeur en prop ' +
            'depuis un Server Component, ou utilise clientEnv.',
        )
      },
    })
  }

  const parsed = serverEnvSchema.safeParse(process.env)
  if (!parsed.success) {
    throw new Error(formatIssues('serveur', parsed.error))
  }
  return parsed.data
}

function readClientEnv(): ClientEnv {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
  })
  if (!parsed.success) {
    throw new Error(formatIssues('client', parsed.error))
  }
  return parsed.data
}

export const serverEnv = readServerEnv()

export const clientEnv = readClientEnv()
