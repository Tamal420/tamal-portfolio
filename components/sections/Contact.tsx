'use client'

import { contactContent } from '@/content/contact'
import { SITE } from '@/lib/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { LinkButton } from '@/components/ui/Button'

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

/**
 * Contact section — final action point on the page.
 * Deliberately minimal: no contact form (removed friction per the
 * approved architecture), just three direct paths — email, GitHub,
 * CV download — plus an explicit availability/context line that
 * pre-answers what a recruiter would otherwise need to ask.
 * Dark "raised" surface bookends the Hero section's same background tone.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className="section-padding bg-base-raised"
      aria-label="Contact"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="Contact"
          title={contactContent.headline}
          description={contactContent.contextLine}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {/* Email card */}
          <ScrollReveal delay={0}>
            <a
              href={`mailto:${contactContent.email}`}
              className="card-base card-interactive rounded-xl p-5 flex flex-col gap-3 h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Email ${contactContent.email}`}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-surface text-accent">
                <MailIcon />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-1">
                  Email
                </p>
                <p className="text-sm font-medium text-ink-primary break-all">
                  {contactContent.email}
                </p>
              </div>
            </a>
          </ScrollReveal>

          {/* GitHub card */}
          <ScrollReveal delay={0.06}>
            <a
              href={contactContent.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-base card-interactive rounded-xl p-5 flex flex-col gap-3 h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="View GitHub profile (opens in a new tab)"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-surface text-accent">
                <GithubIcon />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-1">
                  GitHub
                </p>
                <p className="text-sm font-medium text-ink-primary">
                  {contactContent.githubDisplay}
                </p>
              </div>
            </a>
          </ScrollReveal>

          {/* Location card */}
          <ScrollReveal delay={0.12}>
            <div className="card-base rounded-xl p-5 flex flex-col gap-3 h-full">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-surface text-accent">
                <Icon name="globe" size={15} />
              </span>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-1">
                  Location
                </p>
                <p className="text-sm font-medium text-ink-primary">
                  {contactContent.location}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* CV download — same accent CTA as Nav / Hero / StickyBar */}
        <ScrollReveal delay={0.18}>
          <LinkButton
            href={contactContent.cvPath}
            download={SITE.cvFilename}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto font-semibold"
            leftIcon={<DownloadIcon />}
            aria-label="Download Tamal Saha's CV as a PDF"
          >
            {contactContent.cvLabel}
          </LinkButton>
        </ScrollReveal>
      </div>
    </section>
  )
}
