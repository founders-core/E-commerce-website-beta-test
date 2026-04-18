import { useState, useEffect, useRef } from 'react'

function CountUp({ end, decimals = 0, suffix = '', duration = 2000 }: {
  end: number; decimals?: number; suffix?: string; duration?: number
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * end)
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [started, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  )
}

const projects = [
  {
    id: 1,
    name: 'Arihant Warehousing',
    location: 'Kolkata',
    duration: '5 April – Ongoing',
    sqFt: '15,017',
    beforeImage: '/project1.jpg',
    afterImage: '/project2.JPG',
    sustainability: { co2Saved: '21.8', carbonReduction: '90' },
    waste: { plastic: '24,180', industrial: '5,07,780', recycleMaterial: '5,31,960' },
  },
  {
    id: 2,
    name: 'Ashiana Goods Pvt. Ltd.',
    location: 'Howrah',
    duration: '23 Aug – 25 Aug',
    sqFt: '2,083.22',
    beforeImage: '/project3.webp',
    afterImage: '/project4.JPG',
    sustainability: { co2Saved: '2.7', carbonReduction: '92.7' },
    waste: { plastic: '2,999', industrial: '62,979', recycleMaterial: '65,978' },
  },
  {
    id: 3,
    name: 'Ayansh Welfare Trust',
    location: 'Sodepur',
    duration: '26 Aug – Ongoing',
    sqFt: '9,346.1',
    beforeImage: '/project4.JPG',
    afterImage: '/project1.jpg',
    sustainability: { co2Saved: '11.1', carbonReduction: '90' },
    waste: { plastic: '16,776', industrial: '3,52,296', recycleMaterial: '3,69,072' },
  },
  {
    id: 4,
    name: 'Baas Project Solution Pvt. Ltd.',
    location: 'Howrah',
    duration: '13 May – 30 June',
    sqFt: '4,987',
    beforeImage: '/project2.JPG',
    afterImage: '/project3.webp',
    sustainability: { co2Saved: '3.3', carbonReduction: '90' },
    waste: { plastic: '3,763', industrial: '79,023', recycleMaterial: '82,786' },
  },
  {
    id: 5,
    name: 'Bor Nirman Pvt. Ltd.',
    location: 'Hooghly',
    duration: '8 May – 14 May',
    sqFt: '2,679',
    beforeImage: '/project3.webp',
    afterImage: '/project2.JPG',
    sustainability: { co2Saved: '3.8', carbonReduction: '90' },
    waste: { plastic: '4,150', industrial: '87,150', recycleMaterial: '91,300' },
  },
]

type Project = typeof projects[0]

