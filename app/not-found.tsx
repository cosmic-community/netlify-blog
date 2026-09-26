import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-netlify-teal">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-netlify-teal px-6 py-3 text-sm font-semibold text-netlify-bg transition-colors hover:bg-netlify-tealDark"
      >
        Back to the blog
      </Link>
    </div>
  )
}