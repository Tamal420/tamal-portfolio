'use client'

import { useEffect } from 'react'
import { SITE } from '@/lib/constants'
import { Button, LinkButton } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-base px-6 text-center"
      role="alert"
      aria-labelledby="error-heading"
    >
      <p className="text-[11px] uppercase tracking-widest font-semibold text-accent mb-3">
        Unable to load
      </p>
      <h1
        id="error-heading"
        className="font-display text-2xl sm:text-3xl font-semibold text-ink-primary mb-3"
      >
        Something went wrong
      </h1>
      <p className="text-sm text-ink-secondary mb-8 max-w-md leading-relaxed">
        This page failed to load, so the portfolio content could not be shown.
        Try again. If it keeps happening, email me or return to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
        <Button type="button" variant="primary" size="md" onClick={reset}>
          Try again
        </Button>
        <LinkButton
          href={`mailto:${SITE.email}?subject=${encodeURIComponent('Portfolio page failed to load')}`}
          variant="outline"
          size="md"
        >
          Email Tamal
        </LinkButton>
        <LinkButton href="/" variant="outline" size="md">
          Back to homepage
        </LinkButton>
      </div>
      {error.digest ? (
        <p className="mt-6 text-xs text-ink-tertiary">Reference: {error.digest}</p>
      ) : null}
    </main>
  )
}
