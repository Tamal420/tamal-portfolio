'use client'

import { aboutContent } from '@/content/contact'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

/**
 * About section — positioned deliberately late in the page (per the
 * approved architecture). By the time a visitor reaches this section,
 * they've already seen proof (Impact Wall, Projects, Bug Hall of Fame).
 * About gives the person behind that work, not an introduction to it.
 *
 * Two-column layout: narrative prose on the left (the larger, primary
 * column), a compact career timeline on the right for quick scanning.
 * Collapses to a single stacked column on mobile, timeline below prose.
 */
export function About() {
  return (
    <section
      id="about"
      className="section-padding bg-base"
      aria-label="About Tamal Saha"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="About"
          title="The person behind the testing work"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Narrative — primary column */}
          <div className="lg:col-span-2 flex flex-col gap-5 min-w-0">
            {aboutContent.paragraphs.map((paragraph, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <p className="text-sm sm:text-[1rem] text-ink-secondary leading-relaxed break-words">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>

          {/* Career timeline — compact column */}
          <div>
            <ScrollReveal delay={0.1}>
              <h3 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-5">
                Career timeline
              </h3>
            </ScrollReveal>

            <div className="flex flex-col gap-5">
              {aboutContent.careerTimeline.map((entry, i) => (
                <ScrollReveal key={entry.year} delay={0.15 + i * 0.06}>
                  <div className="border-l-2 border-border-subtle pl-4">
                    <span className="text-xs font-semibold text-accent">
                      {entry.year}
                    </span>
                    <h4 className="text-sm font-semibold text-ink-primary mt-1 mb-1.5">
                      {entry.title}
                    </h4>
                    <p className="text-xs text-ink-secondary leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
