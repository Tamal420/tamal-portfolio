import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ─── Class name utility ───────────────────────────────────────────────────────
// Merges Tailwind classes safely, resolving conflicts

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── Smooth scroll to section ─────────────────────────────────────────────────
// Uses explicit scroll position + html scroll-padding offset so the fixed nav
// never covers section headings.

function getScrollOffset(): number {
  if (typeof window === 'undefined') return 80
  const paddingTop = parseFloat(
    getComputedStyle(document.documentElement).scrollPaddingTop
  )
  return Number.isFinite(paddingTop) && paddingTop > 0 ? paddingTop : 80
}

export function scrollToSection(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return

  const offset = getScrollOffset()
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'

  window.scrollTo({ top, behavior })
}

// ─── Download CV ──────────────────────────────────────────────────────────────

export function downloadCV(path: string, filename: string) {
  const link = document.createElement('a')
  link.href = path
  link.download = filename
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// ─── Format email link ────────────────────────────────────────────────────────

export function mailtoLink(email: string, subject?: string): string {
  const encodedSubject = subject
    ? `?subject=${encodeURIComponent(subject)}`
    : ''
  return `mailto:${email}${encodedSubject}`
}

// ─── Clamp number ────────────────────────────────────────────────────────────

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// ─── Ease function for counter animation ─────────────────────────────────────

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// ─── Truncate text ────────────────────────────────────────────────────────────

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trim() + '…'
}

// ─── Check if reduced motion is preferred ────────────────────────────────────

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ─── Project filter helpers ───────────────────────────────────────────────────

export type FilterValue = 'all' | 'healthcare' | 'edtech' | 'streaming'

export function getFilterLabel(filter: FilterValue): string {
  const labels: Record<FilterValue, string> = {
    all: 'All Projects',
    healthcare: 'Healthcare SaaS',
    edtech: 'EdTech',
    streaming: 'Music Streaming',
  }
  return labels[filter]
}
