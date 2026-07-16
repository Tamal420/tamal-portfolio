'use client'

import { impactStatements } from '@/content/contributions'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'

/**
 * Impact Wall — three editorial-style statements proving real QA outcomes.
 * Large, confident typography. No cards, no icons — the words carry the weight.
 * Each statement gets its own scroll-reveal so recruiters reading down the
 * page feel each one land individually rather than all at once.
 */
export function ImpactWall() {
  return (
    <section
      id="impact"
      className="section-padding bg-base"
      aria-label="Impact summary"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="Impact"
          title="What this work has actually delivered"
          description="No vanity metrics — just what shipped, what was tested, and where I am in my automation journey."
        />

        <div className="flex flex-col">
          {impactStatements.map((statement, index) => (
            <ScrollReveal
              key={statement.id}
              delay={index * 0.08}
              className="border-t border-border-subtle py-10 md:py-14 first:border-t-0 first:pt-0"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8">
                {/* Index number — desktop only, gives editorial rhythm */}
                <span
                  className="hidden md:block font-display text-3xl font-semibold text-border-default shrink-0 w-12 leading-none pt-1"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-4 md:gap-5 mb-4">
                    {statement.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-lg sm:text-xl md:text-2xl font-medium text-ink-primary leading-snug tracking-tight text-balance"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <p className="text-[11px] md:text-xs uppercase tracking-widest font-medium text-ink-secondary">
                    {statement.context}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
