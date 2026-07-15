import type { ContactContent, HeroContent } from '@/lib/types'
import { SITE } from '@/lib/constants'

export const contactContent: ContactContent = {
  headline: "Let's talk",
  contextLine:
    'Open to QA engineering roles in manual testing, API testing, SaaS testing, or positions with an automation growth path. Based in Dhaka, Bangladesh. Available for remote, hybrid, or on-site positions.',
  email: SITE.email,
  github: SITE.github,
  githubDisplay: SITE.githubDisplay,
  location: SITE.location,
  cvPath: SITE.cvPath,
  cvLabel: 'Download CV — Tamal Saha',
  stickyBar: {
    statusLabel: 'Open to work',
    location: 'Dhaka, Bangladesh',
    cvLabel: 'Download CV',
    emailLabel: SITE.email,
  },
}

export const heroContent: HeroContent = {
  name: 'Tamal Saha',
  role: 'Associate SQA Engineer',
  company: 'Kaz Software',
  hookSentence:
    "I test software where a missed bug doesn't just frustrate a user — it disrupts a patient's care record.",
  contextLine:
    'Testing web, Android, and iOS applications across healthcare, education, and music streaming platforms — with growing experience in Playwright and Python automation.',
  statusLabel: 'Open to new opportunities',
  platforms: ['Web', 'Android', 'iOS', 'REST API'],
  cvLabel: 'Download CV',
  contactLabel: 'Get in touch',
  photoAlt: 'Tamal Saha — Associate SQA Engineer at Kaz Software',
}

export const aboutContent = {
  paragraphs: [
    `I'm an Associate SQA Engineer at Kaz Software in Dhaka, where I've spent the past year building test coverage across healthcare, education, and music streaming platforms. My core work is manual testing, API testing, and cross-platform mobile testing — covering web applications, Android apps, iOS apps, and REST APIs on products where quality has real consequences.`,

    `The healthcare domain has shaped how I work. Testing WebEVV and ExpertEVV — platforms that record and manage caregiver visit data, patient authorizations, billing, and invoicing for home healthcare providers — means that thoroughness is not optional. A missed defect in a billing workflow or an authorization flow doesn't just produce a bug report: it produces an incorrect financial record or a care delivery discrepancy. I think about what the data represents, not only whether the interface renders correctly.`,

    `Alongside my manual and API testing responsibilities, I am actively learning Playwright with Python. I am applying those concepts to test scenarios on WebEVV — working through locator strategies, writing assertions for key business workflows, and developing a practical understanding of how automation extends manual QA coverage. Professional training is supporting this journey.`,

    `My goal is to grow into a QA engineer who moves confidently between manual investigation and automated coverage — knowing when each approach best serves the product and the team.`,
  ],
  careerTimeline: [
    {
      year: '2025',
      title: 'Joined Kaz Software',
      description: 'Started as Associate SQA Engineer. First production project: WebEVV healthcare SaaS platform.',
    },
    {
      year: '2025–2026',
      title: 'Expanded to 6 projects',
      description: 'Delivered QA across healthcare SaaS, EdTech, and music streaming — adding API testing and cross-platform mobile coverage.',
    },
    {
      year: 'Now',
      title: 'Learning Playwright automation',
      description: 'Applying Playwright + Python to WebEVV scenarios. Professional training ongoing. Building toward full automation capability.',
    },
  ],
}
