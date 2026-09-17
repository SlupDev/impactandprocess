import { FloatingActions } from '@/components/sections/floating-actions'
import { SiteFooter } from '@/components/sections/site-footer'
import { SiteHeader } from '@/components/sections/site-header'

export default function SiteLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <FloatingActions />
    </>
  )
}
