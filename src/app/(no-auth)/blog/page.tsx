import BlogPostPreviewItem from '@/components/blog/blog-post-preview/blog-post-preview'
import dayjs from 'dayjs'
import Link from 'next/link'

const HARDCODED_BLOG_POSTS = Array.from({ length: 10 }, (_, i) => ({
  title: `Blog Post ${i + 1}`,
  slug: `blog-post-${i + 1}`,
  date: dayjs(),
  content: `Content for blog post ${i + 1}`,
}))

export default function BlogPage() {
  return (
    <main className="container flex flex-col gap-y-2 pt-10">
      {HARDCODED_BLOG_POSTS.map((post) => (
        <BlogPostPreviewItem key={post.slug} item={post} />
      ))}
    </main>
  )
}
