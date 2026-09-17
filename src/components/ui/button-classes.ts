export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'clair' | 'outline-clair'

/**
 * Les boutons du site sont des pilules à libellé en casse normale — jamais de
 * capitales, elles ralentissent la lecture et cassent le rythme des sections.
 */
const BASE = [
  'inline-flex items-center justify-center gap-2.5 text-center',
  'min-h-[3.25rem] px-6 py-3.5',
  'rounded-pill border',
  'text-body font-bold leading-tight',
  'transition-colors',
  'disabled:cursor-not-allowed disabled:border-trait disabled:bg-gris disabled:text-ardoise',
].join(' ')

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-noir text-blanc border-noir hover:bg-encre',
  secondary: 'bg-blanc text-noir border-trait hover:bg-gris-fonce',
  outline: 'bg-transparent text-noir border-noir hover:bg-noir hover:text-blanc',
  // Sur les sections noires : le bouton devient le point clair.
  clair: 'bg-blanc text-noir border-blanc hover:bg-gris-fonce',
  'outline-clair': 'bg-transparent text-blanc border-blanc hover:bg-blanc hover:text-noir',
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
