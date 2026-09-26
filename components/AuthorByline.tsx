import type { DisplayAuthor } from '@/types'

interface AuthorBylineProps {
  author: DisplayAuthor
  showRole?: boolean
}

export default function AuthorByline({ author, showRole = false }: AuthorBylineProps) {
  const initials = author.name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex items-center gap-2.5">
      {author.avatarUrl ? (
        <img
          src={author.avatarUrl}
          alt={author.name}
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
        />
      ) : (
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-netlify-teal/20 text-[10px] font-bold text-netlify-teal">
          {initials}
        </span>
      )}
      <div className="leading-tight">
        <span className="text-sm font-medium text-gray-300">{author.name}</span>
        {showRole && author.role && <span className="block text-xs text-gray-500">{author.role}</span>}
      </div>
    </div>
  )
}
