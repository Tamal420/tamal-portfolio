import { PLATFORM_CONFIG } from '@/lib/constants'
import { Icon } from '@/components/ui/Icon'
import type { Platform } from '@/lib/types'

interface PlatformBadgeProps {
  platform: Platform
}

/**
 * Small icon + label badge for a single platform (Web, Android, iOS, API).
 * Used inside ProjectCard footers to show platform coverage at a glance.
 */
export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const config = PLATFORM_CONFIG[platform]

  return (
    <span
      className="inline-flex items-center gap-1 h-6 px-2 rounded text-[11px] font-medium bg-base border border-border-subtle text-ink-tertiary"
      title={config.label}
    >
      <Icon name={config.icon} size={11} />
      {config.label}
    </span>
  )
}
