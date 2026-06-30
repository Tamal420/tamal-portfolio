interface IconProps {
  name: string
  size?: number
  className?: string
}

/**
 * Minimal inline SVG icon set — no external icon library dependency.
 * Keeps bundle size small and avoids a runtime icon-font request.
 * Add new icons here as needed; unknown names render nothing safely.
 */
export function Icon({ name, size = 18, className }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  }

  switch (name) {
    case 'heart-rate-monitor':
      return (
        <svg {...common}>
          <path d="M3 12h4l2 8 4-16 2 8h6" />
        </svg>
      )
    case 'api':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <path d="M14 17h7" />
          <path d="M17.5 14v7" />
        </svg>
      )
    case 'device-mobile':
      return (
        <svg {...common}>
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <line x1="11" y1="18" x2="13" y2="18" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
        </svg>
      )
    case 'brand-android':
      return (
        <svg {...common}>
          <path d="M5 16V9a7 7 0 0 1 14 0v7" />
          <line x1="5" y1="16" x2="19" y2="16" />
          <line x1="8" y1="3" x2="9.5" y2="5" />
          <line x1="16" y1="3" x2="14.5" y2="5" />
          <line x1="8" y1="19" x2="8" y2="21" />
          <line x1="16" y1="19" x2="16" y2="21" />
        </svg>
      )
    case 'brand-apple':
      return (
        <svg {...common}>
          <path d="M16.5 12.3c0-2 1.6-3 1.7-3-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.7-3.2.7-.7 0-1.7-.7-2.9-.7-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.1 9.3.8 1.1 1.7 2.4 2.9 2.3 1.1 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.3.6-.9.9-1.4 1.4-2.4-2.4-1-2-3.6-2-3.6z" />
          <path d="M13.5 4.5c.6-.7 1-1.7.9-2.7-.9.1-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2.1-.5 2.7-1.2z" />
        </svg>
      )
    case 'shield-check':
      return (
        <svg {...common}>
          <path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...common}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      )
    case 'music':
      return (
        <svg {...common}>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )
    case 'graduation-cap':
      return (
        <svg {...common}>
          <path d="M22 10L12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
        </svg>
      )
    default:
      return null
  }
}
