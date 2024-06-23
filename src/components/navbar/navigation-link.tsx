'use client'

import Link from 'next/link'

import { NavigationMenuItem } from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface NavigationLinkProps {
  link: {
    title: string
    href: string
  }
}

export const NavigationLink = ({ link }: NavigationLinkProps) => {
  const pathname = usePathname()

  return (
    <NavigationMenuItem
      className={cn(
        'text-lg hover:text-red-500 transition-all',
        pathname === link.href && 'text-red-500',
      )}
      key={link.title}
    >
      <Link href={link.href}>{link.title}</Link>
    </NavigationMenuItem>
  )
}
