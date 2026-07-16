'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type { Project } from '@/lib/types'
import { Icon } from '@/components/ui/Icon'

interface ProjectExpandPanelProps {
  project: Project
  open: boolean
}

/**
 * Expandable panel rendering the full case study for a project.
 * Animates height from 0 to auto using AnimatePresence + motion height.
 * Renders differently for 'deep' format (WebEVV — structured scopeSections,
 * automation note) vs 'compact' format (single scope paragraph).
 */
export function ProjectExpandPanel({ project, open }: ProjectExpandPanelProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="panel"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-5 mt-5 border-t border-border-subtle">

            {/* What is this product */}
            <div className="mb-5">
              <h4 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-2">
                What is {project.name}
              </h4>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {project.what}
              </p>
            </div>

            {/* Deep format: structured scope sections (WebEVV only) */}
            {project.format === 'deep' && project.scopeSections ? (
              <div className="mb-5">
                <h4 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-3">
                  My scope and responsibilities
                </h4>
                <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                  {project.scope}
                </p>
                <div className="flex flex-col gap-4">
                  {project.scopeSections.map((section) => (
                    <div key={section.title}>
                      <h5 className="text-sm font-semibold text-ink-primary mb-1">
                        {section.title}
                      </h5>
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Compact format: single scope paragraph */
              <div className="mb-5">
                <h4 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-2">
                  My scope and responsibilities
                </h4>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {project.scope}
                </p>
              </div>
            )}

            {/* Automation learning note — WebEVV only */}
            {project.automationNote && (
              <div className="mb-5 p-4 rounded-lg bg-high-bg/40 border border-high-border">
                <h4 className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-high-text mb-2">
                  <Icon name="shield-check" size={13} />
                  Automation learning journey
                </h4>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {project.automationNote}
                </p>
              </div>
            )}

            {/* Testing types — full list */}
            <div className="mb-5">
              <h4 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-2">
                Testing types applied
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.testingTypes.map((type) => (
                  <span key={type} className="skill-tag">
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools used */}
            <div>
              <h4 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-2">
                Tools used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span key={tool} className="skill-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
