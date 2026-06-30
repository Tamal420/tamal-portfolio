'use client'

import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

interface StepperNavProps {
  totalSteps: number
  activeStep: number
  onStepChange: (step: number) => void
  stepLabels?: string[] // optional short labels for desktop dots tooltip
}

/**
 * Step indicator dots + Previous/Next controls for the QA Thinking Lab.
 * Dots are directly clickable (jump to any step) for desktop/mouse users;
 * Previous/Next buttons give a clear linear path for keyboard and touch users.
 */
export function StepperNav({
  totalSteps,
  activeStep,
  onStepChange,
  stepLabels,
}: StepperNavProps) {
  const isFirst = activeStep === 0
  const isLast = activeStep === totalSteps - 1

  return (
    <div className="flex items-center justify-between gap-4 mt-6">
      {/* Previous */}
      <button
        onClick={() => onStepChange(activeStep - 1)}
        disabled={isFirst}
        className={cn(
          'flex items-center gap-1.5 h-9 px-3 rounded-md text-xs font-medium',
          'border border-border-subtle transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          isFirst
            ? 'text-ink-tertiary opacity-40 cursor-not-allowed'
            : 'text-ink-secondary hover:text-ink-primary hover:border-border-default'
        )}
        aria-label="Previous step"
      >
        <span className="rotate-180">
          <Icon name="arrow-right" size={13} />
        </span>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Step dots */}
      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label="Scenario steps"
      >
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button
            key={i}
            role="tab"
            onClick={() => onStepChange(i)}
            aria-selected={activeStep === i}
            aria-label={
              stepLabels?.[i] ? `Step ${i + 1}: ${stepLabels[i]}` : `Step ${i + 1}`
            }
            className={cn(
              'rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              activeStep === i
                ? 'w-6 h-2 bg-accent'
                : 'w-2 h-2 bg-border-default hover:bg-ink-tertiary'
            )}
          />
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onStepChange(activeStep + 1)}
        disabled={isLast}
        className={cn(
          'flex items-center gap-1.5 h-9 px-3 rounded-md text-xs font-medium',
          'border border-border-subtle transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          isLast
            ? 'text-ink-tertiary opacity-40 cursor-not-allowed'
            : 'text-ink-secondary hover:text-ink-primary hover:border-border-default'
        )}
        aria-label="Next step"
      >
        <span className="hidden sm:inline">Next</span>
        <Icon name="arrow-right" size={13} />
      </button>
    </div>
  )
}
