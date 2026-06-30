'use client'

import { automationContent } from '@/content/timeline'
import { TimelineNode } from '@/components/ui/TimelineNode'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'

/**
 * Automation Journey section.
 *
 * Renders the 4-node timeline (manual foundation -> API testing ->
 * active Playwright/Python learning -> automation QA goal), paired with
 * a real code snippet and a link to GitHub. The status badges on each
 * timeline node ("In progress" / "Goal") are what make this presentation
 * interview-safe — nothing is overstated as completed work.
 */
export function AutomationJourney() {
  const { headline, subheadline, timeline, codeSnippet, codeLanguage, codeCaption, githubUrl } =
    automationContent

  return (
    <section
      id="automation"
      className="section-padding bg-base"
      aria-label="Automation journey"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="Automation Journey"
          title={headline}
          description={subheadline}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* ── Timeline ── */}
          <div>
            {timeline.map((node, i) => (
              <TimelineNode
                key={node.id}
                node={node}
                isLast={i === timeline.length - 1}
                delay={i * 0.08}
              />
            ))}
          </div>

          {/* ── Code + GitHub ── */}
          <div className="flex flex-col gap-6">
            <ScrollReveal delay={0.1}>
              <div>
                <h4 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-3">
                  Applying Playwright + Python to WebEVV
                </h4>
                <CodeBlock
                  code={codeSnippet}
                  language={codeLanguage}
                  caption={codeCaption}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.18}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base rounded-xl p-5 flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="View automation work on GitHub (opens in a new tab)"
              >
                <div>
                  <p className="text-sm font-semibold text-ink-primary mb-1">
                    View automation work on GitHub
                  </p>
                  <p className="text-xs text-ink-tertiary font-mono">
                    github.com/Tamal420
                  </p>
                </div>
                <span className="text-ink-tertiary group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0">
                  <Icon name="arrow-right" size={18} />
                </span>
              </a>
            </ScrollReveal>

            {/* Honesty note — reinforces interview-safe framing */}
            <ScrollReveal delay={0.24}>
              <div className="p-4 rounded-lg bg-base-card border border-border-subtle">
                <p className="text-xs text-ink-tertiary leading-relaxed">
                  <span className="text-ink-secondary font-medium">Where I am today: </span>
                  strong manual and API testing foundations, actively applying Playwright
                  and Python to real test scenarios through professional training — not yet
                  an automation engineer, but building toward it deliberately.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
