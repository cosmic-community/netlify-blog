// app/blog/[slug]/error.tsx
'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white">Couldn&apos;t load this post</h1>
      <p className="mt-3 max-w-md text-gray-400">
        Something went wrong while fetching this article. Please try again.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-netlify-teal px-6 py-3 text-sm font-semibold text-netlify-bg transition-colors hover:bg-netlify-tealDark"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Back to blog
        </Link>
      </div>
    </div>
  )
}