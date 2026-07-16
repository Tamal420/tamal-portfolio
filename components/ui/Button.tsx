import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  // Light fill — highest-emphasis actions on dark surfaces
  primary:
    'bg-ink-primary text-[#0A0A0A] hover:bg-ink-secondary active:scale-[0.98] border border-transparent',
  // Outline secondary — strong enough border/text to read as a control on dark bg
  ghost:
    'bg-base-card text-ink-primary border border-ink-tertiary hover:border-ink-secondary hover:bg-base-elevated active:scale-[0.98]',
  // Accent green — CV / status-level actions
  accent:
    'bg-accent-surface text-accent border border-accent-muted hover:bg-[#002A1A] active:scale-[0.98]',
  // Quiet outline — tertiary actions
  outline:
    'bg-transparent text-ink-secondary border border-border-default hover:border-ink-tertiary hover:text-ink-primary hover:bg-base-elevated active:scale-[0.98]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-sm gap-2.5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-md font-medium',
          'transition-all duration-150 cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
          // Variants and sizes
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

/**
 * Link-styled button — renders an anchor but looks like a Button.
 * Used for CV download and external links.
 */
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        'transition-all duration-150 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {leftIcon && <span className="shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </a>
  )
}
