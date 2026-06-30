'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { heroContent } from '@/content/contact'
import { SITE } from '@/lib/constants'
import { scrollToSection } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ─── Icons ────────────────────────────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}

// ─── Platform badge ───────────────────────────────────────────────────────────
function PlatformBadge({ label }: { label: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center h-6 px-2.5 rounded text-[11px] font-medium',
        'bg-base-card border border-border-subtle text-ink-tertiary',
        'whitespace-nowrap'
      )}
    >
      {label}
    </span>
  )
}

// ─── Animation variants ───────────────────────────────────────────────────────
const HERO_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

// ─── Hero section ─────────────────────────────────────────────────────────────
export function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const h = heroContent

  return (
    <section
      id="hero"
      className="relative bg-base-raised min-h-screen flex flex-col"
      aria-label="Introduction"
    >
      {/* Background gradient — subtle radial from top-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 10% 0%, rgba(0,194,120,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Main content — vertically centred */}
      <div className="container-portfolio flex-1 flex items-center pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* ── Content column ── */}
          <div className="flex flex-col order-2 md:order-1">

            {/* Status pill */}
            <motion.div
              custom={0}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={HERO_VARIANTS}
              className="mb-5"
            >
              <span className="accent-pill" role="status" aria-live="polite">
                <span
                  className="block w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse shrink-0"
                  aria-hidden="true"
                />
                {h.statusLabel}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              custom={0.1}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={HERO_VARIANTS}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink-primary tracking-tight leading-none mb-2"
            >
              {h.name}
            </motion.h1>

            {/* Role + company */}
            <motion.p
              custom={0.18}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={HERO_VARIANTS}
              className="text-sm font-medium text-ink-tertiary tracking-widest uppercase mb-6"
            >
              {h.role}
              <span className="mx-2 text-border-default" aria-hidden="true">·</span>
              {h.company}
            </motion.p>

            {/* Hook sentence */}
            <motion.p
              custom={0.26}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={HERO_VARIANTS}
              className="text-xl sm:text-2xl font-semibold text-ink-primary leading-snug tracking-tight text-balance mb-4"
            >
              {h.hookSentence}
            </motion.p>

            {/* Context line */}
            <motion.p
              custom={0.34}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={HERO_VARIANTS}
              className="text-sm md:text-base text-ink-secondary leading-relaxed mb-8 max-w-lg"
            >
              {h.contextLine}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              custom={0.42}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={HERO_VARIANTS}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              {/* Primary: Download CV */}
              <a
                href={SITE.cvPath}
                download={SITE.cvFilename}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'h-12 px-6 rounded-md text-sm font-semibold',
                  'bg-ink-primary text-base',
                  'hover:bg-ink-secondary active:scale-[0.98]',
                  'transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base-raised',
                  'w-full sm:w-auto'
                )}
                aria-label="Download Tamal Saha's CV as a PDF"
              >
                <DownloadIcon />
                {h.cvLabel}
              </a>

              {/* Secondary: Get in touch */}
              <button
                onClick={() => scrollToSection('#contact')}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'h-12 px-6 rounded-md text-sm font-medium',
                  'bg-transparent text-ink-primary',
                  'border border-border-default',
                  'hover:border-ink-tertiary hover:bg-base-elevated',
                  'active:scale-[0.98] transition-all duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base-raised',
                  'w-full sm:w-auto'
                )}
                aria-label="Navigate to contact section"
              >
                {h.contactLabel}
                <ArrowIcon />
              </button>
            </motion.div>

            {/* Platform badges */}
            <motion.div
              custom={0.5}
              initial={shouldReduceMotion ? false : 'hidden'}
              animate="visible"
              variants={HERO_VARIANTS}
              className="flex flex-wrap gap-2"
              aria-label="Testing platforms"
            >
              {h.platforms.map((platform) => (
                <PlatformBadge key={platform} label={platform} />
              ))}
            </motion.div>
          </div>

          {/* ── Photo column ── */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <motion.div
              custom={0.05}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.05,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* Accent glow ring behind photo */}
              <div
                className="absolute inset-0 rounded-2xl"
                aria-hidden="true"
                style={{
                  background:
                    'radial-gradient(circle at center, rgba(0,194,120,0.12) 0%, transparent 70%)',
                  transform: 'scale(1.1)',
                }}
              />

              {/* Photo container */}
              <div
                className={cn(
                  'relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96',
                  'rounded-2xl overflow-hidden',
                  'border border-border-subtle',
                  'bg-base-card' // fallback if photo not yet added
                )}
              >
                <Image
                  src={SITE.photoPath}
                  alt={h.photoAlt}
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  className="object-cover object-top"
                  onError={() => {
                    // Photo not yet uploaded — placeholder renders via bg-base-card
                  }}
                />

                {/* Overlay gradient at bottom of photo — blends into content */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(17,17,17,0.4) 0%, transparent 100%)',
                  }}
                />
              </div>

              {/* Floating badge: company */}
              <div
                className={cn(
                  'absolute -bottom-3 left-1/2 -translate-x-1/2',
                  'flex items-center gap-2 px-4 py-2',
                  'bg-base-card border border-border-subtle rounded-full',
                  'whitespace-nowrap shadow-card'
                )}
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-xs font-medium text-ink-secondary">
                  {h.company}, Dhaka
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('#impact')}
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2',
          'flex flex-col items-center gap-1',
          'text-ink-tertiary hover:text-ink-secondary transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded'
        )}
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        aria-label="Scroll down to Impact Wall"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <motion.span
          animate={shouldReduceMotion ? {} : { y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDownIcon />
        </motion.span>
      </motion.button>
    </section>
  )
}
