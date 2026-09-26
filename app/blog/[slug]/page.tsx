// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogPostBySlug,
  getBlogPosts,
  getRecentBlogPosts,
  formatPublishedDate,
  getDisplayCategory,
  getDisplayAuthor,
} from '@/lib/cosmic'
import CategoryTag from '@/components/CategoryTag'
import AuthorByline from '@/components/AuthorByline'
import MarkdownContent from '@/components/MarkdownContent'
import PostCard from '@/components/PostCard'
import SubNav from '@/components/SubNav'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { posts } = await getBlogPosts(1000, 0)
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return { title: 'Post not found — Netlify Blog' }
  }

  const description = post.metadata?.seo_description || post.title
  const image = post.metadata?.featured_image

  return {
    title: `${post.title} — Netlify Blog`,
    description,
    openGraph: {
      title: post.title,
      description,
      images: image ? [`${image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`] : [],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const morePosts = await getRecentBlogPosts(slug, 3)
  const category = getDisplayCategory(post)
  const author = getDisplayAuthor(post)
  const date = formatPublishedDate(post)
  const image = post.metadata?.featured_image

  return (
    <>
      <SubNav activeSlug={category?.slug ?? 'none'} />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold text-netlify-teal hover:text-netlify-tealDark">
          ← Back to blog
        </Link>

        {category && (
          <div className="mt-6">
            <CategoryTag category={category} size="md" />
          </div>
        )}

        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {author && <AuthorByline author={author} showRole />}
          {date && <p className="text-sm text-gray-400">{date}</p>}
        </div>

        {image && (
          <img
            src={`${image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1000}
            height={560}
            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover"
          />
        )}

        <div className="mt-10">
          <MarkdownContent content={post.metadata?.content || ''} />
        </div>
      </article>

      {morePosts.length > 0 && (
        <section className="mx-auto max-w-7xl border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white">More from the blog</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {morePosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}