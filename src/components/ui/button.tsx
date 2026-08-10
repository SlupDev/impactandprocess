import type { ButtonHTMLAttributes } from 'react'
import { buttonClasses, type ButtonVariant } from '@/components/ui/button-classes'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = true,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, fullWidth, className)} {...props} />
}
