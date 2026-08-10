import type { InputHTMLAttributes, ReactNode } from 'react'

const BOX = [
  'appearance-none size-6 shrink-0 mt-px cursor-pointer',
  'rounded-[7px] border border-ardoise bg-blanc',
  'checked:bg-jaune checked:border-noir',
  "checked:after:content-[''] checked:after:block checked:after:mx-auto checked:after:mt-[3px]",
  'checked:after:h-[13px] checked:after:w-[7px] checked:after:rotate-[42deg]',
  'checked:after:border-r-[3px] checked:after:border-b-[3px] checked:after:border-noir',
  'focus-visible:outline-[3px] focus-visible:outline-nuit focus-visible:outline-offset-2',
  'disabled:bg-gris disabled:cursor-not-allowed',
].join(' ')

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  id: string
  children: ReactNode
}

/**
 * Case à cocher. `defaultChecked` n’est jamais posé par défaut : le consentement
 * newsletter doit rester décoché (règle 4).
 */
export function Checkbox({ id, children, className, ...props }: CheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <input id={id} type="checkbox" className={[BOX, className].filter(Boolean).join(' ')} {...props} />
      <label htmlFor={id} className="text-small cursor-pointer">
        {children}
      </label>
    </div>
  )
}
