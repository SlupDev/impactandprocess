export type ButtonVariant = 'primary' | 'secondary' | 'outline'

const BASE = [
  'inline-flex items-center justify-center gap-2 text-center',
  'min-h-14 px-6 py-4',
  'rounded-pill border-2',
  'font-black uppercase tracking-[0.03em] leading-tight',
  'transition-colors',
  'disabled:cursor-not-allowed disabled:border-trait disabled:bg-gris disabled:text-ardoise',
].join(' ')

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-jaune text-noir border-noir hover:bg-jaune-fonce',
  secondary: 'bg-nuit text-jaune border-jaune hover:bg-nuit-fonce',
  outline: 'bg-transparent text-nuit border-nuit hover:bg-nuit/5',
}

export function buttonClasses(
  variant: ButtonVariant = 'primary',
  fullWidth = true,
  className?: string,
): string {
  return [BASE, VARIANTS[variant], fullWidth ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ')
}
