'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number       // seconds
  duration?: number    // seconds
  y?: number           // translateY start offset in px
  once?: boolean
  threshold?: number
}

/**
 * Wraps children in a fade-up scroll reveal animation.
 * Respects prefers-reduced-motion — renders instantly if motion is reduced.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.5,
  y = 16,
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, once })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      animate={
        inView || shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y }
      }
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered container — children animate in sequence.
 * Wrap groups of cards or list items with this.
 */
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number  // seconds between each child
  threshold?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  threshold = 0.1,
}: StaggerContainerProps) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold, once: true })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView || shouldReduceMotion ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Item variant — used inside StaggerContainer.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
