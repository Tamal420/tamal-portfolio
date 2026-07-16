'use client'

import { metricCards, contributionHighlights, projectContributions } from '@/content/contributions'
import { MetricCard } from '@/components/ui/MetricCard'
import { Icon } from '@/components/ui/Icon'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { scrollToSection, cn } from '@/lib/utils'

// ─── Industry icon mapping for project cards ──────────────────────────────────
const INDUSTRY_ICON: Record<string, string> = {
  'Healthcare SaaS': 'heart-rate-monitor',
  'EdTech': 'graduation-cap',
  'Music Streaming': 'music',
}

/**
 * Featured QA Contributions section.
 *
 * Structure:
 *   1. Metric row — 4 animated counters (6 products, 2 industries, 4 platforms, 1+ year)
 *   2. Highlight cards — 3 capability summaries (healthcare, API, mobile)
 *   3. Project contribution grid — all 6 named projects with industry badge,
 *      tagline, and top testing types. WebEVV renders first and is visually
 *      emphasised per the "WebEVV must be primary featured project" requirement.
 *
 * Clicking a project card scrolls to the full case study in the Projects section.
 */
export function Contributions() {
  return (
    <section
      id="contributions"
      className="section-padding bg-base-card"
      aria-label="Featured QA contributions"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="Featured QA Contributions"
          title="QA impact across six products, three industries"
          description="From healthcare SaaS handling real patient visit records to EdTech platforms and music streaming — here's where my testing work has actually shipped."
        />

        {/* ── Metric row ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 md:mb-14"
          role="list"
          aria-label="Career metrics"
        >
          {metricCards.map((metric, i) => (
            <div role="listitem" key={metric.label}>
              <MetricCard
                value={metric.value}
                label={metric.label}
                suffix={metric.suffix}
                delay={i * 0.06}
              />
            </div>
          ))}
        </div>

        {/* ── Highlight cards ── */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 md:mb-20">
          {contributionHighlights.map((highlight) => (
            <StaggerItem key={highlight.id}>
              <div className="card-base rounded-xl p-5 sm:p-6 h-full flex flex-col">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent-surface text-accent mb-4 shrink-0"
                  aria-hidden="true"
                >
                  <Icon name={highlight.icon} size={18} />
                </div>
                <h3 className="text-sm font-semibold text-ink-primary mb-3">
                  {highlight.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {highlight.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm text-ink-secondary leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── Project contribution grid ── */}
        <ScrollReveal>
          <h3 className="text-sm font-semibold text-ink-tertiary uppercase tracking-widest mb-5">
            Across six products
          </h3>
        </ScrollReveal>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.06}
        >
          {projectContributions.map((project) => (
            <StaggerItem key={project.id}>
              <button
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent('portfolio:open-project', { detail: project.id })
                  )
                  setTimeout(() => scrollToSection(`#project-${project.id}`), 100)
                }}
                className={cn(
                  'card-base rounded-xl p-5 text-left w-full h-full flex flex-col',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  // WebEVV — primary featured project gets accent border emphasis
                  project.featured && 'border-accent-muted bg-accent-surface/40'
                )}
                aria-label={`View ${project.name} case study — ${project.industryLabel}`}
              >
                {/* Header: industry badge + featured flag */}
                <div className="flex items-center justify-between mb-3 gap-2">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full text-[11px] font-medium border',
                      project.industryClasses.bg,
                      project.industryClasses.text,
                      project.industryClasses.border
                    )}
                  >
                    <Icon
                      name={INDUSTRY_ICON[project.industryLabel] ?? 'globe'}
                      size={12}
                    />
                    {project.industryLabel}
                  </span>

                  {project.featured && (
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-accent shrink-0">
                      Featured
                    </span>
                  )}
                </div>

                {/* Project name */}
                <h4 className="text-[1rem] font-semibold text-ink-primary mb-2">
                  {project.name}
                </h4>

                {/* Tagline */}
                <p className="text-sm text-ink-secondary leading-relaxed mb-4 flex-1">
                  {project.tagline}
                </p>

                {/* Top testing types */}
                <div className="flex flex-wrap gap-1.5 mb-3" aria-label="Testing types applied">
                  {project.topTestingTypes.map((type) => (
                    <span key={type} className="skill-tag">
                      {type}
                    </span>
                  ))}
                  {project.testingTypeCount > 3 && (
                    <span className="skill-tag text-ink-tertiary">
                      +{project.testingTypeCount - 3} more
                    </span>
                  )}
                </div>

                {/* Footer: platform count + arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                  <span className="text-[11px] text-ink-tertiary">
                    {project.platformCount} platform{project.platformCount !== 1 ? 's' : ''} tested
                  </span>
                  <Icon name="arrow-right" size={14} className="text-ink-tertiary" />
                </div>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
