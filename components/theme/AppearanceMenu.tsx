'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ACCENT_OPTIONS,
  THEME_OPTIONS,
  type AccentPreference,
  type ThemePreference,
} from '@/lib/appearance'
import { useAppearance } from '@/components/theme/AppearanceProvider'

function AppearanceIcon({ className }: { className?: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r="2.5" />
      <path d="M19 4.5A7.5 7.5 0 0 0 9.5 14" />
      <path d="M5 10.5A7.5 7.5 0 0 0 14.5 20" />
      <circle cx="10.5" cy="17.5" r="2.5" />
    </svg>
  )
}

function ThemeIcon({ id }: { id: ThemePreference }) {
  if (id === 'light') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }

  if (id === 'dark') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
      </svg>
    )
  }

  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M12 4v16" />
      <path d="M2 12h10" className="opacity-40" />
    </svg>
  )
}

/**
 * Compact appearance popover — Theme + Accent only.
 * Editorial control, not a dashboard settings panel.
 */
export function AppearanceMenu({ className }: { className?: string }) {
  const { theme, accent, setTheme, setAccent } = useAppearance()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const selectedAccent = ACCENT_OPTIONS.find((option) => option.id === accent)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 h-9 rounded-md px-2 md:px-2.5',
          'text-ink-secondary hover:text-ink-primary hover:bg-base-elevated',
          'border border-transparent hover:border-border-subtle',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          open && 'text-ink-primary bg-base-elevated border-border-subtle'
        )}
        aria-label="Appearance"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={menuId}
      >
        <AppearanceIcon className={cn(open && 'text-accent')} />
        <span className="hidden md:inline text-xs font-medium tracking-wide">
          Appearance
        </span>
      </button>

      {open && (
        <div
          id={menuId}
          role="dialog"
          aria-label="Appearance settings"
          className={cn(
            'absolute right-0 top-full z-50 mt-2 w-[17.5rem]',
            'rounded-xl border border-border-subtle bg-base-card p-3.5',
            'shadow-card-hover'
          )}
        >
          {/* Theme */}
          <div className="mb-3.5">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-2">
              Theme
            </p>
            <div
              className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-base border border-border-subtle"
              role="radiogroup"
              aria-label="Theme"
            >
              {THEME_OPTIONS.map((option) => {
                const selected = theme === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTheme(option.id)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1 h-[3.25rem] rounded-md text-[11px] font-medium transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
                      selected
                        ? 'bg-accent-surface text-accent shadow-card'
                        : 'text-ink-secondary hover:text-ink-primary hover:bg-base-elevated'
                    )}
                  >
                    <ThemeIcon id={option.id} />
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="h-px bg-border-subtle mb-3.5" aria-hidden="true" />

          {/* Accent */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary">
                Accent
              </p>
              <p className="text-[11px] font-medium text-ink-secondary tabular-nums">
                {selectedAccent?.label ?? 'Green'}
              </p>
            </div>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Accent color"
            >
              {ACCENT_OPTIONS.map((option) => {
                const selected = accent === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => setAccent(option.id)}
                    className={cn(
                      'relative w-7 h-7 rounded-full transition-transform duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base-card',
                      selected
                        ? 'scale-105 ring-2 ring-accent ring-offset-2 ring-offset-base-card'
                        : 'hover:scale-105'
                    )}
                    style={{ backgroundColor: option.swatch }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
