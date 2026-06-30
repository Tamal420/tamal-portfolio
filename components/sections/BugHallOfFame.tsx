'use client'

import { useReducedMotion } from 'framer-motion'
import { bugs } from '@/content/bugs'
import { BugCard } from '@/components/ui/BugCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import { SEVERITY_CONFIG } from '@/lib/constants'

/**
 * Bug Hall of Fame.
 *
 * Design rationale (per Step 1 architecture): a horizontal auto-scrolling
 * ticker, styled after financial data terminals, signals that this QA
 * data carries real operational weight — fitting for billing and
 * authentication defects in healthcare and fintech-adjacent software.
 *
 * Implementation notes:
 *  - The ticker itself is pure CSS (`.ticker-track`, defined in globals.css
 *    during Step 2) — GPU-composited, no JS animation loop, pauses on
 *    hover/focus. This keeps the motion smooth even on lower-end mobile
 *    devices and is the reason no new animation dependency was needed.
 *  - For users with prefers-reduced-motion, the ticker is replaced with a
 *    static, fully accessible vertical stack — every card readable via
 *    normal page scroll, no motion, no horizontal interaction required.
 *  - A severity legend above the row gives recruiters context before they
 *    start reading, satisfying "recruiter-focused storytelling."
 *  - The duplicated card set inside the ticker track (cards rendered twice)
 *    is what makes the CSS loop seamless; it is marked aria-hidden on the
 *    second copy so screen readers never announce duplicate content.
 */
export function BugHallOfFame() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="bugs"
      className="section-padding bg-base-card"
      aria-label="Bug Hall of Fame"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="Bug Hall of Fame"
          title="Defects I found before they shipped"
          description="The most important part of QA isn't running test cases — it's catching what would have gone wrong. These are real defects identified during testing, with the impact they would have had if they'd reached production."
        />

        {/* Severity legend */}
        <ScrollReveal>
          <div
            className="flex flex-wrap items-center gap-4 mb-8 text-xs text-ink-tertiary"
            aria-hidden="true"
          >
            {(['critical', 'high', 'medium'] as const).map((level) => {
              const config = SEVERITY_CONFIG[level]
              return (
                <span key={level} className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${config.textClass.replace('text-', 'bg-')}`}
                  />
                  {config.label}
                </span>
              )
            })}
          </div>
        </ScrollReveal>

        {/* ── Desktop / motion-enabled: horizontal ticker ── */}
        {!shouldReduceMotion && (
          <ScrollReveal className="hidden sm:block">
            <div
              className="ticker-wrapper"
              role="region"
              aria-label="Scrolling list of bug entries — pause by hovering"
            >
              <div className="ticker-track">
                {/* First copy — real, announced content */}
                <div className="flex gap-4 pr-4">
                  {bugs.map((bug) => (
                    <BugCard key={bug.id} bug={bug} />
                  ))}
                </div>
                {/* Duplicate copy — visual continuity only, hidden from a11y tree */}
                <div className="flex gap-4 pr-4" aria-hidden="true">
                  {bugs.map((bug) => (
                    <BugCard key={`${bug.id}-dup`} bug={bug} />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── Mobile-first fallback + reduced-motion: accessible stacked grid ── */}
        <StaggerContainer
          className={
            shouldReduceMotion
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'grid grid-cols-1 sm:hidden gap-4'
          }
          staggerDelay={0.06}
        >
          {bugs.map((bug) => (
            <StaggerItem key={bug.id}>
              <div className="w-full">
                {/* Override fixed ticker width for stacked/grid contexts */}
                <div className="[&>article]:w-full">
                  <BugCard bug={bug} />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="text-xs text-ink-tertiary mt-6 text-center sm:text-left">
          {!shouldReduceMotion && 'Hover or focus any card above to pause scrolling and read in detail. '}
          {bugs.length} verified entries across healthcare SaaS and music streaming platforms.
        </p>
      </div>
    </section>
  )
}
