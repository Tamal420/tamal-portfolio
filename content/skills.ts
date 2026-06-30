import type { SkillCategory, DomainBadge } from '@/lib/types'

export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    tier: 'core',
    label: 'Daily professional use',
    color: 'text-accent',
    skills: [
      'Manual Testing',
      'API Testing',
      'Web Application Testing',
      'Android Testing',
      'iOS Testing',
      'RBAC Testing',
      'Authorization Workflow Testing',
      'Billing Verification',
      'Invoice Validation',
      'Regression Testing',
      'Smoke Testing',
      'Sanity Testing',
      'UAT',
      'End-to-End Testing',
      'Authentication Testing',
      'Notification Testing',
    ],
  },
  {
    id: 'tools',
    tier: 'regular',
    label: 'Tools — regular professional use',
    color: 'text-[#3B82F6]',
    skills: [
      'Jira',
      'Postman',
      'Swagger',
      'Chrome DevTools',
      'BrowserStack',
      'Android Studio',
      'Git',
      'GitHub',
      'Cross-browser Testing',
      'Compatibility Testing',
      'Mobile App Testing',
    ],
  },
  {
    id: 'database',
    tier: 'database',
    label: 'Database — used in testing context',
    color: 'text-ink-secondary',
    skills: ['SQL', 'MySQL', 'MongoDB'],
  },
  {
    id: 'automation',
    tier: 'learning',
    label: 'Automation — actively learning and applying',
    color: 'text-[#F59E0B]',
    skills: ['Playwright', 'Python'],
  },
]

export const domainBadges: DomainBadge[] = [
  {
    label: 'Healthcare SaaS',
    color: 'bg-accent-surface text-accent border-accent-muted',
  },
  {
    label: 'EdTech',
    color: 'bg-[#1A1200] text-[#F59E0B] border-[#7A4A00]',
  },
  {
    label: 'Music Streaming',
    color: 'bg-[#0D0020] text-[#A78BFA] border-[#4C1D95]',
  },
  {
    label: 'Mobile Applications',
    color: 'bg-medium-bg text-medium-text border-medium-border',
  },
]
