import { createBucketClient } from '@cosmicjs/sdk'
import type { Blog, BlogListResult, Category, DisplayAuthor, DisplayCategory } from '@/types'

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

// Preferred order for the blog sub-navigation (matches netlify.com/blog)
export const CATEGORY_ORDER = ['news', 'case-studies', 'tutorials', 'insights', 'changelog']

const CATEGORY_COLORS: Record<string, string> = {
  news: '#5cebdf',
  'case-studies': '#90be6d',
  tutorials: '#9d8cff',
  insights: '#f9c74f',
  changelog: '#f48fb1',
}

const DEFAULT_COLOR = '#5cebdf'

export function getCategoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] ?? DEFAULT_COLOR
}

export function getDisplayCategory(post: Blog): DisplayCategory | null {
  const cat = post.metadata?.category
  if (!cat || typeof cat !== 'object' || !cat.title) return null
  return { name: cat.title, slug: cat.slug, color: getCategoryColor(cat.slug) }
}

export function getDisplayAuthor(post: Blog): DisplayAuthor | null {
  const author = post.metadata?.author
  if (!author || typeof author !== 'object' || !author.title) return null
  const avatar = author.metadata?.avatar
  return {
    name: author.title,
    role: author.metadata?.role || undefined,
    avatarUrl: avatar?.imgix_url
      ? `${avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`
      : undefined,
  }
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

function matchesCategory(post: Blog, categorySlug: string): boolean {
  const cat = post.metadata?.category
  return !!cat && typeof cat === 'object' && cat.slug === categorySlug
}

export async function getBlogPosts(
  limit: number,
  skip: number,
  categorySlug?: string
): Promise<BlogListResult> {
  const all = await fetchAllBlogPosts()
  const filtered = categorySlug ? all.filter((p) => matchesCategory(p, categorySlug)) : all
  const total = filtered.length
  const posts = filtered.slice(skip, skip + limit)
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

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .limit(100)

    const rank = (slug: string) => {
      const i = CATEGORY_ORDER.indexOf(slug)
      return i === -1 ? CATEGORY_ORDER.length : i
    }
    return (response.objects as Category[]).sort((a, b) => rank(a.slug) - rank(b.slug))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
    return (response.object as Category) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}
