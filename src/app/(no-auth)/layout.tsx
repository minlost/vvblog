import { Navigation } from '@/components/navbar/navigation'

export default function NoAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
