import type { Project } from '@/lib/types'

export const projects: Project[] = [
  // ─── 01 · WebEVV — FEATURED (deep format, renders first) ─────────────────
  {
    id: 'webevv',
    name: 'WebEVV',
    tagline: 'End-to-end QA across a healthcare SaaS platform managing patient visit records, billing, and invoicing.',
    industry: 'healthcare',
    platforms: ['web', 'android', 'api'],
    format: 'deep',
    featured: true,
    order: 1,

    what: `WebEVV is a Healthcare SaaS platform built for Electronic Visit Verification — the regulated process of recording and validating caregiver visits to patients receiving home care services. The platform covers the full operational lifecycle of a home healthcare agency: caregiver scheduling, patient management, authorization tracking, billing calculations, and invoice generation. Data accuracy across these workflows is non-negotiable — billing records, authorization limits, and visit logs each have downstream consequences for providers, payers, and patients.`,

    scope: `Full-cycle QA across the web application and Android platform, covering functional, regression, smoke, and end-to-end testing across multiple release cycles.`,

    scopeSections: [
      {
        title: 'RBAC and authorization workflow testing',
        body: 'Validated role-based access control across caregiver, supervisor, administrator, and billing user roles — ensuring each role accessed only its permitted data and functions, and that permission boundaries held under edge case conditions.',
      },
      {
        title: 'Appointment and scheduling workflow testing',
        body: 'Tested caregiver scheduling logic, visit window validation, and appointment state transitions — checking that visit records produced correct downstream data.',
      },
      {
        title: 'Billing and invoice validation',
        body: 'Verified billing calculation logic across patient authorization periods, hospitalization overlaps, and service configurations. Validated invoice generation against configured billing periods to ensure financial accuracy.',
      },
      {
        title: 'API validation using DevTools and Postman',
        body: 'Used Chrome DevTools to monitor API requests and responses, verify status codes, inspect response payloads, and validate frontend-backend integration during test execution. Used Postman for direct API endpoint validation.',
      },
    ],

    automationNote: `As part of my ongoing transition into test automation, I am learning Playwright with Python and applying those concepts to WebEVV test scenarios. I am working through locator strategies, writing assertions for key business workflows I already understand through manual testing, and building practical familiarity with how automation integrates alongside manual coverage. This is an active learning and implementation journey supported by professional Playwright training — not a completed automation practice.`,

    testingTypes: [
      'Functional',
      'Regression',
      'Smoke',
      'End-to-end',
      'RBAC Testing',
      'API Validation',
      'Billing Verification',
      'Authorization Workflow',
      'DevTools Monitoring',
      'Android Testing',
    ],

    tools: ['Postman', 'Chrome DevTools', 'Jira', 'BrowserStack', 'Android Studio', 'Git', 'Playwright (learning)', 'Python (learning)'],
  },

  // ─── 02 · ExpertEVV ───────────────────────────────────────────────────────
  {
    id: 'expertevv',
    name: 'ExpertEVV',
    tagline: 'Healthcare SaaS QA covering EVV workflows, authorization tracking, billing verification, and mobile testing.',
    industry: 'healthcare',
    platforms: ['web', 'android', 'api'],
    format: 'compact',
    featured: false,
    order: 2,

    what: `ExpertEVV is a Healthcare SaaS platform serving a distinct healthcare client within the Electronic Visit Verification domain. It follows a similar EVV workflow model — caregiver visit tracking, authorization management, and billing — but is operated for a different provider organisation with its own configuration, user base, and release schedule. Testing ExpertEVV required understanding the same regulatory context while adapting to a separate product configuration and client-specific workflows.`,

    scope: `Quality assurance across the full release cycle with a focus on healthcare workflow integrity and system stability. Responsibilities included functional testing of core EVV workflows, regression testing across releases to prevent regressions in authorization and billing logic, API validation of key endpoints using Postman, authorization workflow testing to verify permission boundaries, billing verification across service period configurations, mobile testing of the caregiver-facing application, and cross-browser compatibility testing of the web platform.`,

    testingTypes: [
      'Functional',
      'Regression',
      'API Validation',
      'Authorization Workflow',
      'Billing Verification',
      'Mobile Testing',
      'Cross-browser',
    ],

    tools: ['Postman', 'Jira', 'BrowserStack', 'Chrome DevTools', 'Android Studio'],
  },

  // ─── 03 · Dignify ─────────────────────────────────────────────────────────
  {
    id: 'dignify',
    name: 'Dignify',
    tagline: 'Full-platform QA for a music streaming marketplace — authentication, payments, content upload, and notifications.',
    industry: 'streaming',
    platforms: ['web', 'android', 'ios'],
    format: 'compact',
    featured: false,
    order: 3,

    what: `Dignify is a digital music streaming and marketplace platform where independent artists upload and monetise content, and users stream, purchase, and manage digital media. The platform spans artist onboarding and content management, user streaming and playlist management, a purchase and payment flow, and a notification system for artist-follower engagement.`,

    scope: `End-to-end QA across the full platform with particular attention to security-sensitive and financially sensitive flows. Testing covered authentication and OTP verification, artist onboarding and content upload workflows, playlist and streaming functionality, payment and purchase flows including pricing logic and transaction processing, notification delivery for artist-follower interactions, API validation using Chrome DevTools and Postman, and UI/UX consistency across device types.`,

    testingTypes: [
      'Authentication Testing',
      'OTP Verification',
      'Onboarding Validation',
      'Functional',
      'Payment Workflow',
      'Notification Testing',
      'API Validation',
      'UI/UX Testing',
      'Regression',
    ],

    tools: ['Postman', 'Chrome DevTools', 'Jira', 'BrowserStack'],
  },

  // ─── 04 · Hakma — Little Muslim Hub ──────────────────────────────────────
  {
    id: 'hakma',
    name: 'Hakma — Little Muslim Hub',
    tagline: 'Cross-platform QA for a child-safe Islamic learning platform — subscriptions, gamification, and quiz flows.',
    industry: 'edtech',
    platforms: ['web', 'android', 'ios'],
    format: 'compact',
    featured: false,
    order: 4,

    what: `Hakma — Little Muslim Hub is an Islamic learning platform designed specifically for Muslim children, providing interactive Islamic stories, educational videos, quizzes, gamified learning activities, and progress tracking in a safe, ad-free environment. The platform serves parents and children seeking structured, age-appropriate Islamic education across web, Android, and iOS.`,

    scope: `Full-cycle QA across the web, Android, and iOS platforms, with particular focus on the safety and reliability of a child-facing application. Testing covered functional validation of core learning flows, subscription tier enforcement across platforms, gamified learning mechanics including reward systems and progress tracking accuracy, quiz scoring logic and data persistence, and cross-device compatibility testing using BrowserStack and Android Studio.`,

    testingTypes: [
      'Functional',
      'Regression',
      'Smoke',
      'Sanity',
      'UI/UX',
      'Subscription Validation',
      'Gamification Testing',
      'Quiz Testing',
      'Cross-device',
      'Android Testing',
      'iOS Testing',
      'Web Testing',
    ],

    tools: ['Jira', 'Postman', 'BrowserStack', 'Android Studio', 'Chrome DevTools'],
  },

  // ─── 05 · Kreebo Learn ────────────────────────────────────────────────────
  {
    id: 'kreebo',
    name: 'Kreebo Learn',
    tagline: 'QA across an AI-assisted elementary education platform — quizzes, gamification, and responsive testing.',
    industry: 'edtech',
    platforms: ['web', 'android', 'ios'],
    format: 'compact',
    featured: false,
    order: 5,

    what: `Kreebo Learn is an interactive educational platform designed for elementary students, providing standards-aligned lessons, quizzes, gamified learning experiences, AI-assisted support, and progress tracking across core subjects including mathematics, reading, science, geography, and life skills.`,

    scope: `End-to-end QA across the web, Android, and iOS platforms — covering functional testing of subject-specific lesson flows, AI-assisted feature validation to verify response accuracy and contextual appropriateness, quiz mechanics and scoring logic, gamification reward systems and level progression, and responsive testing across web screen sizes and mobile device configurations.`,

    testingTypes: [
      'Functional',
      'Regression',
      'Quiz Testing',
      'AI Feature Validation',
      'Gamification Testing',
      'Responsive Testing',
      'Android Testing',
      'iOS Testing',
      'Web Testing',
    ],

    tools: ['Jira', 'Postman', 'Chrome DevTools', 'Android Studio'],
  },

  // ─── 06 · BandScore9 ──────────────────────────────────────────────────────
  {
    id: 'bandscore9',
    name: 'BandScore9',
    tagline: 'Full-cycle QA for an IELTS preparation platform — mock tests, speaking rooms, and university assessments.',
    industry: 'edtech',
    platforms: ['web', 'android', 'ios'],
    format: 'compact',
    featured: false,
    order: 6,

    what: `BandScore9 is an IELTS preparation platform that provides mock tests, online courses, speaking practice sessions, university assessment features, and performance tracking tools for students preparing for higher education and international opportunities.`,

    scope: `Full-cycle QA across the web, Android, and iOS platforms — covering mock test workflow validation across all four IELTS skill areas, speaking room session testing including audio handling and recording behaviour, university assessment workflow validation, subscription and authentication flow testing, and cross-device compatibility across Android and iOS configurations.`,

    testingTypes: [
      'Functional',
      'Regression',
      'Subscription Validation',
      'Mock Test Workflow',
      'Authentication Testing',
      'Speaking Room Validation',
      'University Assessment Workflow',
      'Cross-device',
      'Android Testing',
      'iOS Testing',
      'Web Testing',
    ],

    tools: ['Jira', 'Postman', 'Chrome DevTools'],
  },
]
