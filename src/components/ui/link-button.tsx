import Link from 'next/link'
import type { ComponentProps } from 'react'
import { buttonClasses, type ButtonVariant } from '@/components/ui/button-classes'

interface LinkButtonProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: ButtonVariant
  fullWidth?: boolean
  className?: string
}

export function LinkButton({
  variant = 'primary',
  fullWidth = true,
  className,
  ...props
}: LinkButtonProps) {
  return <Link className={buttonClasses(variant, fullWidth, className)} {...props} />
}
