'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SITE } from '@/lib/constants'
import { useScrollSpy, useScrolled, useScrollProgress } from '@/hooks/useScrollSpy'
import { scrollToSection } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { LinkButton } from '@/components/ui/Button'

// Section ids for scroll spy (without #)
const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''))

// ─── Download icon ────────────────────────────────────────────────────────────
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

// ─── Menu icon ────────────────────────────────────────────────────────────────
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </>
      )}
    </svg>
  )
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────
function MobileDrawer({
  open,
  onClose,
  activeId,
}: {
  open: boolean
  onClose: () => void
  activeId: string
}) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const handleNavClick = (href: string) => {
    onClose()
    setTimeout(() => scrollToSection(href), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            id="mobile-nav"
            className="fixed inset-x-0 top-0 z-50 flex flex-col bg-base-raised border-b border-border-subtle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle">
              <span className="font-display text-lg font-semibold text-ink-primary tracking-tight">
                TS
              </span>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-11 h-11 rounded-md text-ink-secondary hover:text-ink-primary hover:bg-base-elevated transition-colors"
                aria-label="Close navigation menu"
              >
                <MenuIcon open={true} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col py-3 px-3">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeId === link.href.replace('#', '')
                return (
                  <motion.button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      'flex items-center h-14 px-4 rounded-md text-base font-medium transition-colors text-left',
                      isActive
                        ? 'text-accent bg-accent-surface'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-base-elevated'
                    )}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    aria-label={link.ariaLabel}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
            </nav>

            {/* Download CV — always visible at bottom of drawer */}
            <div className="px-5 pb-6 pt-3 mt-auto border-t border-border-subtle">
              <LinkButton
                href={SITE.cvPath}
                download={SITE.cvFilename}
                variant="accent"
                size="lg"
                className="w-full"
                leftIcon={<DownloadIcon />}
                aria-label="Download Tamal Saha's CV as PDF"
              >
                Download CV
              </LinkButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Nav ─────────────────────────────────────────────────────────────────
export function Nav() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const wasDrawerOpen = useRef(false)
  const scrolled = useScrolled(60)
  const progress = useScrollProgress()
  const activeId = useScrollSpy(SECTION_IDS)

  // Return focus to hamburger when drawer closes
  useEffect(() => {
    if (wasDrawerOpen.current && !drawerOpen) {
      menuButtonRef.current?.focus()
    }
    wasDrawerOpen.current = drawerOpen
  }, [drawerOpen])

  const handleNavClick = (href: string) => {
    scrollToSection(href)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 h-16 transition-all duration-200',
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        )}
        role="banner"
      >
        {/* Scroll progress bar — 2px green line at very top */}
        <div
          className="absolute top-0 left-0 h-[2px] bg-accent transition-none"
          style={{ width: `${progress * 100}%` }}
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        <div className="container-portfolio h-full flex items-center justify-between">
          {/* Logo / wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-lg font-semibold text-ink-primary tracking-tight hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label="Scroll to top — Tamal Saha"
          >
            TS
          </button>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.href.replace('#', '')
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'relative px-3 py-1.5 text-sm font-medium rounded transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive
                      ? 'text-ink-primary'
                      : 'text-ink-tertiary hover:text-ink-secondary'
                  )}
                  aria-label={link.ariaLabel}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-px bg-accent"
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <LinkButton
              href={SITE.cvPath}
              download={SITE.cvFilename}
              variant="accent"
              size="sm"
              leftIcon={<DownloadIcon />}
              aria-label="Download Tamal Saha's CV as PDF"
            >
              Download CV
            </LinkButton>
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            onClick={() => setDrawerOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-ink-secondary hover:text-ink-primary hover:bg-base-elevated transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
          >
            <MenuIcon open={false} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeId={activeId}
      />
    </>
  )
}
