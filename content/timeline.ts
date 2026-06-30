import type { AutomationContent } from '@/lib/types'

export const automationContent: AutomationContent = {
  headline: 'Automation Journey',
  subheadline:
    'Transitioning from strong manual and API testing foundations into test automation. Actively learning Playwright with Python and applying those concepts to real healthcare SaaS workflows — building toward confident automation capability.',

  timeline: [
    {
      id: 'node-01',
      status: 'done',
      title: 'Manual QA foundation — core professional strength',
      description:
        'Built manual testing practice at Kaz Software across six products: structured test planning, RBAC validation, authorization and billing workflow testing, regression cycles, smoke and sanity testing, UAT, and end-to-end coverage. Manual testing is the foundation of my QA practice and my primary professional strength.',
      tags: ['Manual Testing', 'Jira', 'Postman', 'BrowserStack'],
    },
    {
      id: 'node-02',
      status: 'done',
      title: 'API testing and DevTools-based validation',
      description:
        'Developed API testing proficiency using Postman and Swagger across healthcare SaaS and education platforms. Established Chrome DevTools-based API monitoring as a regular part of manual test execution — verifying requests, status codes, response structures, and frontend-backend integration during live test cycles.',
      tags: ['Postman', 'Swagger', 'Chrome DevTools', 'REST API'],
    },
    {
      id: 'node-03',
      status: 'active',
      title: 'Playwright + Python — active learning and application',
      description:
        'Currently learning Playwright with Python through professional training and applying concepts to WebEVV test scenarios. Practising locator strategies, writing assertions for key business workflows, and building a practical understanding of how automation complements manual coverage on a platform I already know well. Active and ongoing.',
      tags: ['Playwright', 'Python', 'WebEVV', 'In training'],
    },
    {
      id: 'node-04',
      status: 'next',
      title: 'Goal — confident automation QA engineer',
      description:
        'Build toward writing and maintaining automation suites independently. CI/CD integration with GitHub Actions. Page Object Model patterns for maintainable, scalable test code. Goal: contributing automation coverage as a primary responsibility alongside manual QA on a product team.',
      tags: ['GitHub Actions', 'Page Object Model', 'CI/CD'],
    },
  ],

  // Real Playwright + Python pattern — update with your actual WebEVV snippet
  codeSnippet: `import pytest
from playwright.sync_api import Page, expect


def test_login_and_dashboard(page: Page):
    # Navigate to the application
    page.goto("https://app.webevv.com/login")

    # Fill credentials using accessible locators
    page.get_by_label("Username").fill("test_user@example.com")
    page.get_by_label("Password").fill("test_password")

    # Submit login form
    page.get_by_role("button", name="Sign In").click()

    # Assert successful navigation to dashboard
    expect(page.get_by_role("heading", level=1)).to_contain_text("Dashboard")

    # Verify key navigation elements are present
    expect(page.get_by_role("navigation")).to_be_visible()`,

  codeLanguage: 'python',
  codeCaption: 'Playwright + Python — applying automation concepts to WebEVV login and dashboard validation. Part of my active learning journey.',
  githubUrl: 'https://github.com/Tamal420',
}
