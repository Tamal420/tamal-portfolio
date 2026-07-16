import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ─── Font families ───────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        display: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.mono],
      },

      // ─── Color system ─────────────────────────────────────────────
      colors: {
        // Base surfaces
        // NOTE: never use Tailwind `text-base` / `sm:text-base` for font size —
        // the `base` color token collides and paints text as #0A0A0A. Use text-[1rem].
        base: {
          DEFAULT: '#0A0A0A', // page background
          raised: '#111111', // hero + contact bookends
          card: '#1A1A1A',   // card backgrounds, code blocks
          elevated: '#242424', // hover states, expanded panels
        },

        // Borders
        border: {
          subtle: '#2E2E2E',
          default: '#3A3A3A',
        },

        // Text
        ink: {
          primary: '#FAFAFA',
          secondary: '#A1A1A1',
          tertiary: '#8A8A8A',
        },

        // Accent — signal green (one accent only)
        accent: {
          DEFAULT: '#00C278',
          muted: '#00875A',
          surface: '#001A0F',
        },

        // Severity system (Bug Hall of Fame)
        critical: {
          bg: '#2A0808',
          text: '#FF5555',
          border: '#7A1A1A',
        },
        high: {
          bg: '#2A1800',
          text: '#F59E0B',
          border: '#7A4A00',
        },
        medium: {
          bg: '#001828',
          text: '#3B82F6',
          border: '#1A3A5A',
        },
      },

      // ─── Typography ───────────────────────────────────────────────
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.5rem' }],
        base: ['1rem', { lineHeight: '1.75rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
      },

      // ─── Spacing ──────────────────────────────────────────────────
      maxWidth: {
        container: '1200px',
      },

      // ─── Border radius ────────────────────────────────────────────
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },

      // ─── Animation ────────────────────────────────────────────────
      keyframes: {
        // Bug ticker — GPU-composited CSS animation
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Status dot pulse
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.85)' },
        },
        // Active timeline node ring
        ring: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        // Fade in from bottom (scroll reveal fallback)
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        'ticker-pause': 'ticker 40s linear infinite paused',
        'status-pulse': 'pulse 2s ease-in-out infinite',
        'node-ring': 'ring 1.5s ease-out infinite',
        'fade-up': 'fadeUp 0.4s ease-out forwards',
      },

      // ─── Shadows ─────────────────────────────────────────────────
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.6)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.5)',
        'accent-glow': '0 0 20px rgba(0,194,120,0.15)',
      },

      // ─── Backdrop blur ────────────────────────────────────────────
      backdropBlur: {
        nav: '12px',
      },
    },
  },

  plugins: [],
}

export default config
