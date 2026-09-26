import Link from 'next/link'
import type { Blog } from '@/types'
import { formatPublishedDate, getDisplayAuthor, getDisplayCategory } from '@/lib/cosmic'
import CategoryTag from '@/components/CategoryTag'
import AuthorByline from '@/components/AuthorByline'

interface PostCardProps {
  post: Blog
}

export default function PostCard({ post }: PostCardProps) {
  const category = getDisplayCategory(post)
  const author = getDisplayAuthor(post)
  const date = formatPublishedDate(post)
  const image = post.metadata?.featured_image

  return (
    <article className="group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="overflow-hidden rounded-2xl">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            width={500}
            height={310}
            className="aspect-[16/10] w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[16/10] w-full rounded-2xl bg-gradient-to-br from-netlify-teal/20 to-white/5" />
        )}
      </Link>

      <div className="mt-4 flex items-center gap-3">
        {category && <CategoryTag category={category} />}
        {date && <span className="text-xs text-gray-500">{date}</span>}
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="mt-3 text-xl font-bold leading-snug text-white transition-colors group-hover:text-netlify-teal">
          {post.title}
        </h2>
      </Link>

      {author && (
        <div className="mt-4">
          <AuthorByline author={author} />
        </div>
      )}
    </article>
  )
}
