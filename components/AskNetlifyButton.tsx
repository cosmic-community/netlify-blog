'use client'

import { useState } from 'react'

export default function AskNetlifyButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed z-40" style={{ bottom: '92px', right: '20px' }}>
      {open && (
        <div className="mb-3 w-64 rounded-2xl border border-white/10 bg-[#111f27] p-4 text-sm text-gray-300 shadow-xl">
          <p className="font-semibold text-white">Ask Netlify</p>
          <p className="mt-2">
            This is a decorative preview of Netlify&apos;s AI assistant. Explore the blog to learn more.
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full bg-netlify-teal px-5 py-3 text-sm font-semibold text-netlify-bg shadow-lg transition-colors hover:bg-netlify-tealDark"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
        </svg>
        Ask Netlify
      </button>
    </div>
  )
}