import type { BugEntry } from '@/lib/types'

export const bugs: BugEntry[] = [
  // ─── Critical ─────────────────────────────────────────────────────────────
  {
    id: 'bug-01',
    severity: 'critical',
    title: 'Incorrect billing calculation for hospitalised patients',
    description:
      'Billing calculation logic produced incorrect billable values when a patient\'s hospitalisation period overlapped with scheduled care services. The system failed to account for the hospitalisation window correctly, resulting in inaccurate financial outputs for affected visit records.',
    impact:
      'If shipped: billing inaccuracies would have affected financial records for hospitalised patients — producing incorrect payable amounts for services delivered during overlapping periods.',
    context: 'Identified during billing workflow validation · reported before production deployment',
    project: 'WebEVV',
    platform: 'Healthcare SaaS',
  },
  {
    id: 'bug-02',
    severity: 'critical',
    title: 'Invoice billing period mismatch causing missing invoice generation',
    description:
      'Invoice generation failed to produce invoices when the configured billing period logic did not correctly align with service period boundaries. The misalignment caused the invoice generation process to skip affected billing cycles entirely rather than flagging a validation error.',
    impact:
      'If shipped: affected billing cycles would have produced no invoices — causing delayed financial processing and missing revenue records for the healthcare provider.',
    context: 'Detected through multi-scenario billing validation · validated across multiple billing configurations',
    project: 'WebEVV',
    platform: 'Healthcare SaaS',
  },

  // ─── High ─────────────────────────────────────────────────────────────────
  {
    id: 'bug-03',
    severity: 'high',
    title: 'Patient total units update creates data inconsistency across workflows',
    description:
      'Updating a patient\'s total authorised units did not propagate correctly across related healthcare workflows. The change created inconsistent data states between the authorisation tracking module and dependent reporting and scheduling functions — meaning downstream views showed stale or conflicting unit values.',
    impact:
      'If shipped: authorisation tracking would have shown incorrect unit totals, creating discrepancies in reporting and potentially affecting care delivery decisions based on inaccurate authorisation data.',
    context: 'Identified through end-to-end workflow and data consistency validation',
    project: 'WebEVV',
    platform: 'Healthcare SaaS',
  },
  {
    id: 'bug-04',
    severity: 'high',
    title: 'Authentication bypass — artist account created without OTP verification',
    description:
      'The artist account creation flow allowed registration to complete successfully without the user completing OTP verification. The OTP step was presented in the UI but could be bypassed, resulting in an active, unverified artist account with full platform access.',
    impact:
      'If shipped: unverified accounts could have been created at scale — bypassing the identity verification step intended to protect the platform\'s content integrity and artist account security.',
    context: 'Identified during onboarding authentication validation',
    project: 'Dignify',
    platform: 'Music Streaming',
  },
  {
    id: 'bug-05',
    severity: 'high',
    title: 'Duplicate purchase and incorrect pricing logic in payment flow',
    description:
      'Specific purchase scenarios in the payment flow allowed duplicate transactions to be processed or produced incorrect pricing calculations. The pricing logic did not handle certain edge case conditions correctly, resulting in amounts that did not match the expected purchase value.',
    impact:
      'If shipped: users could have been charged incorrect amounts, or the same transaction processed more than once — creating both revenue integrity and user trust issues.',
    context: 'Detected during payment workflow edge case testing',
    project: 'Dignify',
    platform: 'Music Streaming',
  },

  // ─── Medium ───────────────────────────────────────────────────────────────
  {
    id: 'bug-06',
    severity: 'medium',
    title: 'Favourite artist notifications not delivered to followers',
    description:
      'Users who had followed artists were not receiving the expected notifications for artist activity events. The follow relationship was recorded correctly in the system, but the notification trigger associated with that relationship was not firing — meaning the notification delivery pipeline was not being invoked for the affected events.',
    impact:
      'If shipped: artist-follower notification delivery would have been silently broken — reducing platform engagement and causing artists and users to lose expected communication touchpoints without any visible error.',
    context: 'Identified through notification workflow validation',
    project: 'Dignify',
    platform: 'Music Streaming',
  },
]
