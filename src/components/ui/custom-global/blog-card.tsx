import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  className?: string
  children?: React.ReactNode
}

export const BlogCard = ({ className, children }: BlogCardProps) => {
  return <Card className={cn('p-5', className)}>{children}</Card>
}
