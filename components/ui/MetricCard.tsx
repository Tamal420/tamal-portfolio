'use client'

import { useCounter } from '@/hooks/useCounter'
import { useInView } from '@/hooks/useInView'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  value: string       // e.g. "6", "1" — numeric part
  label: string
  suffix?: string     // e.g. "+"
  delay?: number
}

/**
 * Displays a single metric with an animated count-up effect.
 * Triggers when the card scrolls into view. Falls back to instant
 * display for prefers-reduced-motion (handled inside useCounter).
 */
export function MetricCard({ value, label, suffix = '', delay = 0 }: MetricCardProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.4, once: true })

  // Parse numeric target from value string (handles "6", "1", etc.)
  const numericTarget = parseInt(value, 10) || 0
  const count = useCounter({ target: numericTarget, enabled: inView, duration: 1200 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'card-base rounded-xl px-4 py-6 sm:px-6 sm:py-8',
        'flex flex-col items-center text-center'
      )}
    >
      <span
        className="font-display text-3xl sm:text-4xl font-semibold text-ink-primary tabular-nums leading-none mb-2"
        aria-label={`${value}${suffix} ${label}`}
      >
        {count}
        {suffix}
      </span>
      <span className="text-[11px] sm:text-xs uppercase tracking-widest font-medium text-ink-tertiary leading-tight">
        {label}
      </span>
    </motion.div>
  )
}
