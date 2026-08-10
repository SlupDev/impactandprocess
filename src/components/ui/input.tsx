import type { InputHTMLAttributes } from 'react'

const BASE = [
  'w-full min-h-13 rounded-field px-4 py-3.5',
  'bg-blanc text-nuit text-body',
  'border border-ardoise',
  'placeholder:text-ardoise',
  'focus-visible:outline-[3px] focus-visible:outline-nuit focus-visible:outline-offset-2 focus-visible:border-nuit',
  // L’erreur se signale par la forme et le texte, pas par une couleur d’alerte.
  'aria-[invalid=true]:border-[3px] aria-[invalid=true]:border-noir',
  'disabled:bg-gris disabled:text-ardoise disabled:cursor-not-allowed',
].join(' ')

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  return <input className={[BASE, className].filter(Boolean).join(' ')} {...props} />
}
