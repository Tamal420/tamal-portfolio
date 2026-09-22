'use client'

import { useState } from 'react'
import type { ContributionDay, ContributionLevel } from '@/lib/github'
import { formatCalendarDate } from '@/lib/github'
import { cn } from '@/lib/utils'

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  NONE: 'bg-base-elevated border border-border-subtle',
  FIRST_QUARTILE: 'bg-accent/20 border border-accent/25',
  SECOND_QUARTILE: 'bg-accent/40 border border-accent/35',
  THIRD_QUARTILE: 'bg-accent/65 border border-accent/50',
  FOURTH_QUARTILE: 'bg-accent border border-accent',
}

const LEGEND_LEVELS: ContributionLevel[] = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
]

interface ContributionGraphProps {
  weeks: ContributionDay[][]
  totalContributions: number
}

function ContributionCell({ day }: { day: ContributionDay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="relative">
      <div
        className={cn(
          'w-[11px] h-[11px] sm:w-[12px] sm:h-[12px] rounded-[2px] transition-transform duration-150',
          LEVEL_CLASS[day.level],
          hovered && 'scale-110'
        )}
        tabIndex={0}
        role="gridcell"
        aria-label={`${formatCalendarDate(day.date)}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      />
      {hovered && (
        <div
          className={cn(
            'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20',
            'pointer-events-none whitespace-nowrap',
            'rounded-md border border-border-subtle bg-base-raised px-2.5 py-1.5',
            'text-[11px] font-medium text-ink-primary shadow-card'
          )}
          role="tooltip"
        >
          <span className="block text-ink-secondary">
            {day.count} contribution{day.count === 1 ? '' : 's'}
          </span>
          <span className="block text-ink-tertiary">{formatCalendarDate(day.date)}</span>
        </div>
      )}
    </div>
  )
}

export function ContributionGraph({ weeks, totalContributions }: ContributionGraphProps) {
  return (
    <div className="card-base rounded-xl p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <p className="text-sm text-ink-secondary">
          <span className="font-semibold text-ink-primary tabular-nums">
            {totalContributions.toLocaleString()}
          </span>{' '}
          contributions in the last year
        </p>
      </div>

      <div
        className="overflow-x-auto pb-1 scrollbar-hide"
        role="grid"
        aria-label="GitHub contribution graph for the last year"
      >
        <div className="flex gap-[3px] min-w-max">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px]">
              {week.map((day) => (
                <ContributionCell key={day.date} day={day} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-[11px] text-ink-tertiary">
        <span>Less</span>
        <div className="flex gap-[3px]" aria-hidden="true">
          {LEGEND_LEVELS.map((level) => (
            <span
              key={level}
              className={cn(
                'w-[11px] h-[11px] sm:w-[12px] sm:h-[12px] rounded-[2px]',
                LEVEL_CLASS[level]
              )}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
