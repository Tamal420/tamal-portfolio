'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { LabStep } from '@/lib/types'

interface StepPanelProps {
  step: LabStep
  stepNumber: number // 1-indexed, for display
  totalSteps: number
}

/**
 * Renders the active step's content with a directional slide+fade.
 * AnimatePresence with `mode="wait"` ensures the exiting step fully
 * leaves before the next one enters, avoiding overlap jank.
 * Keyed by stepNumber so Framer Motion treats each step as a distinct
 * element to animate between.
 */
export function StepPanel({ step, stepNumber, totalSteps }: StepPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepNumber}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        role="tabpanel"
        aria-label={`Step ${stepNumber} of ${totalSteps}: ${step.title}`}
      >
        <span className="text-[11px] uppercase tracking-widest font-semibold text-accent">
          Step {String(stepNumber).padStart(2, '0')} of {totalSteps}
        </span>
        <h4 className="text-lg sm:text-xl font-semibold text-ink-primary mt-2 mb-3 tracking-tight">
          {step.title}
        </h4>
        <p className="text-sm sm:text-[1rem] text-ink-secondary leading-relaxed">
          {step.body}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
