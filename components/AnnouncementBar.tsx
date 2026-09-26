'use client'

import { useEffect, useState } from 'react'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('netlify-announcement-dismissed')
    if (!dismissed) {
      setVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setVisible(false)
    localStorage.setItem('netlify-announcement-dismissed', 'true')
  }

  if (!visible) return null

  return (
    <div className="relative flex items-center justify-center gap-2 bg-netlify-teal px-4 py-2 text-center text-sm font-medium text-netlify-bg">
      <span>
        Netlify&apos;s next chapter is here — read the announcement <span aria-hidden="true">→</span>
      </span>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-netlify-bg/70 transition-colors hover:text-netlify-bg"
      >
        ×
      </button>
    </div>
  )
}