export default function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white">
      {/* Image skeleton */}
      <div
        className="h-48 animate-pulse sm:h-56"
        style={{ backgroundColor: 'var(--cream-dark)' }}
      />
      {/* Content skeleton */}
      <div className="p-4">
        <div
          className="mb-2 h-3 w-16 animate-pulse rounded-full"
          style={{ backgroundColor: 'var(--warm-gray-light)' }}
        />
        <div
          className="mb-1 h-4 w-full animate-pulse rounded-full"
          style={{ backgroundColor: 'var(--warm-gray-light)' }}
        />
        <div
          className="mb-3 h-4 w-3/4 animate-pulse rounded-full"
          style={{ backgroundColor: 'var(--warm-gray-light)' }}
        />
        <div
          className="h-5 w-20 animate-pulse rounded-full"
          style={{ backgroundColor: 'var(--cream-dark)' }}
        />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
