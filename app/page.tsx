import { Nav } from '@/components/layout/Nav'
import { StickyBar } from '@/components/layout/StickyBar'
import { Footer } from '@/components/layout/Footer'

import { Hero } from '@/components/sections/Hero'
import { ImpactWall } from '@/components/sections/ImpactWall'
import { Contributions } from '@/components/sections/Contributions'
import { Projects } from '@/components/sections/Projects'
import { BugHallOfFame } from '@/components/sections/BugHallOfFame'
import { QAThinkingLab } from '@/components/sections/QAThinkingLab'
import { AutomationJourney } from '@/components/sections/AutomationJourney'
import { Skills } from '@/components/sections/Skills'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

/**
 * Home page — full section assembly.
 *
 * Order is the approved credibility ladder from Step 1's architecture:
 *   Hero        -> who this is, in 5 seconds (photo, name, role, CTAs)
 *   ImpactWall   -> proof before pitch (3 editorial outcome statements)
 *   Contributions -> metrics + all 6 projects at a glance, WebEVV first
 *   Projects     -> full filterable case studies, WebEVV featured/expanded
 *   BugHallOfFame -> the differentiator — real defects found
 *   QAThinkingLab -> investigation methodology, not just a skill list
 *   AutomationJourney -> honest, interview-safe automation positioning
 *   Skills       -> four-tier skill categorisation, ATS-scannable
 *   About        -> the person behind the work (read by people already convinced)
 *   Contact      -> low-friction conversion: email, GitHub, CV download
 *
 * Nav and StickyBar are rendered once at the page level (not per-section)
 * so their fixed/sticky positioning works correctly across the whole
 * scroll length. Footer closes the page after Contact.
 */
export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <Hero />
        <ImpactWall />
        <Contributions />
        <Projects />
        <BugHallOfFame />
        <QAThinkingLab />
        <AutomationJourney />
        <Skills />
        <About />
        <Contact />
      </main>

      <Footer />
      <StickyBar />
    </>
  )
}
