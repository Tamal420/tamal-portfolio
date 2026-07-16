import Link from 'next/link'

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
      <Link
        href="/"
        className="inline-flex items-center justify-center h-11 px-6 rounded-md text-sm font-semibold bg-ink-primary text-[#0A0A0A] hover:bg-ink-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Back to homepage
      </Link>
    </main>
  )
}
