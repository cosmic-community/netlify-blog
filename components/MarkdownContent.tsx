'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) {
    return <p className="text-gray-400">This post doesn&apos;t have any content yet.</p>
  }

  return (
    <div className="prose prose-invert prose-lg max-w-none prose-headings:font-extrabold prose-a:text-netlify-teal prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}