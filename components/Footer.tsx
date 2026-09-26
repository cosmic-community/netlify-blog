import Link from 'next/link'

const COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Product', links: ['Platform', 'Deploy', 'Build', 'Edge Functions', 'Integrations'] },
  { title: 'Solutions', links: ['Ecommerce', 'Marketing sites', 'Web apps', 'Enterprise'] },
  { title: 'Resources', links: ['Docs', 'Support', 'Community', 'Partners'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b171d]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link} className="text-sm text-gray-400 transition-colors hover:text-gray-200">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <Link href="/" className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#5cebdf" />
            </svg>
            <span className="text-sm font-bold text-white">netlify</span>
          </Link>
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Netlify Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}