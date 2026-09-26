// app/blog/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-4 py-14 sm:px-6 lg:px-8">
      <div className="h-4 w-24 rounded bg-white/5" />
      <div className="mt-6 h-6 w-32 rounded-full bg-white/5" />
      <div className="mt-5 h-10 w-full rounded bg-white/5" />
      <div className="mt-3 h-10 w-2/3 rounded bg-white/5" />
      <div className="mt-6 h-4 w-40 rounded bg-white/5" />
      <div className="mt-8 aspect-[16/9] w-full rounded-2xl bg-white/5" />
      <div className="mt-10 space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 w-full rounded bg-white/5" />
        ))}
      </div>
    </div>
  )
}