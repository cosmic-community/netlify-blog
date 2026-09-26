import Link from 'next/link'
import type { DisplayCategory } from '@/types'

interface CategoryTagProps {
  category: DisplayCategory
  size?: 'sm' | 'md'
}

export default function CategoryTag({ category, size = 'sm' }: CategoryTagProps) {
  const padding = size === 'md' ? 'px-3 py-1.5' : 'px-3 py-1'
  const dot = size === 'md' ? 'h-2 w-2' : 'h-1.5 w-1.5'
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`inline-flex items-center gap-2 rounded-full bg-white/5 ${padding} transition-colors hover:bg-white/10`}
    >
      <span className={`${dot} rounded-full`} style={{ backgroundColor: category.color }} />
      <span className="text-xs font-semibold text-gray-200">{category.name}</span>
    </Link>
  )
}
