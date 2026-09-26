'use client'

import { useEffect } from 'react'

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
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="mt-3 max-w-md text-gray-400">
        We hit an unexpected error loading the blog. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-netlify-teal px-6 py-3 text-sm font-semibold text-netlify-bg transition-colors hover:bg-netlify-tealDark"
      >
        Try again
      </button>
    </div>
  )
}