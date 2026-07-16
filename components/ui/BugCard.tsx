import type { BugEntry } from '@/lib/types'
import { SEVERITY_CONFIG } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface BugCardProps {
  bug: BugEntry
}

/**
 * Single Bug Hall of Fame entry.
 * Fixed width card designed to sit inside the horizontal scroll/ticker
 * container in BugHallOfFame.tsx, but equally readable as a standalone
 * card (used in the mobile stacked fallback).
 */
export function BugCard({ bug }: BugCardProps) {
  const severity = SEVERITY_CONFIG[bug.severity]

  return (
    <article
      className={cn(
        'card-base rounded-xl p-5 flex flex-col',
        'w-[300px] sm:w-[340px] shrink-0' // fixed width for ticker/scroll layout
      )}
      aria-label={`${severity.label} severity bug: ${bug.title}`}
    >
      {/* Severity badge + project tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={cn(
            'inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold border',
            severity.bgClass,
            severity.textClass,
            severity.borderClass
          )}
        >
          {severity.label}
        </span>
        <span className="text-[11px] text-ink-tertiary font-medium truncate">
          {bug.project}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-ink-primary leading-snug mb-2">
        {bug.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-ink-secondary leading-relaxed mb-3 flex-1">
        {bug.description}
      </p>

      {/* Impact */}
      <p className="text-xs text-ink-tertiary italic leading-relaxed mb-3 pt-3 border-t border-border-subtle">
        {bug.impact}
      </p>

      {/* Context footer */}
      <p className="text-[10px] uppercase tracking-wider text-ink-tertiary font-medium">
        {bug.context}
      </p>
    </article>
  )
}
