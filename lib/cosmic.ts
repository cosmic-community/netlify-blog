import { createBucketClient } from '@cosmicjs/sdk'
import type { Blog, BlogListResult, DisplayCategory } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export function getDateValue(item: {
  metadata?: { published_at?: string | null } | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.metadata?.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

export function formatPublishedDate(post: Blog): string {
  const raw = post.metadata?.published_at || post.modified_at || post.created_at
  if (!raw) return ''
  const time = Date.parse(raw)
  if (Number.isNaN(time)) return ''
  return new Date(time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const CATEGORIES: DisplayCategory[] = [
  { name: 'Product News', color: '#5cebdf' },
  { name: 'Engineering', color: '#f9c74f' },
  { name: 'Company News', color: '#f94144' },
  { name: 'Case Studies', color: '#90be6d' },
  { name: 'Tutorials', color: '#9d8cff' },
  { name: 'News & Announcements', color: '#f48fb1' },
]

const DEFAULT_CATEGORY: DisplayCategory = { name: 'News & Announcements', color: '#5cebdf' }

export function getDisplayCategory(post: { slug: string; id: string }): DisplayCategory {
  const key = post.slug || post.id || 'default'
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i)) % CATEGORIES.length
  }
  return CATEGORIES[hash] ?? DEFAULT_CATEGORY
}

async function fetchAllBlogPosts(): Promise<Blog[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)
      .limit(1000)

    return (response.objects as Blog[]).sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch blog posts')
  }
}

export async function getBlogPosts(limit: number, skip: number): Promise<BlogListResult> {
  const all = await fetchAllBlogPosts()
  const total = all.length
  const posts = all.slice(skip, skip + limit)
  return { posts, total }
}

export async function getBlogPostBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)
    return (response.object as Blog) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch blog post')
  }
}

export async function getRecentBlogPosts(excludeSlug: string, limit: number): Promise<Blog[]> {
  const all = await fetchAllBlogPosts()
  return all.filter((p) => p.slug !== excludeSlug).slice(0, limit)
}