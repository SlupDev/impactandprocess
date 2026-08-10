import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

interface FieldRenderArgs {
  id: string
  'aria-describedby': string | undefined
  'aria-invalid': boolean | undefined
  required: boolean | undefined
}

interface FieldProps {
  id: string
  label: string
  hint?: string
  /** Message d’erreur : dit ce qui s’est passé et quoi faire. */
  error?: string
  optional?: boolean
  required?: boolean
  children: (args: FieldRenderArgs) => ReactNode
}

/**
 * Assemble libellé, champ, aide et erreur, et câble `aria-describedby` /
 * `aria-invalid` à la place de l’appelant, pour qu’on ne puisse pas l’oublier.
 */
export function Field({
  id,
  label,
  hint,
  error,
  optional = false,
  required,
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-aide` : undefined
  const errorId = error ? `${id}-erreur` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>

      {hint ? (
        <p id={hintId} className="text-small text-ardoise">
          {hint}
        </p>
      ) : null}

      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        required,
      })}

      {error ? (
        <p id={errorId} className="border-l-[3px] border-noir pl-3 text-small font-bold">
          {error}
        </p>
      ) : null}
    </div>
  )
}
