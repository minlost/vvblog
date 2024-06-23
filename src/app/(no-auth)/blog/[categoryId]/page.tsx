import { Breadcrumbs } from '@/components/ui/custom-global/breadcrumb/breadcrumbs'

const HARDCODED_ARTICLE = {
  id: '1',
  title: 'My first article',
  content: 'My first article content',
  category: {
    id: '1',
    title: 'My first category',
    slug: 'my-first-category',
  },
}

export default function CategoryPage() {
  return (
    <main className="container">
      <Breadcrumbs
        breadcrumbs={[
          {
            title: 'Blog',
            href: '/blog',
          },
          {
            title: HARDCODED_ARTICLE.category.title,
            href: `/blog/${HARDCODED_ARTICLE.category.slug}`,
          },
        ]}
      />
    </main>
  )
}
