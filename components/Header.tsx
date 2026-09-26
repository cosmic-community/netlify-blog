'use client'

import Link from 'next/link'
import { useState } from 'react'

const NAV_ITEMS = ['Platform', 'Solutions', 'Developers', 'Resources', 'Pricing']

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-netlify-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill="#5cebdf" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-white">netlify</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <span
              key={item}
              className="flex cursor-default items-center gap-1 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              {item}
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <button aria-label="Search" className="text-gray-300 transition-colors hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <span className="cursor-default text-sm font-medium text-gray-300 hover:text-white">Contact</span>
          <span className="cursor-default text-sm font-medium text-gray-300 hover:text-white">Log in</span>
          <Link
            href="/"
            className="rounded-full bg-netlify-teal px-5 py-2 text-sm font-semibold text-netlify-bg transition-colors hover:bg-netlify-tealDark"
          >
            Sign up
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white lg:hidden" aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {mobileOpen ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 px-4 pb-6 lg:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {NAV_ITEMS.map((item) => (
              <span key={item} className="text-sm font-medium text-gray-300">
                {item}
              </span>
            ))}
            <span className="text-sm font-medium text-gray-300">Contact</span>
            <span className="text-sm font-medium text-gray-300">Log in</span>
            <Link
              href="/"
              className="mt-2 inline-block w-fit rounded-full bg-netlify-teal px-5 py-2 text-sm font-semibold text-netlify-bg"
            >
              Sign up
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}