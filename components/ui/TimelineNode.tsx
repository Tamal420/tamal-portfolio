'use client'

import { motion } from 'framer-motion'
import type { TimelineNode as TimelineNodeType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TimelineNodeProps {
  node: TimelineNodeType
  isLast: boolean
  delay?: number
}

/**
 * Single node in the Automation Journey timeline.
 * Status determines visual treatment:
 *   - 'done'   -> solid accent-filled dot, full opacity content
 *   - 'active' -> pulsing ring dot (amber/high), highlighted border
 *   - 'next'   -> dashed outline dot, slightly muted content
 * This status distinction is what keeps the section "interview-safe" —
 * it's visually obvious which skills are established vs. in progress.
 */
export function TimelineNode({ node, isLast, delay = 0 }: TimelineNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-4 sm:gap-5"
    >
      {/* Dot + connecting rail */}
      <div className="flex flex-col items-center shrink-0">
        <span
          className={cn(
            'relative flex items-center justify-center w-4 h-4 rounded-full mt-1',
            node.status === 'done' && 'bg-accent',
            node.status === 'active' && 'bg-high-text',
            node.status === 'next' && 'bg-transparent border-2 border-dashed border-border-default'
          )}
          aria-hidden="true"
        >
          {node.status === 'active' && (
            <span className="absolute inset-0 rounded-full bg-high-text animate-node-ring" />
          )}
        </span>
        {!isLast && (
          <span
            className="w-px flex-1 mt-2 bg-border-subtle"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex-1 pb-10', isLast && 'pb-0')}>
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h4 className="text-sm sm:text-base font-semibold text-ink-primary">
            {node.title}
          </h4>
          {node.status === 'active' && (
            <span className="inline-flex items-center h-5 px-2 rounded-full text-[10px] font-semibold bg-high-bg text-high-text border border-high-border">
              In progress
            </span>
          )}
          {node.status === 'next' && (
            <span className="inline-flex items-center h-5 px-2 rounded-full text-[10px] font-medium text-ink-tertiary border border-border-subtle">
              Goal
            </span>
          )}
        </div>

        <p className="text-sm text-ink-secondary leading-relaxed mb-3">
          {node.description}
        </p>

        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {node.tags.map((tag) => (
              <span key={tag} className="skill-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
