'use client'

import { useState } from 'react'
import type { Blog } from '@/types'
import PostCard from '@/components/PostCard'

interface PostGridProps {
  initialPosts: Blog[]
  total: number
  pageSize: number
  skipOffset: number
}

export default function PostGrid({ initialPosts, total, pageSize, skipOffset }: PostGridProps) {
  const [posts, setPosts] = useState<Blog[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const hasMore = posts.length < total

  const loadMore = async () => {
    setLoading(true)
    setError(false)
    try {
      const skip = skipOffset + posts.length
      const response = await fetch(`/api/posts?skip=${skip}&limit=${pageSize}`)
      if (!response.ok) throw new Error('Failed to load posts')
      const data = await response.json()
      const newPosts: Blog[] = data.posts || []
      setPosts((prev) => [...prev, ...newPosts])
    } catch (err) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  if (posts.length === 0) {
    return <div className="py-16 text-center text-gray-400">No more posts to show right now.</div>
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <button
            onClick={loadMore}
            disabled={loading}
            className="rounded-full bg-white/5 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Loading…' : 'Load more'}
          </button>
          {error && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
        </div>
      )}
    </div>
  )
}