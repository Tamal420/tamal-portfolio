'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/lib/types'
import { INDUSTRY_CONFIG } from '@/lib/constants'
import { Icon } from '@/components/ui/Icon'
import { PlatformBadge } from '@/components/ui/PlatformBadge'
import { ProjectExpandPanel } from '@/components/ui/ProjectExpandPanel'
import { cn } from '@/lib/utils'

const INDUSTRY_ICON: Record<string, string> = {
  healthcare: 'heart-rate-monitor',
  edtech: 'graduation-cap',
  streaming: 'music',
  mobile: 'device-mobile',
}

interface ProjectCardProps {
  project: Project
  isOpen: boolean
  onToggle: () => void
}

/**
 * Project card — renders as either:
 *  - Featured layout (WebEVV): full-width, larger type, accent-tinted surface,
 *    "Featured" label, renders first in the grid.
 *  - Compact layout (all other 5 projects): standard card grid sizing.
 *
 * Both layouts share the same expand/collapse mechanic via ProjectExpandPanel.
 * The entire card header is a button for keyboard and screen-reader accessibility.
 */
export function ProjectCard({ project, isOpen, onToggle }: ProjectCardProps) {
  const industry = INDUSTRY_CONFIG[project.industry]
  const isFeatured = project.featured

  return (
    <motion.article
      id={`project-${project.id}`}
      layout
      className={cn(
        'card-base rounded-xl overflow-hidden',
        isFeatured && 'border-accent-muted bg-accent-surface/30 lg:col-span-2'
      )}
    >
      <button
        onClick={onToggle}
        className={cn(
          'w-full text-left p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset rounded-xl'
        )}
        aria-expanded={isOpen}
        aria-controls={`project-panel-${project.id}`}
      >
        {/* Header row: industry badge + featured tag + chevron */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-medium border',
                industry.bgClass,
                industry.textClass,
                industry.borderClass
              )}
            >
              <Icon name={INDUSTRY_ICON[project.industry]} size={11} />
              {industry.label}
            </span>

            {isFeatured && (
              <span className="inline-flex items-center h-6 px-2.5 rounded-full text-[11px] font-semibold bg-accent text-base">
                Featured Project
              </span>
            )}
          </div>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-ink-tertiary shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <Icon name="chevron-down" size={16} />
          </motion.span>
        </div>

        {/* Project name */}
        <h3
          className={cn(
            'font-semibold text-ink-primary mb-2 tracking-tight',
            isFeatured ? 'text-xl sm:text-2xl' : 'text-lg'
          )}
        >
          {project.name}
        </h3>

        {/* Tagline */}
        <p
          className={cn(
            'text-ink-secondary leading-relaxed mb-4',
            isFeatured ? 'text-sm sm:text-base max-w-2xl' : 'text-sm'
          )}
        >
          {project.tagline}
        </p>

        {/* Platform badges */}
        <div className="flex flex-wrap gap-1.5 mb-1" aria-label="Platforms tested">
          {project.platforms.map((platform) => (
            <PlatformBadge key={platform} platform={platform} />
          ))}
        </div>

        {/* Collapsed-state hint */}
        {!isOpen && (
          <p className="text-xs text-ink-tertiary mt-3 flex items-center gap-1">
            View full case study
            <Icon name="arrow-right" size={12} />
          </p>
        )}
      </button>

      {/* Expand panel */}
      <div id={`project-panel-${project.id}`} className="px-5 sm:px-6">
        <ProjectExpandPanel project={project} open={isOpen} />
        {isOpen && <div className="pb-5 sm:pb-6" />}
      </div>
    </motion.article>
  )
}
