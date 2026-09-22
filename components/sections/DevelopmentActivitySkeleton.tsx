import { cn } from '@/lib/utils'

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-base-elevated/80',
        className
      )}
      aria-hidden="true"
    />
  )
}

export function DevelopmentActivitySkeleton() {
  return (
    <section
      id="development"
      className="section-padding bg-base-card"
      aria-label="Development Activity"
      aria-busy="true"
    >
      <div className="container-portfolio">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SkeletonBlock className="h-3 w-36 mb-3" />
          <SkeletonBlock className="h-9 w-full max-w-lg mb-4" />
          <SkeletonBlock className="h-4 w-full max-w-2xl" />
        </div>

        {/* Contribution graph skeleton */}
        <div className="card-base rounded-xl p-4 sm:p-5 mb-8">
          <SkeletonBlock className="h-4 w-56 mb-4" />
          <div className="flex gap-[3px] overflow-hidden">
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-[3px] shrink-0">
                {Array.from({ length: 7 }).map((_, j) => (
                  <SkeletonBlock key={j} className="w-[11px] h-[11px] sm:w-[12px] sm:h-[12px] rounded-[2px]" />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <SkeletonBlock className="h-3 w-32" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats skeleton */}
          <div className="card-base rounded-xl p-5 sm:p-6">
            <SkeletonBlock className="h-3 w-28 mb-5" />
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <SkeletonBlock className="h-3 w-32" />
                  <SkeletonBlock className="h-6 w-12" />
                </div>
              ))}
            </div>
          </div>

          {/* Repos skeleton */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-base rounded-xl p-5">
                <SkeletonBlock className="h-5 w-2/3 mb-3" />
                <SkeletonBlock className="h-3 w-full mb-2" />
                <SkeletonBlock className="h-3 w-4/5 mb-4" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Commits skeleton */}
        <div className="mb-8">
          <SkeletonBlock className="h-4 w-36 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="card-base rounded-xl p-4">
                <SkeletonBlock className="h-3 w-24 mb-2" />
                <SkeletonBlock className="h-4 w-full mb-2" />
                <SkeletonBlock className="h-3 w-20" />
              </div>
            ))}
          </div>
        </div>

        <SkeletonBlock className="h-12 w-44" />
      </div>
    </section>
  )
}