function SlideFlipCard({ before, after, name, project }: {
  before: string; after: string; name: string; project: Project
}) {
  const [flipped, setFlipped] = useState(false)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (flipped) return
    const t = setInterval(() => setSlide(s => (s + 1) % 2), 2500)
    return () => clearInterval(t)
  }, [flipped])

  return (
    <div
      className="relative w-full rounded-2xl"
      style={{ perspective: '1000px', height: '300px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 cursor-pointer"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front: slideshow */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden select-none" style={{ backfaceVisibility: 'hidden' }}>
          {[before, after].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={i === 0 ? `${name} before` : `${name} after`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: slide === i ? 1 : 0 }}
            />
          ))}
          <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full transition-all duration-500 ${slide === 0 ? 'bg-[#0d3d36]/80 text-white' : 'bg-[#b5e42a]/90 text-[#0d3d36]'}`}>
            {slide === 0 ? 'Before' : 'After'}
          </span>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {[0, 1].map(i => (
              <div key={i} className="h-2 rounded-full transition-all duration-300 bg-white"
                style={{ width: slide === i ? '20px' : '8px', opacity: slide === i ? 1 : 0.45 }} />
            ))}
          </div>
        </div>

        {/* Back: sustainability report */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Header */}
          <div className="bg-[#0d3d36] px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-[#b5e42a] text-[10px] font-bold uppercase tracking-widest">Sustainability</div>
              <div className="text-white text-sm font-black leading-tight">Impact Report</div>
            </div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          {/* 4 stats grid */}
          <div className="bg-[#0a2e29] grid grid-cols-4 divide-x divide-white/10">
            {[
              { value: '50%', label: 'Cement\nEliminated' },
              { value: project.sustainability.co2Saved, label: 'Tons CO₂\nSaved' },
              { value: `${project.sustainability.carbonReduction}%`, label: 'Carbon\nReduction' },
              { value: '30–35%', label: 'Stronger' },
            ].map(({ value, label }) => (
              <div key={label} className="py-3 px-1 text-center">
                <div className="text-[#b5e42a] font-black text-base leading-none">{value}</div>
                <div className="text-white/50 text-[9px] mt-1 leading-tight whitespace-pre-line">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const totalSqFt = projects.reduce((acc, p) => acc + parseFloat(p.sqFt.replace(/,/g, '')), 0)
  const totalCO2 = projects.reduce((acc, p) => acc + parseFloat(p.sustainability.co2Saved), 0)
  const totalPlastic = projects.reduce((acc, p) => acc + parseFloat(p.waste.plastic.replace(/,/g, '')), 0)

  return (
    <div className="min-h-screen bg-[#f5f4ef]">

      {/* Hero */}
      <div className="relative overflow-hidden" style={{ paddingTop: '70px', background: '#0a2e29' }}>
        <img src="/projectpage.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ objectPosition: 'center center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(3,10,9,0.75) 0%, rgba(10,46,41,0.60) 45%, rgba(13,61,54,0.55) 70%, rgba(4,16,14,0.70) 100%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 text-center">
          <h1 className="font-display font-extrabold text-white leading-[1.05] mb-4" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
            Projects &amp; Impact
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Every square foot we pave is a step toward a greener future. Explore our completed and ongoing projects across West Bengal.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: 'Total Area Paved', end: totalSqFt, decimals: 2, suffix: ' sq.ft.' },
              { label: 'CO₂ Saved', end: totalCO2, decimals: 1, suffix: ' Tons' },
              { label: 'Plastic Recycled', end: totalPlastic, decimals: 0, suffix: ' Kg' },
              { label: 'Projects', end: projects.length, decimals: 0, suffix: '+' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-[#b5e42a]">
                  <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} />
                </div>
                <div className="text-xs text-white/60 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
            <path d="M0 60H1440V15C1100 55 700 55 720 30C500 5 200 5 0 15V60Z" fill="#f5f4ef"/>
          </svg>
        </div>
      </div>

      {/* Projects grid */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[#0d3d36] mb-3">Project Completion</h2>
          <p className="text-[#0d3d36]/60 text-sm md:text-base max-w-xl mx-auto">
            Hover over each image to reveal sustainability impact. Watch the before &amp; after slideshow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col">

              <div className="p-4 pb-2">
                <SlideFlipCard
                  before={project.beforeImage}
                  after={project.afterImage}
                  name={project.name}
                  project={project}
                />
              </div>

              <div className="px-5 pt-3 pb-5 grid grid-cols-2 gap-2">
                {[
                  { label: 'Project Name', value: project.name },
                  { label: 'Location', value: project.location },
                  { label: 'Duration', value: project.duration },
                  { label: 'Total Area', value: `${project.sqFt} sq.ft.` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#f5f4ef] rounded-xl px-3 py-2.5 border border-[#0d3d36]/8">
                    <div className="text-[10px] font-bold text-[#0d3d36]/50 uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-sm font-bold text-[#0d3d36] leading-tight">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d3d36] py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Start Your <span className="text-[#b5e42a]">Project?</span>
          </h2>
          <p className="text-white/60 mb-8 text-base">
            Join our growing list of clients building a sustainable future with Paving+ interlocking solutions.
          </p>
          <a href="/contact"
            className="inline-flex items-center gap-2 bg-[#b5e42a] text-[#0d3d36] font-bold px-8 py-4 rounded-full hover:bg-[#9dca1a] hover:scale-105 transition-all duration-200 text-base">
            Get in Touch
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </section>
    </div>
  )
}
