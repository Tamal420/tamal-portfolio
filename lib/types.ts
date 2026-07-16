// ─── Project / Case Study ─────────────────────────────────────────────────────

export type Industry = 'healthcare' | 'edtech' | 'streaming'
export type Platform = 'web' | 'android' | 'ios' | 'api'
export type ProjectFormat = 'deep' | 'compact'

export interface Project {
  id: string
  name: string
  tagline: string
  industry: Industry
  platforms: Platform[]
  format: ProjectFormat        // 'deep' = WebEVV full case study, 'compact' = others
  what: string                 // product description paragraph
  scope: string                // responsibilities paragraph (HTML-safe, no JSX)
  scopeSections?: ScopeSection[] // optional structured breakdown for deep format
  testingTypes: string[]
  tools: string[]
  automationNote?: string      // WebEVV only — learning journey framing
  featured: boolean            // WebEVV = true, renders first and largest
  order: number                // sort order in grid
}

export interface ScopeSection {
  title: string
  body: string
}

// ─── Bug Hall of Fame ─────────────────────────────────────────────────────────

export type BugSeverity = 'critical' | 'high' | 'medium'

export interface BugEntry {
  id: string
  severity: BugSeverity
  title: string
  description: string
  impact: string               // "If shipped: ..."
  context: string              // "Identified during billing workflow validation"
  project: string              // display name
  platform?: string            // optional platform label
}

// ─── QA Thinking Lab ─────────────────────────────────────────────────────────

export interface LabStep {
  title: string
  body: string
}

export interface LabScenario {
  id: string
  domain: string               // e.g. "Billing Verification"
  title: string
  context: string              // intro paragraph shown above stepper
  steps: LabStep[]             // always 5 steps
}

// ─── Automation Journey ───────────────────────────────────────────────────────

export type NodeStatus = 'done' | 'active' | 'next'

export interface TimelineNode {
  id: string
  status: NodeStatus
  title: string
  description: string
  tags?: string[]
}

export interface AutomationContent {
  headline: string
  subheadline: string
  timeline: TimelineNode[]
  codeSnippet: string          // raw string — rendered in CodeBlock component
  codeLanguage: string
  codeCaption: string
  githubUrl: string
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export type SkillTier = 'core' | 'regular' | 'learning' | 'database'

export interface SkillCategory {
  id: string
  tier: SkillTier
  label: string                // display label e.g. "Daily professional use"
  color: string                // Tailwind text color class
  skills: string[]
}

export interface DomainBadge {
  label: string
  color: string                // Tailwind bg/text/border classes combined
}

// ─── Contributions ────────────────────────────────────────────────────────────

export interface MetricCard {
  value: string                // e.g. "6", "1+"
  label: string
  suffix?: string              // e.g. "+" appended after animated counter
}

export interface ContributionHighlight {
  id: string
  icon: string                 // icon name string — rendered by Icon component
  title: string
  paragraphs: string[]
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string                 // anchor id e.g. "#projects"
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export interface ContactContent {
  headline: string
  contextLine: string
  email: string
  github: string
  githubDisplay: string
  location: string
  cvPath: string
  cvLabel: string
  stickyBar: StickyBarContent
}

export interface StickyBarContent {
  statusLabel: string
  location: string
  cvLabel: string
  emailLabel: string
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroContent {
  name: string
  role: string
  company: string
  hookSentence: string
  contextLine: string
  statusLabel: string
  platforms: string[]
  cvLabel: string
  contactLabel: string
  photoAlt: string
}
