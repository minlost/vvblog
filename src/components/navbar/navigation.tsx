import Link from 'next/link'

import { NavigationLink } from '@/components/navbar/navigation-link'
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { NavigationLinkOpener } from '@/components/navbar/navigation-link-opener'

interface Category {
  title: string
  slug: string
}

const navigationLinks = [
  {
    title: 'home',
    href: '/',
  },
  {
    title: 'blog',
    href: '/blog',
    canBeOpened: true,
  },
  {
    title: 'about',
    href: '/about',
  },
]
const HARDCODED_CATEGORIES: Record<string, Category[]> = {
  blog: [
    {
      title: 'category 1',
      slug: 'category-1',
    },
    {
      title: 'category 2',
      slug: 'category-2',
    },
    {
      title: 'category 3',
      slug: 'category-3',
    },
  ],
}

const hasCategories = (
  key: string,
): key is keyof typeof HARDCODED_CATEGORIES => {
  return key in HARDCODED_CATEGORIES
}

export const Navigation = () => {
  return (
    <div className="container">
      <Link href="/">
        <h1 className="text-4xl font-semibold">VVBlog</h1>
      </Link>
      <div className="mt-10">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-x-2">
            {navigationLinks.map((link) =>
              link.canBeOpened && hasCategories(link.title) ? (
                <NavigationLinkOpener
                  key={link.title}
                  link={link}
                  categories={HARDCODED_CATEGORIES[link.title]}
                />
              ) : (
                <NavigationLink key={link.title} link={link} />
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}
