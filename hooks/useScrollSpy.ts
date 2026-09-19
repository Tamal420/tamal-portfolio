'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Detects which section is currently visible in the viewport.
 * Returns the id of the active section (without the # prefix).
 * Used by Nav to highlight the current section link.
 *
 * Uses scroll position (not IntersectionObserver) so programmatic
 * scrollToSection and manual scroll stay in sync with the nav highlight.
 */
export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>('')
  const sectionIdsRef = useRef(sectionIds)
  sectionIdsRef.current = sectionIds

  useEffect(() => {
    if (sectionIds.length === 0) return

    let rafId = 0

    const updateActive = () => {
      rafId = 0
      const reference = window.scrollY + offset
      let next = ''

      for (const id of sectionIdsRef.current) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        if (top <= reference + 1) {
          next = id
        }
      }

      const isAtDocumentEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 1
      if (isAtDocumentEnd) {
        next = sectionIdsRef.current[sectionIdsRef.current.length - 1] ?? next
      }

      setActiveId((prev) => (prev === next ? prev : next))
    }

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateActive)
      }
    }

    updateActive()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [sectionIds, offset])

  return activeId
}

/**
 * Returns true once the page has scrolled past a given pixel threshold.
 * Used by Nav for the backdrop-blur transition.
 */
export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}

/**
 * Returns a 0–1 scroll progress value.
 * Used by the nav scroll progress bar.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId: number

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return progress
}
