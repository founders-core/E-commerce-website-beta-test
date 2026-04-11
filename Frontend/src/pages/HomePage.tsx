import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import About from '../components/home/About'
import Services from '../components/home/Services'
import Projects from '../components/home/Projects'
import CTA from '../components/home/CTA'
import Testimonials from '../components/home/Testimonials'
import Stats from '../components/home/Stats'
import Partners from '../components/home/Partners'
import WhyUs from '../components/home/WhyUs'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <Services />
      <Projects />
      <CTA />
      <Testimonials />
      <Stats />
      <Partners />
      <WhyUs />
    </>
  )
}
