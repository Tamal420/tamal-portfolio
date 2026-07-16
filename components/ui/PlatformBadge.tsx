import { PLATFORM_CONFIG } from '@/lib/constants'
import { Icon } from '@/components/ui/Icon'
import type { Platform } from '@/lib/types'

interface PlatformBadgeProps {
  platform: Platform
}

/**
 * Non-interactive platform label (Web, Android, iOS, API).
 * Sized for readable contrast — not a tap target; do not treat as a button.
 */
export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const config = PLATFORM_CONFIG[platform]

  return (
    <span
      className="inline-flex items-center gap-1.5 min-h-8 h-8 px-2.5 rounded-md text-xs font-medium bg-base-card border border-border-default text-ink-primary"
      title={config.label}
    >
      <Icon name={config.icon} size={13} />
      {config.label}
    </span>
  )
}
