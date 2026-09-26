import Link from 'next/link'
import type { Blog } from '@/types'
import { formatPublishedDate, getDisplayAuthor, getDisplayCategory } from '@/lib/cosmic'
import CategoryTag from '@/components/CategoryTag'
import AuthorByline from '@/components/AuthorByline'

interface FeaturedPostProps {
  post: Blog
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const category = getDisplayCategory(post)
  const author = getDisplayAuthor(post)
  const date = formatPublishedDate(post)
  const image = post.metadata?.featured_image

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          {category && (
            <div className="mb-5">
              <CategoryTag category={category} size="md" />
            </div>
          )}
          <Link href={`/blog/${post.slug}`} className="group">
            <h1 className="text-3xl font-extrabold leading-tight text-white transition-colors group-hover:text-netlify-teal sm:text-4xl lg:text-[2.5rem]">
              {post.title}
            </h1>
          </Link>
          {post.metadata?.seo_description && (
            <p className="mt-4 line-clamp-3 text-base text-gray-400">{post.metadata.seo_description}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {author && <AuthorByline author={author} />}
            {date && <span className="text-sm text-gray-400">{date}</span>}
          </div>
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
