import Link from 'next/link'
import { LinkButton } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center bg-base px-6 text-center"
      aria-labelledby="not-found-heading"
    >
      <p className="text-[11px] uppercase tracking-widest font-semibold text-accent mb-3">
        404
      </p>
      <h1
        id="not-found-heading"
        className="font-display text-2xl sm:text-3xl font-semibold text-ink-primary mb-3"
      >
        This page doesn&apos;t exist
      </h1>
      <p className="text-sm text-ink-secondary mb-8 max-w-sm">
        The page you&apos;re looking for isn&apos;t here. Head back to the homepage to view Tamal Saha&apos;s QA portfolio.
      </p>
      <LinkButton href="/" variant="primary" size="md">
        Back to homepage
      </LinkButton>
    </main>
  )
}
