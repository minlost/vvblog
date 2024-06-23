import { BlogCard } from '@/components/ui/custom-global/blog-card'
import { formatDate } from '@/helpers/date-formater'
import { Dayjs } from 'dayjs'
import Link from 'next/link'

interface BlogItemPreview {
  title: string
  slug: string
  date: Dayjs
  content: string
}

interface BlogPostPreviewItemProps {
  item: BlogItemPreview
}

const BlogPostPreviewItem = ({ item }: BlogPostPreviewItemProps) => {
  return (
    <Link href={`/blog/${item.slug}`}>
      <BlogCard className="hover:bg-slate-100 duration-300 ease-in-out  ">
        <h3 className="text-2xl font-semibold">{item.title}</h3>
        <ul>
          <li className="text-sm">{formatDate(item.date)}</li>
          <li>{item.content}</li>
        </ul>
      </BlogCard>
    </Link>
  )
}

export default BlogPostPreviewItem
