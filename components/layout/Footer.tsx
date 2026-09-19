import { SITE, NAV_LINKS } from '@/lib/constants'

/**
 * Minimal footer — name/role, quick nav links, GitHub, copyright.
 * Recruiter-focused: no decorative content, just navigation and a
 * final unobtrusive confirmation of who this site belongs to.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-base border-t border-border-subtle py-10" role="contentinfo">
      <div className="container-portfolio">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Identity */}
          <div>
            <p className="font-display text-sm font-semibold text-ink-primary">
              {SITE.name}
            </p>
            <p className="text-xs text-ink-tertiary mt-1">
              {SITE.role} · {SITE.company}
            </p>
          </div>

          {/* Quick nav */}
          <nav
            className="flex flex-wrap gap-x-5 gap-y-2"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-ink-tertiary hover:text-ink-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="flex flex-col sm:items-end gap-1">
            <p className="text-[11px] text-ink-tertiary">
              © {year} {SITE.name}. Built with care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
