'use client'

import Link from 'next/link'
import { useState } from 'react'

import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface BlogCategories {
  title: string
  slug: string
}

interface NavigationLinkOpenerProps {
  link: {
    title: string
    href: string
  }
  categories: BlogCategories[]
}

export const NavigationLinkOpener = ({
  link,
  categories,
}: NavigationLinkOpenerProps) => {
  const [isOpened, setIsOpened] = useState(false)

  const pathname = usePathname()

  return (
    <NavigationMenuItem
      className={cn(
        'text-lg hover:text-red-500 transition-all relative',
        pathname === link.href && 'text-red-500',
      )}
      key={link.title}
    >
      <Popover open={isOpened} onOpenChange={setIsOpened}>
        <PopoverTrigger asChild>
          <Link onMouseEnter={() => setIsOpened(true)} href={link.href}>
            {link.title}
          </Link>
        </PopoverTrigger>

        <PopoverContent
          onMouseLeave={() => setIsOpened(false)}
          className="p-0 absolute top-4"
          side="left"
        >
          <ul className="p-6 w-full grid grid-cols-2 gap-5">
            {categories.map((category) => (
              <li key={category.slug}>
                <NavigationMenuLink asChild>
                  <Link
                    className={cn(
                      'text-lg hover:text-red-500 transition-all',
                      pathname === `/blog/category/${category.slug}` &&
                        'text-red-500',
                    )}
                    href={`/blog/category/${category.slug}`}
                  >
                    {category.title}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </NavigationMenuItem>
  )
}
