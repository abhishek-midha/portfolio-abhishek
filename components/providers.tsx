'use client'

import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'
import { GsapScrollProvider } from '@/components/gsap-scroll-provider'

export function Providers({ children }: { children?: ReactNode }) {
  return (
    <GsapScrollProvider>
      <Toaster />
      {children}
    </GsapScrollProvider>
  )
}
