import type { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string
  optional?: boolean
}

export function Label({ children, optional = false, className, ...props }: LabelProps) {
  return (
    <label className={['text-small font-bold', className].filter(Boolean).join(' ')} {...props}>
      {children}
      {optional ? <span className="ml-2 font-normal text-ardoise">facultatif</span> : null}
    </label>
  )
}
