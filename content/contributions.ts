import type { MetricCard, ContributionHighlight } from '@/lib/types'
import { projects } from '@/content/projects'
import { INDUSTRY_CONFIG } from '@/lib/constants'

export const metricCards: MetricCard[] = [
  {
    value: '6',
    label: 'Products tested',
  },
  {
    value: '3',
    label: 'Industries covered',
  },
  {
    value: '4',
    label: 'Platforms — Web, Android, iOS, API',
  },
  {
    value: '1',
    label: 'Year at Kaz Software',
    suffix: '+',
  },
]

export const contributionHighlights: ContributionHighlight[] = [
  {
    id: 'healthcare',
    icon: 'heart-rate-monitor',
    title: 'Healthcare SaaS testing',
    paragraphs: [
      'QA across EVV platforms managing patient authorizations, caregiver scheduling, billing, and invoicing — software where financial and care data accuracy are operationally critical.',
      'RBAC validation, billing verification, and authorization workflow testing across two healthcare SaaS products.',
    ],
  },
  {
    id: 'api',
    icon: 'api',
    title: 'API and DevTools validation',
    paragraphs: [
      'REST API testing using Postman and Swagger combined with Chrome DevTools-based API monitoring during live test execution.',
      'Validating request and response structures, status codes, and frontend-backend integration across healthcare, education, and music streaming platforms.',
    ],
  },
  {
    id: 'mobile',
    icon: 'device-mobile',
    title: 'Cross-platform mobile coverage',
    paragraphs: [
      'Android and iOS testing across real devices and BrowserStack cloud configurations.',
      'Functional, regression, and compatibility coverage across mobile products in healthcare, music streaming, and education — verifying consistent behaviour across OS versions and device types.',
    ],
  },
]

export const impactStatements = [
  {
    id: 'impact-01',
    paragraphs: [
      'Delivered end-to-end QA coverage on WebEVV and ExpertEVV — healthcare SaaS platforms managing caregiver scheduling, patient authorizations, billing, and invoicing.',
      'Coverage spanned web, Android, and REST API layers within the same release cycle.',
    ],
    context: 'WebEVV · ExpertEVV · Healthcare SaaS · Web, Android, REST API · Kaz Software',
  },
  {
    id: 'impact-02',
    paragraphs: [
      'Tested six products across healthcare, education, and music streaming — covering web applications, Android apps, iOS apps, and REST APIs.',
      'Applied RBAC testing, authorization workflow validation, billing verification, and cross-browser compatibility checks within a single professional year.',
    ],
    context: '6 projects · Healthcare SaaS + EdTech + Music Streaming · Web + Android + iOS + API',
  },
  {
    id: 'impact-03',
    paragraphs: [
      'Actively learning Playwright with Python and applying automation concepts to WebEVV business workflows.',
      'Building toward automation capability while continuing to deliver manual and API testing coverage across live SaaS products.',
    ],
    context: 'Playwright · Python · WebEVV · Active learning journey · Kaz Software',
  },
]

// ─── Per-project contribution summaries ───────────────────────────────────────
// Derived directly from content/projects.ts — single source of truth.
// Used by the Featured QA Contributions section to showcase all 6 projects
// without duplicating or inventing any new content.

export interface ProjectContribution {
  id: string
  name: string
  tagline: string
  industryLabel: string
  industryClasses: { bg: string; text: string; border: string }
  platformCount: number
  testingTypeCount: number
  topTestingTypes: string[] // first 3, for compact display
  featured: boolean
  order: number
}

export const projectContributions: ProjectContribution[] = projects
  .map((p) => {
    const industry = INDUSTRY_CONFIG[p.industry]
    return {
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      industryLabel: industry.label,
      industryClasses: {
        bg: industry.bgClass,
        text: industry.textClass,
        border: industry.borderClass,
      },
      platformCount: p.platforms.length,
      testingTypeCount: p.testingTypes.length,
      topTestingTypes: p.testingTypes.slice(0, 3),
      featured: p.featured,
      order: p.order,
    }
  })
  .sort((a, b) => a.order - b.order)
