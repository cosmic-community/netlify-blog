import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'

interface SubNavProps {
  activeSlug?: string
}

const ACTIVE = 'border-netlify-teal text-netlify-teal font-semibold'
const INACTIVE = 'border-transparent text-gray-400 font-medium hover:text-white'

export default async function SubNav({ activeSlug }: SubNavProps) {
  let categories: { slug: string; title: string }[] = []
  try {
    categories = await getCategories()
  } catch {
    categories = []
  }

  const blogActive = activeSlug === undefined || activeSlug === 'all'

  return (
    <div className="border-b border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`whitespace-nowrap border-b-2 py-4 text-sm transition-colors ${blogActive ? ACTIVE : INACTIVE}`}
        >
          Blog
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className={`whitespace-nowrap border-b-2 py-4 text-sm transition-colors ${
              activeSlug === cat.slug ? ACTIVE : INACTIVE
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}
