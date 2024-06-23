'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import path from 'path'

interface BreadcrumbItem {
  title: string
  href: string
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[]
}

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-x-2">
      {breadcrumbs.map((breadcrumb, index) => (
        <Link
          key={breadcrumb.title}
          href={breadcrumb.href}
          className="hover:text-red-500 transition-all"
        >
          <div key={breadcrumb.title} className="flex gap-x-2 text-sm">
            <span className="text-gray-400">/</span>
            <span>{breadcrumb.title}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
