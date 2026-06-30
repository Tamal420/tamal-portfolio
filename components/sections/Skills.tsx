'use client'

import { skillCategories, domainBadges } from '@/content/skills'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

/**
 * Skills section — four honest tiers rather than a flat list or
 * proficiency bars (deliberately avoided per the content package:
 * percentage bars invite "who validated this number" scrutiny).
 *
 * Tier order is deliberate: core professional skills first (builds
 * credibility), then tools, then database, then the "learning" tier
 * last — visually distinct with an amber label so Playwright/Python
 * are never mistaken for peer-level skills to Postman/Jira.
 */
export function Skills() {
  return (
    <section
      id="skills"
      className="section-padding bg-base-card"
      aria-label="Skills and tools"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="Skills & Tools"
          title="What I actually use, organised by how I use it"
          description="Four honest tiers — not a flat skill list. Daily professional tools, regular tools, database experience, and what I'm actively learning right now."
        />

        <div className="flex flex-col gap-6 mb-10">
          {skillCategories.map((category, i) => (
            <ScrollReveal key={category.id} delay={i * 0.06}>
              <div className="card-base rounded-xl p-5 sm:p-6">
                <h3
                  className={cn(
                    'text-[11px] uppercase tracking-widest font-semibold mb-4',
                    category.color
                  )}
                >
                  {category.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        'inline-flex items-center h-7 px-3 rounded-md text-xs font-medium',
                        'bg-base border border-border-subtle text-ink-secondary'
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Domain badges */}
        <ScrollReveal delay={0.1}>
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-4">
            Domain experience
          </h3>
        </ScrollReveal>

        <StaggerContainer className="flex flex-wrap gap-2.5" staggerDelay={0.05}>
          {domainBadges.map((badge) => (
            <StaggerItem key={badge.label}>
              <span
                className={cn(
                  'inline-flex items-center h-9 px-4 rounded-full text-sm font-medium border',
                  badge.color
                )}
              >
                {badge.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
