'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { labScenarios } from '@/content/lab'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { StepperNav } from '@/components/ui/StepperNav'
import { StepPanel } from '@/components/ui/StepPanel'
import { cn } from '@/lib/utils'

/**
 * QA Thinking Lab.
 *
 * Two-level navigation:
 *  1. Scenario tabs — Billing Verification / RBAC Testing / Authentication
 *     Testing. Switching scenarios resets the active step to 0.
 *  2. Step indicator — 5 steps per scenario (Understanding -> Risk ->
 *     Test design -> Execution -> Outcome), navigable via dots or
 *     Previous/Next buttons.
 *
 * This demonstrates investigation methodology rather than just listing
 * skills — the explicit goal from the content package. Mobile-first:
 * scenario tabs wrap to multiple rows on narrow screens rather than
 * requiring horizontal scroll; the step content reflows to single-column
 * reading at all breakpoints.
 */
export function QAThinkingLab() {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const activeScenario = labScenarios[activeScenarioIndex]
  const totalSteps = activeScenario.steps.length

  const handleScenarioChange = (index: number) => {
    setActiveScenarioIndex(index)
    setActiveStep(0) // reset to step 1 when switching scenarios
  }

  const handleStepChange = (step: number) => {
    // Clamp within valid range — StepperNav already disables out-of-range
    // buttons, but this guards against any other future entry point.
    if (step >= 0 && step < totalSteps) {
      setActiveStep(step)
    }
  }

  return (
    <section
      id="lab"
      className="section-padding bg-base"
      aria-label="QA Thinking Lab"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow="QA Thinking Lab"
          title="How I actually investigate a testing scenario"
          description="Three real scenarios from my work — walked through step by step. This is the thinking behind the test cases, not just a list of testing types."
        />

        {/* Scenario tabs */}
        <ScrollReveal>
          <div
            className="flex flex-wrap gap-2 mb-8"
            role="tablist"
            aria-label="Select a QA scenario"
          >
            {labScenarios.map((scenario, index) => {
              const isActive = index === activeScenarioIndex
              return (
                <button
                  key={scenario.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleScenarioChange(index)}
                  className={cn(
                    'relative h-10 px-4 rounded-lg text-sm font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive
                      ? 'text-accent bg-accent-surface border border-accent-muted'
                      : 'text-ink-secondary border border-border-subtle hover:border-border-default hover:text-ink-primary'
                  )}
                >
                  {scenario.domain}
                </button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Active scenario card */}
        <motion.div
          key={activeScenario.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="card-base rounded-2xl p-5 sm:p-8"
        >
          {/* Scenario header */}
          <div className="mb-6 pb-6 border-b border-border-subtle">
            <h3 className="text-lg sm:text-xl font-semibold text-ink-primary mb-3 tracking-tight">
              {activeScenario.title}
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {activeScenario.context}
            </p>
          </div>

          {/* Step content */}
          <div className="min-h-[220px] sm:min-h-[180px]">
            <StepPanel
              step={activeScenario.steps[activeStep]}
              stepNumber={activeStep + 1}
              totalSteps={totalSteps}
            />
          </div>

          {/* Step navigation */}
          <StepperNav
            totalSteps={totalSteps}
            activeStep={activeStep}
            onStepChange={handleStepChange}
            stepLabels={activeScenario.steps.map((s) => s.title)}
          />
        </motion.div>

        {/* Scenario index hint */}
        <p className="text-xs text-ink-tertiary mt-6 text-center sm:text-left">
          Scenario {activeScenarioIndex + 1} of {labScenarios.length} · Step{' '}
          {activeStep + 1} of {totalSteps}
        </p>
      </div>
    </section>
  )
}
