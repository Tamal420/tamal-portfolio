'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { FilterValue } from '@/lib/utils'
import { getFilterLabel } from '@/lib/utils'

interface FilterBarProps {
  active: FilterValue
  onChange: (filter: FilterValue) => void
  counts: Record<FilterValue, number>
}

const FILTERS: FilterValue[] = ['all', 'healthcare', 'edtech', 'streaming']

/**
 * Horizontal filter pill row for the Projects section.
 * Active pill gets an accent fill; inactive pills are ghost-bordered.
 * Wraps to multiple rows on narrow mobile viewports rather than scrolling,
 * keeping every option visible and reachable without horizontal swipe.
 */
export function FilterBar({ active, onChange, counts }: FilterBarProps) {
  return (
    <div
      className="flex flex-wrap gap-2 mb-8"
      role="group"
      aria-label="Filter projects by industry"
    >
      {FILTERS.map((filter) => {
        const isActive = active === filter
        const count = counts[filter]

        return (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={cn(
              'relative inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full text-xs font-medium',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              isActive
                ? 'text-accent'
                : 'text-ink-tertiary hover:text-ink-secondary filter-chip-inactive'
            )}
            aria-pressed={isActive}
            aria-label={`Filter: ${getFilterLabel(filter)}, ${count} project${count !== 1 ? 's' : ''}`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill-bg"
                className="absolute inset-0 rounded-full bg-accent-surface border border-accent-muted"
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            )}
            <span className="relative z-10">{getFilterLabel(filter)}</span>
            <span className="relative z-10 text-[10px] opacity-70 tabular-nums">
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
