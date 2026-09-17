'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  LEAD_INITIAL_STATE,
  submitLead,
  type LeadFormState,
} from '@/components/forms/lead-actions'
import { DELIVERY_NOTICE, NEWSLETTER_CONSENT_LABEL, PRIVACY_LINK_LABEL } from '@/lib/consent'
import { HONEYPOT_FIELD } from '@/lib/lead'

interface LeadFormProps {
  slug: string
  guideTitle: string
  hasKcalVariant: boolean
  ctaLabel: string
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="primary" disabled={pending} aria-disabled={pending}>
      {pending ? 'Envoi en cours…' : label}
    </Button>
  )
}

function ErrorBanner({ state }: { state: LeadFormState }) {
  if (state.status !== 'erreur') return null
  return (
    <p
      role="alert"
      className="border-l-[3px] border-noir pl-3 text-small font-bold"
      data-code={state.code}
    >
      {state.message}
    </p>
  )
}

export function LeadForm({ slug, guideTitle, hasKcalVariant, ctaLabel }: LeadFormProps) {
  const [state, formAction] = useActionState(submitLead, LEAD_INITIAL_STATE)

  const emailError = state.status === 'erreur' && state.code === 'email-invalide' ? state.message : undefined
  const prenomError = state.status === 'erreur' && state.code === 'prenom-invalide' ? state.message : undefined
  const bannerVisible =
    state.status === 'erreur' && state.code !== 'email-invalide' && state.code !== 'prenom-invalide'

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 rounded-carte-photo border border-trait bg-gris p-6 sm:p-7"
    >
      <h2 className="titre text-h3">Reçois «&nbsp;{guideTitle}&nbsp;»</h2>

      <input type="hidden" name="slug" value={slug} />

      {/* Honeypot : invisible à l’œil, atteignable par un robot, jamais annoncé au lecteur d’écran. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${slug}-${HONEYPOT_FIELD}`}>Ne pas remplir</label>
        <input
          id={`${slug}-${HONEYPOT_FIELD}`}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {bannerVisible ? <ErrorBanner state={state} /> : null}

      {hasKcalVariant ? (
        <fieldset className="flex min-w-0 flex-col gap-2 border-0 p-0">
          <legend className="text-small font-bold">Quel format&nbsp;?</legend>
          <div className="flex gap-3">
            {(['1800', '2100'] as const).map((v, index) => (
              <label
                key={v}
                className="flex min-h-16 flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-field border border-trait bg-blanc p-3 text-center has-[:checked]:border-2 has-[:checked]:border-noir has-[:checked]:bg-noir has-[:checked]:text-blanc has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-noir has-[:focus-visible]:outline-offset-2"
              >
                <input
                  className="peer absolute size-0 opacity-0"
                  type="radio"
                  name="variant"
                  value={v}
                  defaultChecked={index === 0}
                />
                <span className="text-h3 font-black tabular-nums">
                  {v === '1800' ? '1 800' : '2 100'}
                </span>
                <span className="text-small text-ardoise peer-checked:text-blanc">kcal / jour</span>
              </label>
            ))}
          </div>
          <p className="text-small text-ardoise">Choisis le plus tenable, pas le plus bas.</p>
        </fieldset>
      ) : null}

      <Field id={`${slug}-prenom`} label="Prénom" error={prenomError} required>
        {(a) => <Input name="prenom" type="text" autoComplete="given-name" maxLength={80} {...a} />}
      </Field>

      <Field id={`${slug}-email`} label="Email" error={emailError} required>
        {(a) => <Input name="email" type="email" autoComplete="email" maxLength={254} {...a} />}
      </Field>

      <Checkbox id={`${slug}-newsletter`} name="newsletter">
        {NEWSLETTER_CONSENT_LABEL}
      </Checkbox>

      <p className="text-small text-ardoise">
        {DELIVERY_NOTICE}{' '}
        <a
          className="font-bold text-noir underline decoration-2 underline-offset-4"
          href="/politique-de-confidentialite"
        >
          {PRIVACY_LINK_LABEL}
        </a>
      </p>

      <SubmitButton label={ctaLabel} />

      <p className="text-small text-ardoise">
        Guide envoyé par email dans la minute. Aucun spam, désinscription en un clic.
      </p>

      <span className="sr-only" aria-live="polite">
        {state.status === 'erreur' ? `Erreur : ${state.message}` : ''}
      </span>
    </form>
  )
}
