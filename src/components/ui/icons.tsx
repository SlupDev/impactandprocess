import type { SVGProps } from 'react'

/**
 * Les pictogrammes du site, en SVG inline : aucune icon font, aucun paquet à charger.
 * Ils sont toujours décoratifs — le sens est porté par le texte à côté — d’où
 * `aria-hidden` et `focusable="false"` posés une fois pour toutes ici.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>

function Svg({ className = 'size-[1.05em]', ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={className}
      {...props}
    />
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.4 21 3 12.6 3 2.99a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.59a1 1 0 0 1-.25 1l-2.22 2.22Z"
      />
    </Svg>
  )
}

export function RunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M13.5 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM9.8 8.9 7.4 21h2.2l1.6-7 2 2v5h2v-6.6l-2.1-2 .6-3a7 7 0 0 0 5.4 2.6v-2a5 5 0 0 1-4.3-2.4l-1-1.6a2 2 0 0 0-1.7-1c-.3 0-.6.1-.8.2L6 7.4V12h2V8.7l1.8-.7Z"
      />
    </Svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M9.6 16.9 4.8 12.1l1.4-1.4 3.4 3.4 8-8L19 7.5l-9.4 9.4Z"
      />
    </Svg>
  )
}

export function CrossIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M18.3 7.1 16.9 5.7 12 10.6 7.1 5.7 5.7 7.1l4.9 4.9-4.9 4.9 1.4 1.4 4.9-4.9 4.9 4.9 1.4-1.4-4.9-4.9 4.9-4.9Z"
      />
    </Svg>
  )
}

export function ArrowCircleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 14v-3H7v-2h6V8l4 4-4 4Z"
      />
    </Svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path fill="currentColor" d="M13.2 5.6 11.8 7l4 4H3v2h12.8l-4 4 1.4 1.4L19.6 12 13.2 5.6Z" />
    </Svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="m12 17.3-6.2 3.7 1.7-7L2 9.2l7.2-.6L12 2l2.8 6.6 7.2.6-5.5 4.8 1.7 7L12 17.3Z"
      />
    </Svg>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M19 3h-1V1h-2v2H8V1H6v2H5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 17H5V9h14v11Zm-8.2-1.6L7 14.6 8.4 13.2l2.4 2.4 4.8-4.8 1.4 1.4-6.2 6.2Z"
      />
    </Svg>
  )
}

export function ListIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M3 5h2v2H3V5Zm4 0h14v2H7V5ZM3 11h2v2H3v-2Zm4 0h14v2H7v-2Zm-4 6h2v2H3v-2Zm4 0h14v2H7v-2Z"
      />
    </Svg>
  )
}

export function ChartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M3 3h2v16h16v2H3V3Zm5 11h2v3H8v-3Zm3.5-5h2v8h-2V9ZM15 11h2v6h-2v-6Zm3.5-6h2v12h-2V5Z"
      />
    </Svg>
  )
}

export function UserCheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M10 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 4.5V21h11.2l-1.5-1.5 2.8-2.8-2.8-2.8.3-.3A17 17 0 0 0 10 14Zm7.9 6.7-2.8-2.9 1.4-1.4 1.4 1.4 3.5-3.5 1.4 1.4-4.9 5Z"
      />
    </Svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.2 1 .47 1.4.9.44.43.7.83.9 1.4.18.4.37 1 .43 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2a3.9 3.9 0 0 1-.9 1.4c-.44.44-.84.7-1.4.9-.4.18-1 .37-2.2.43-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.9 3.9 0 0 1-1.4-.9c-.44-.44-.7-.84-.9-1.4-.18-.4-.37-1-.43-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.47-1 .9-1.4a3.9 3.9 0 0 1 1.4-.9c.4-.18 1-.37 2.2-.43C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.83-.4.4-.63.8-.83 1.3-.16.4-.35 1-.4 2.1-.06 1.2-.07 1.6-.07 4.7s0 3.5.07 4.7c.05 1.1.24 1.7.4 2.1.2.5.44.9.83 1.3.4.4.8.63 1.3.83.4.16 1 .35 2.1.4 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.83.4-.4.63-.8.83-1.3.16-.4.35-1 .4-2.1.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.05-1.1-.24-1.7-.4-2.1a3.5 3.5 0 0 0-.83-1.3 3.5 3.5 0 0 0-1.3-.83c-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4Zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm5.2-3.1a1.2 1.2 0 1 1 0 2.3 1.2 1.2 0 0 1 0-2.3Z"
      />
    </Svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.5-.13-2.45 0-4.13 1.5-4.13 4.25V9.9H7.3V13h2.77v8h3.43Z"
      />
    </Svg>
  )
}

export function WhatsappIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.03L2 22l5.1-1.34A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.03.8.8-2.95-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06a6.7 6.7 0 0 1-3.35-2.93c-.25-.43.25-.4.72-1.33.08-.17.04-.31-.02-.44-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.85.84-.85 2.03s.87 2.35 1 2.51c.12.17 1.71 2.62 4.15 3.67 1.55.67 2.15.73 2.92.61.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.48-.3Z"
      />
    </Svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path fill="currentColor" d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </Svg>
  )
}
