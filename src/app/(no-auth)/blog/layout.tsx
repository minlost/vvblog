import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Navigation } from '@/components/navbar/navigation'

export const metadata: Metadata = {
  title: 'VVBlog',
  description: 'A personal blog made by VV',
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
