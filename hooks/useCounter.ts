'use client'

import { useEffect, useRef, useState } from 'react'
import { easeOutCubic, prefersReducedMotion } from '@/lib/utils'

interface UseCounterOptions {
  target: number
  duration?: number   // ms
  start?: number
  enabled?: boolean   // triggers the counter when set to true
}

/**
 * Animates a number from `start` to `target` using requestAnimationFrame.
 * Respects prefers-reduced-motion — shows final value instantly if motion reduced.
 */
export function useCounter({
  target,
  duration = 1200,
  start = 0,
  enabled = true,
}: UseCounterOptions): number {
  const [value, setValue] = useState(start)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    // Instant for reduced motion
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      setValue(Math.round(start + (target - start) * eased))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      startTimeRef.current = null
    }
  }, [enabled, target, start, duration])

  return value
}
