'use client'

import { useEffect } from 'react'

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
      aria-labelledby="error-heading"
    >
      <p className="text-[11px] uppercase tracking-widest font-semibold text-accent mb-3">
        Error
      </p>
      <h1
        id="error-heading"
        className="font-display text-2xl sm:text-3xl font-semibold text-ink-primary mb-3"
      >
        Something went wrong
      </h1>
      <p className="text-sm text-ink-secondary mb-8 max-w-sm">
        This page failed to load. You can try again, or return to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center h-11 px-6 rounded-md text-sm font-semibold bg-ink-primary text-[#0A0A0A] hover:bg-ink-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Try again
        </button>
        <a
          href="/"
          className="inline-flex items-center justify-center h-11 px-6 rounded-md text-sm font-medium text-ink-primary border border-border-default hover:bg-base-elevated transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Back to homepage
        </a>
      </div>
    </main>
  )
}
