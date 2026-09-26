import Link from 'next/link'

const TABS = ['News', 'Case Studies', 'Tutorials', 'Insights', 'Changelog']

export default function SubNav() {
  return (
    <div className="border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="whitespace-nowrap border-b-2 border-netlify-teal py-4 text-sm font-semibold text-netlify-teal"
        >
          Blog
        </Link>
        {TABS.map((tab) => (
          <span
            key={tab}
            className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-400"
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  )
}