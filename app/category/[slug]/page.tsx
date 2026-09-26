// app/category/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPosts, getCategories, getCategoryBySlug, getCategoryColor } from '@/lib/cosmic'
import SubNav from '@/components/SubNav'
import PostGrid from '@/components/PostGrid'

export const revalidate = 3600

const PAGE_SIZE = 9

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) {
    return { title: 'Category not found — Netlify Blog' }
  }
  return {
    title: `${category.title} — Netlify Blog`,
    description: category.metadata?.description || `${category.title} posts from the Netlify Blog.`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const { posts, total } = await getBlogPosts(PAGE_SIZE, 0, slug)
  const color = getCategoryColor(slug)

  return (
    <>
      <SubNav activeSlug={slug} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          <span className="text-xs font-semibold text-gray-200">
            {total} {total === 1 ? 'post' : 'posts'}
          </span>
        </div>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl">{category.title}</h1>
        {category.metadata?.description && (
          <p className="mt-4 max-w-2xl text-lg text-gray-400">{category.metadata.description}</p>
        )}
        <hr className="mt-12 border-white/10" />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <PostGrid
          key={slug}
          initialPosts={posts}
          total={total}
          pageSize={PAGE_SIZE}
          skipOffset={0}
          categorySlug={slug}
        />
      </section>
    </>
  )
}
