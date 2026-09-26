import { NextResponse } from 'next/server'
import { getBlogPosts } from '@/lib/cosmic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const skip = parseInt(searchParams.get('skip') || '0', 10)
  const limitParam = parseInt(searchParams.get('limit') || '9', 10)
  const limit = Number.isNaN(limitParam) || limitParam <= 0 ? 9 : Math.min(limitParam, 50)
  const safeSkip = Number.isNaN(skip) || skip < 0 ? 0 : skip

  try {
    const { posts, total } = await getBlogPosts(limit, safeSkip)
    return NextResponse.json({ posts, total })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}