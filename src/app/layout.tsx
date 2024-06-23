import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import './globals.css'

import { cn } from '@/lib/utils'
import { Navigation } from '@/components/navbar/navigation'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'VVBlog',
  description: 'A personal blog made by VV',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="cs">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased py-10',
          roboto.className,
        )}
      >
        {children}
      </body>
    </html>
  )
}
