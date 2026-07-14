'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '@/lib/constants'
import { contactContent } from '@/content/contact'
import { cn } from '@/lib/utils'

// ─── Download icon ────────────────────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

// ─── Mail icon ────────────────────────────────────────────────────────────────
function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

/**
 * StickyBar — always visible at the bottom of the viewport.
 * Appears after the user scrolls past the hero section.
 * Contains: status pill, location, CV download, email.
 *
 * On mobile: shows status + CV download only (compact).
 * On desktop: shows full bar with all elements.
 */
export function StickyBar() {
  const [visible, setVisible] = useState(false)
  const { stickyBar } = contactContent

  // Show bar after scrolling past ~80vh
  useEffect(() => {
    const threshold =
      typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600

    const handleScroll = () => {
      setVisible(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-bar"
          className={cn(
            'fixed bottom-0 inset-x-0 z-40',
            'bg-base-raised/90 backdrop-blur-[12px]',
            'border-t border-border-subtle',
            'pb-safe' // safe area for mobile home indicator
          )}
          initial={{ y: 64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 64, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="complementary"
          aria-label="Quick actions bar"
        >
          <div className="container-portfolio h-12 flex items-center justify-between gap-4">

            {/* Left: status + location */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Status dot */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className="block w-1.5 h-1.5 rounded-full bg-accent animate-status-pulse"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium text-accent hidden sm:block">
                  {stickyBar.statusLabel}
                </span>
              </div>

              {/* Divider */}
              <span className="text-border-default text-xs hidden sm:block" aria-hidden="true">·</span>

              {/* Location */}
              <span className="text-xs text-ink-tertiary hidden sm:block truncate">
                {stickyBar.location}
              </span>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Email — hidden on smallest screens */}
              <a
                href={`mailto:${SITE.email}`}
                className={cn(
                  'hidden sm:flex items-center gap-1.5',
                  'h-8 px-3 rounded text-xs font-medium',
                  'text-ink-secondary hover:text-ink-primary',
                  'border border-border-subtle hover:border-border-default',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                )}
                aria-label={`Email ${SITE.email}`}
              >
                <MailIcon />
                <span className="hidden lg:block">{stickyBar.emailLabel}</span>
                <span className="lg:hidden">Email</span>
              </a>

              {/* CV Download — always visible */}
              <a
                href={SITE.cvPath}
                download={SITE.cvFilename}
                className={cn(
                  'flex items-center gap-1.5',
                  'h-8 px-3 rounded text-xs font-medium',
                  'bg-accent-surface text-accent',
                  'border border-accent-muted',
                  'hover:bg-[#002A1A] transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
                )}
                aria-label="Download Tamal Saha's CV as PDF"
              >
                <DownloadIcon />
                {stickyBar.cvLabel}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
