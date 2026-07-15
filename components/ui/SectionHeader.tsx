import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 md:mb-14',
        align === 'center' && 'text-center',
        className
      )}
    >
      <p className="section-eyebrow">{eyebrow}</p>
      <h2
        className={cn(
          'text-2xl md:text-3xl lg:text-4xl font-semibold text-ink-primary text-balance',
          'tracking-tight leading-tight mt-1'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-sm md:text-[1rem] text-ink-secondary leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
