// ─── Personal information ─────────────────────────────────────────────────────
// Single source of truth — update here and it propagates everywhere

export const SITE = {
  name: 'Tamal Saha',
  role: 'Associate SQA Engineer',
  company: 'Kaz Software',
  location: 'Dhaka, Bangladesh',
  email: 'tamalsaha700.ts@gmail.com',
  github: 'https://github.com/Tamal420',
  githubDisplay: 'github.com/Tamal420',
  cvPath: '/Tamal_Saha_SQA_Resume.pdf',
  cvFilename: 'Tamal_Saha_SQA_Resume.pdf',
  url: 'https://tamalsaha.dev',
  statusLabel: 'Open to new opportunities',
  photoPath: '/portfolio_image.png',
} as const

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Projects',   href: '#projects',     ariaLabel: 'Project showcase' },
  { label: 'Bugs',       href: '#bugs',         ariaLabel: 'Bug Hall of Fame' },
  { label: 'Lab',        href: '#lab',          ariaLabel: 'QA Thinking Lab' },
  { label: 'Automation', href: '#automation',   ariaLabel: 'Automation Journey' },
  { label: 'Skills',     href: '#skills',       ariaLabel: 'Skills and tools' },
  { label: 'About',      href: '#about',        ariaLabel: 'About Tamal Saha' },
  { label: 'Contact',    href: '#contact',      ariaLabel: 'Contact Tamal Saha' },
] as const

// ─── Industry display config ──────────────────────────────────────────────────

export const INDUSTRY_CONFIG = {
  healthcare: {
    label: 'Healthcare SaaS',
    bgClass: 'bg-accent-surface',
    textClass: 'text-accent',
    borderClass: 'border-accent-muted',
  },
  edtech: {
    label: 'EdTech',
    bgClass: 'bg-[#1A1200]',
    textClass: 'text-[#F59E0B]',
    borderClass: 'border-[#7A4A00]',
  },
  streaming: {
    label: 'Music Streaming',
    bgClass: 'bg-[#0D0020]',
    textClass: 'text-[#A78BFA]',
    borderClass: 'border-[#4C1D95]',
  },
} as const

// ─── Platform display config ──────────────────────────────────────────────────

export const PLATFORM_CONFIG = {
  web:     { label: 'Web',      icon: 'globe' },
  android: { label: 'Android',  icon: 'brand-android' },
  ios:     { label: 'iOS',      icon: 'brand-apple' },
  api:     { label: 'REST API', icon: 'api' },
} as const

// ─── Severity display config ──────────────────────────────────────────────────

export const SEVERITY_CONFIG = {
  critical: {
    label: 'Critical',
    bgClass: 'bg-critical-bg',
    textClass: 'text-critical-text',
    borderClass: 'border-critical-border',
  },
  high: {
    label: 'High',
    bgClass: 'bg-high-bg',
    textClass: 'text-high-text',
    borderClass: 'border-high-border',
  },
  medium: {
    label: 'Medium',
    bgClass: 'bg-medium-bg',
    textClass: 'text-medium-text',
    borderClass: 'border-medium-border',
  },
} as const

// ─── Animation durations ──────────────────────────────────────────────────────

export const DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  hero: 0.6,
} as const

export const EASE = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
}
