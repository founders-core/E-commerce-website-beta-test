import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'

// Count-up animation hook
function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    let frame: number
    const step = (now: number) => {
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
      else setCount(target)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, active])
  return count
}

function StatItem({ target, suffix, label, divider }: { target: number; suffix: string; label: string; divider: boolean; }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(target, 2200, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); observer.disconnect() }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}
      className={`flex flex-col items-center text-center pt-6 pb-10 sm:pt-5 sm:pb-8 ${divider ? 'sm:border-r sm:border-white/15' : ''}`}>
      <span className="font-display font-extrabold text-white leading-none mb-1.5 tabular-nums"
        style={{ fontSize: 'clamp(26px, 3.5vw, 46px)' }}>
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-white text-sm font-bold max-w-[160px] leading-snug" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}>{label}</span>
    </div>
  )
}

export default function Hero() {
  const { user } = useAuth();
  return (
    <section className="relative flex flex-col" style={{ minHeight: '100vh' }}>

      {/* ── Background: forest photo ── */}
      <div className="absolute inset-0 bg-[#030a09]">
        <img src="/pollution-forest.jpg" alt="" className="w-full h-full object-cover opacity-40" style={{ objectPosition: 'center 30%' }}/>
      </div>
      {/* Dark green gradient overlay for readability */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(160deg, rgba(3,10,9,0.75) 0%, rgba(10,46,41,0.65) 38%, rgba(13,61,54,0.55) 58%, rgba(4,16,14,0.75) 100%)'
      }}/>
      {/* Top fade for navbar readability */}
      <div className="absolute inset-x-0 top-0 h-36 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)'
      }}/>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5"
        style={{ paddingTop: '110px', paddingBottom: '40px' }}>

        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/85 text-xs font-medium tracking-[1.5px] px-5 py-2 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b5e42a]"/>
          Sustainable Construction Materials
        </span>

        {/* Title — 2 lines */}
        <h1 className="font-display text-white font-extrabold leading-[1.06] mb-8 max-w-5xl"
          style={{ fontSize: 'clamp(32px, 4.2vw, 62px)', letterSpacing: '-0.3px' }}>
          Sustainable Infrastructure<br/>Built from Waste Plastic
        </h1>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {!user && (
            <Link to="/login">
              <button className="bg-white text-gray-900 font-semibold text-sm px-7 py-3 rounded-full hover:bg-gray-100 transition-all hover:-translate-y-0.5 active:scale-95 shadow-md">
                Login
              </button>
            </Link>
          )}
          <Link to="/contact">
            <button className="bg-[#b5e42a] text-[#0d3d36] font-bold text-sm px-7 py-3 rounded-full hover:bg-[#9dca1a] transition-all hover:-translate-y-0.5 active:scale-95 shadow-md">
              ENQUIRE NOW
            </button>
          </Link>
          <Link to="/products">
            <button className="bg-transparent text-white font-semibold text-sm px-7 py-3 rounded-full border border-white/50 hover:border-white hover:bg-white/10 transition-all hover:-translate-y-0.5 active:scale-95">
              SEE OUR PRODUCTS →
            </button>
          </Link>
        </div>

        {/* Checkmarks */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {['Reduce plastic waste', 'Lower carbon emissions', 'Durable & cost-effective materials'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-white/75 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats strip with count-up animation ── */}
      <div className="relative z-10 w-full bg-black/15 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3">
          <StatItem target={838}  suffix="+" label="Metrics tons Plastic Waste Recycled"    divider={true}/>
          <StatItem target={4031} suffix="+" label="Metrics tons Industrial Waste Consumed"  divider={true}/>
          <StatItem target={2480} suffix="+" label="Metrics tons Carbon Emissions Prevented" divider={false}/>
        </div>
      </div>

    </section>
  )
}
