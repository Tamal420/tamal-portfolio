import type { LabScenario } from '@/lib/types'

export const labScenarios: LabScenario[] = [
  // ─── Scenario 1 — Billing verification ─────────────────────────────────
  {
    id: 'billing',
    domain: 'Billing Verification',
    title: 'Validating billing calculation logic in a healthcare SaaS context',
    context:
      'Billing calculations in an EVV platform determine the financial records submitted to payers. A defect here doesn\'t produce a UX bug — it produces an incorrect financial record with regulatory and operational consequences. This scenario walks through how I approach testing a billing module on WebEVV.',
    steps: [
      {
        title: 'Understanding what is being tested',
        body: 'Before writing a single test case, I understand what the billing module is calculating and why it matters. I need to know: what inputs drive the calculation (patient authorisations, visit records, service codes, hospitalisation periods), what the expected output is, and what downstream systems consume that output. A billing calculation is not just a number — it is a financial record with regulatory consequences.',
      },
      {
        title: 'Identifying the risk surface',
        body: 'I map the conditions under which billing could produce an incorrect value before writing test cases. Key risk areas: authorisation period boundaries (what happens at the first and last day of an auth window), hospitalisation overlaps (does the system exclude hospitalised days correctly), service unit calculations against authorised limits, and multi-service-period scenarios where two configurations are active simultaneously. I specifically look for edge cases involving overlapping states — because overlap conditions are where billing logic most commonly breaks.',
      },
      {
        title: 'Test design decisions',
        body: 'I prioritise scenarios that combine multiple conditions rather than testing each in isolation. A hospitalisation that begins mid-visit-window and ends mid-authorisation-period is more likely to expose a defect than a clean hospitalisation that begins and ends on authorisation boundaries. I also test boundary dates explicitly — the day before, the day of, and the day after each transition — because boundary logic is where calculation defects concentrate. I run the same scenario across multiple patient configurations to verify the issue is systematic rather than record-specific.',
      },
      {
        title: 'Using DevTools to investigate API-layer behaviour',
        body: 'When a billing calculation produces an unexpected result, I don\'t stop at the UI. I open Chrome DevTools and inspect the API request that triggered the calculation — checking what inputs were sent to the backend, what the response payload contains, and whether the incorrect value is coming from the API or being introduced at the UI rendering layer. This distinction matters for the bug report: a calculation defect in the API is a backend issue; a display defect in the UI is a frontend issue. Conflating them produces an incomplete bug report and a longer resolution cycle.',
      },
      {
        title: 'Outcome and reporting approach',
        body: 'When I identify a billing defect, I document the exact input conditions that reproduce it, the expected versus actual output, the API response that confirms the issue is server-side, and the potential downstream impact. Billing defects in healthcare SaaS require precise, reproducible bug reports because the fix needs to be verified not just against the UI but against the financial logic itself. I verify the fix by re-running the full set of boundary and overlap scenarios, not just the one that originally exposed the defect.',
      },
    ],
  },

  // ─── Scenario 2 — RBAC testing ─────────────────────────────────────────
  {
    id: 'rbac',
    domain: 'RBAC Testing',
    title: 'Role-based access control validation on a multi-role healthcare platform',
    context:
      'In a healthcare platform, incorrect access control is not a UI inconvenience — it is a data privacy and compliance risk. Testing RBAC on WebEVV means verifying that caregiver, supervisor, administrator, and billing roles each access only what they are permitted to access — at both the UI and API layer.',
    steps: [
      {
        title: 'Understanding the role model',
        body: 'RBAC testing starts with understanding the full role matrix — not just what each role can access, but what each role must not access. On WebEVV, four roles interact with overlapping data: caregiver, supervisor, administrator, and billing. Before testing, I map out the permission boundaries: which data objects each role can read, write, and delete; which workflows each role can initiate or approve; and which combinations of role and action should be explicitly blocked. The gaps between roles — the boundaries — are where access control defects most commonly live.',
      },
      {
        title: 'Risk identification',
        body: 'The highest-risk areas in RBAC testing are: privilege escalation (a lower-permission role accessing a higher-permission function), horizontal access (a role accessing another user\'s data within the same role tier), and missing UI enforcement that doesn\'t match server-side validation (the UI hides a button, but the API endpoint is still accessible). I prioritise testing API-level access control directly — not just whether the UI hides restricted functions, but whether the underlying endpoints reject requests from unpermitted roles.',
      },
      {
        title: 'Test design approach',
        body: 'I test each permission boundary explicitly — logged in as Role A, attempting the action that Role B is permitted to perform, and verifying the system returns the correct rejection. I use Postman to test API endpoints directly with tokens from each role, independent of the UI. I also test state transitions: a caregiver who has been downgraded to a restricted role should not retain access to functions their previous permissions allowed. Session and token behaviour at role change is a specific risk area I test explicitly.',
      },
      {
        title: 'What good and bad results look like',
        body: 'A correctly implemented RBAC system returns a consistent 403 or equivalent rejection for every unauthorised request — at both the UI and API layer. A defective implementation might return a 200 with an empty payload (silent data hiding rather than access rejection), redirect to an error page rather than returning the correct status code, or allow access to the endpoint while the UI appears to have blocked it. Each of these failure modes requires a different fix — which is why I note the exact response behaviour in every RBAC-related bug report.',
      },
      {
        title: 'Why RBAC testing matters in healthcare SaaS',
        body: 'In a healthcare platform, incorrect access control is not a UI inconvenience — it is a data privacy and compliance risk. A caregiver who can access another patient\'s records, or a billing user who can modify visit data they should only read, creates both a regulatory exposure and a trust failure. I approach RBAC testing with this context in mind — not as a checkbox exercise but as a systematic verification that the system\'s access model actually holds under real conditions.',
      },
    ],
  },

  // ─── Scenario 3 — Authentication testing ────────────────────────────────
  {
    id: 'auth',
    domain: 'Authentication Testing',
    title: 'Testing OTP-gated authentication flows and bypass risk',
    context:
      'OTP verification exists to confirm identity before granting account access. On Dignify, I found that the artist account creation flow could be completed without passing OTP verification — an authentication bypass that exposed the platform to unverified account creation at scale. This scenario walks through how I approach authentication testing.',
    steps: [
      {
        title: 'Understanding the authentication flow',
        body: 'Authentication testing begins with mapping the full flow: entry points, verification steps, token issuance, session management, and the states a user can be in at each step. For an OTP-gated registration flow, I map: what triggers OTP generation, where OTP validation occurs (client-side, server-side, or both), what happens if validation is skipped or the request is replayed, and what account state results from each path through the flow. The OTP step exists to verify identity — my goal is to confirm the system enforces that verification, not just presents it.',
      },
      {
        title: 'Identifying bypass and edge case risks',
        body: 'Authentication flows have a predictable set of risk areas: OTP bypass (completing registration without submitting a valid OTP), OTP replay (reusing an already-used OTP), expired OTP acceptance (validating an OTP past its validity window), and race conditions (submitting the registration form simultaneously with or before OTP validation completes). I test each of these explicitly — not because they are likely user behaviours, but because they are known attack patterns and accidental implementation gaps.',
      },
      {
        title: 'Test execution and investigation approach',
        body: 'For OTP bypass testing specifically, I test whether the registration endpoint can be called successfully without a valid OTP response in the session — using both the UI flow and direct API calls via Postman. If the UI enforces OTP before allowing form submission but the API does not enforce it server-side, the bypass exists regardless of what the UI shows. On Dignify, this is exactly what I found: the UI presented the OTP step, but the registration API accepted a completion request without requiring OTP validation — producing an active, unverified account.',
      },
      {
        title: 'Documenting the finding',
        body: 'For an authentication defect of this type, the bug report must include: the exact steps to reproduce the bypass, the API request that demonstrates server-side enforcement is missing, the resulting account state (active and accessible), and the security implication. I also note whether the defect is in the server-side enforcement, the client-side validation, or both — because the fix for each is different. A UI fix alone does not close a server-side bypass.',
      },
      {
        title: 'Verification after the fix',
        body: 'After a fix is deployed, I re-run the full bypass scenario — not just the happy path. I verify that the registration endpoint now rejects requests without valid OTP validation server-side, that the OTP expiry window is enforced, and that previously bypassed accounts are handled appropriately. Authentication fixes require regression coverage of all previously tested bypass paths — not just confirmation that the originally reported scenario no longer works.',
      },
    ],
  },
]
