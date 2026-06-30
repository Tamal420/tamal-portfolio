'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FilterBar } from '@/components/ui/FilterBar'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import type { FilterValue } from '@/lib/utils'
import type { Industry } from '@/lib/types'

// Map FilterValue -> Industry for filtering logic
const FILTER_TO_INDUSTRY: Partial<Record<FilterValue, Industry>> = {
  healthcare: 'healthcare',
  edtech: 'edtech',
  streaming: 'streaming',
  mobile: 'mobile',
}

/**
 * Projects section — the heart of the portfolio's proof.
 *
 * Behaviour:
 *  - Projects sorted by `order` (WebEVV = order 1, always first).
 *  - Filter bar narrows the visible set by industry; "All" shows everything.
 *  - Only one card can be expanded at a time — opening a new one closes
 *    the previous, so the page never grows unmanageably tall.
 *  - Clicking a project card elsewhere in the site (Contributions section)
 *    scrolls here and can optionally open a specific project via the
 *    `openProjectId` URL-hash-free approach: the card's `id` attribute
 *    (`project-{id}`) is the scroll target, matching the anchor used in
 *    Contributions.tsx via #projects.
 *  - AnimatePresence + layout animations give a smooth re-flow when the
 *    filtered set changes, rather than an abrupt re-render.
 */
export function Projects() {
  const [filter, setFilter] = useState<FilterValue>('all')
  const [openId, setOpenId] = useState<string | null>('webevv') // WebEVV open by default

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.order - b.order),
    []
  )

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return sortedProjects
    const industry = FILTER_TO_INDUSTRY[filter]
    return sortedProjects.filter((p) => p.industry === industry)
  }, [filter, sortedProjects])

  // Pre-compute counts for filter bar badges
  const counts = useMemo(() => {
    const base: Record<FilterValue, number> = {
      all: sortedProjects.length,
      healthcare: 0,
      edtech: 0,
      streaming: 0,
      mobile: 0,
    }
    sortedProjects.forEach((p) => {
      base[p.industry as FilterValue] += 1
    })
    return base
  }, [sortedProjects])

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section
      id="projects"
      className="section-padding bg-base"
      aria-label="Project case studies"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="Project Showcase"
          title="Six products. Two industries. One QA practice."
          description="WebEVV is where my deepest work lives — healthcare SaaS testing plus my active Playwright automation learning. Filter by industry, or expand any card for the full case study."
        />

        <ScrollReveal>
          <FilterBar active={filter} onChange={setFilter} counts={counts} />
        </ScrollReveal>

        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={project.featured ? 'lg:col-span-2' : ''}
                >
                  <ProjectCard
                    project={project}
                    isOpen={openId === project.id}
                    onToggle={() => handleToggle(project.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty state — shouldn't normally occur given fixed filter set, but handled for completeness */}
        {filteredProjects.length === 0 && (
          <p className="text-sm text-ink-tertiary text-center py-12">
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  )
}
