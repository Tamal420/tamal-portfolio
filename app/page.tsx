import dynamic from 'next/dynamic'
import { Nav } from '@/components/layout/Nav'
import { StickyBar } from '@/components/layout/StickyBar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'

/**
 * Below-fold sections are code-split so the initial JS payload stays
 * closer to Hero + chrome. SSR stays on — HTML still ships for SEO;
 * only the client bundles are deferred into separate chunks.
 */
const ImpactWall = dynamic(() =>
  import('@/components/sections/ImpactWall').then((m) => ({ default: m.ImpactWall }))
)
const Contributions = dynamic(() =>
  import('@/components/sections/Contributions').then((m) => ({ default: m.Contributions }))
)
const Projects = dynamic(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects }))
)
const BugHallOfFame = dynamic(() =>
  import('@/components/sections/BugHallOfFame').then((m) => ({ default: m.BugHallOfFame }))
)
const QAThinkingLab = dynamic(() =>
  import('@/components/sections/QAThinkingLab').then((m) => ({ default: m.QAThinkingLab }))
)
const AutomationJourney = dynamic(() =>
  import('@/components/sections/AutomationJourney').then((m) => ({
    default: m.AutomationJourney,
  }))
)
const Skills = dynamic(() =>
  import('@/components/sections/Skills').then((m) => ({ default: m.Skills }))
)
const About = dynamic(() =>
  import('@/components/sections/About').then((m) => ({ default: m.About }))
)
const Contact = dynamic(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }))
)

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

      <main id="main-content" aria-label="Portfolio content">
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
