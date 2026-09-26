import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/cosmic'
import SubNav from '@/components/SubNav'
import FeaturedPost from '@/components/FeaturedPost'
import PostGrid from '@/components/PostGrid'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Netlify Blog — News, tutorials, and updates',
  description: 'The latest news, product updates, tutorials, and stories from the Netlify Blog.',
}

const PAGE_SIZE = 9

export default async function HomePage() {
  const { posts, total } = await getBlogPosts(PAGE_SIZE + 1, 0)
  const featured = posts[0]
  const gridPosts = posts.slice(1)

  if (!featured) {
    return (
      <>
        <SubNav />
        <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-white">No posts published yet</h1>
          <p className="mt-3 text-gray-400">Check back soon for news, tutorials, and updates.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <SubNav />
      <FeaturedPost post={featured} />
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <PostGrid
          initialPosts={gridPosts}
          total={Math.max(total - 1, 0)}
          pageSize={PAGE_SIZE}
          skipOffset={1}
        />
      </section>
    </>
  )
}