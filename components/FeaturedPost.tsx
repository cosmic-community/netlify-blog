import Link from 'next/link'
import type { Blog } from '@/types'
import { formatPublishedDate, getDisplayCategory } from '@/lib/cosmic'

interface FeaturedPostProps {
  post: Blog
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const category = getDisplayCategory(post)
  const date = formatPublishedDate(post)
  const image = post.metadata?.featured_image

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: category.color }} />
            <span className="text-xs font-semibold text-gray-200">{category.name}</span>
          </div>
          <Link href={`/blog/${post.slug}`} className="group">
            <h1 className="text-3xl font-extrabold leading-tight text-white transition-colors group-hover:text-netlify-teal sm:text-4xl lg:text-[2.5rem]">
              {post.title}
            </h1>
          </Link>
          {post.metadata?.seo_description && (
            <p className="mt-4 line-clamp-3 text-base text-gray-400">{post.metadata.seo_description}</p>
          )}
          {date && <div className="mt-6 text-sm text-gray-400">{date}</div>}
        </div>

        <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl">
          {image ? (
            <img
              src={`${image.imgix_url}?w=1600&h=1000&fit=crop&auto=format,compress`}
              alt={post.title}
              width={800}
              height={500}
              className="aspect-[16/10] w-full rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-netlify-teal/20 to-white/5" />
          )}
        </Link>
      </div>
      <hr className="mt-12 border-white/10" />
    </section>
  )
}