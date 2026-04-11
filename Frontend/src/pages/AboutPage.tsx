import AboutHero from '../components/about/AboutHero'
import AboutIntro from '../components/about/AboutIntro'
import StatsGrid from '../components/about/StatsGrid'
import VisionMission from '../components/about/VisionMission'
import WhatDrivesUs from '../components/about/WhatDrivesUs'
import Awards from '../components/about/Awards'
import AboutCTA from '../components/about/AboutCTA'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <StatsGrid />
      <VisionMission />
      <WhatDrivesUs />
      <Awards />
      <AboutCTA />
    </>
  )
}
