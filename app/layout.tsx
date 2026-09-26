import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import AnnouncementBar from '@/components/AnnouncementBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import AskNetlifyButton from '@/components/AskNetlifyButton'

export const metadata: Metadata = {
  title: 'Netlify Blog — News, tutorials, and updates',
  description: 'The latest news, product updates, tutorials, and stories from the Netlify Blog.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✍️</text></svg>"
        />
              <script defer src="https://insights.cosmicinsights.dev/script.js" data-project="6ab70313135b7942815df2a3"></script>
      </head>
      <body className="font-sans">
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AskNetlifyButton />
        <CosmicBadge bucketSlug={bucketSlug} />
        <script src="/dashboard-console-capture.js" />
      </body>
    </html>
  )
}