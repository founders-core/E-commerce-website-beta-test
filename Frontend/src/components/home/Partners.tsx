import { useRef, useEffect } from 'react'

const logos = [
  { src: '/innovationmission.jpeg', alt: 'Innovation Mission Punjab' },
  { src: '/awadh.jpeg',             alt: 'AWaDH IIT Ropar-TIF' },
  { src: '/greenr.jpeg',            alt: 'GREENR' },
  { src: '/thebuddha.jpeg',         alt: 'The Buddha Institute' },
  { src: '/thub.jpeg',              alt: 'T-Hub' },
  { src: '/villgro.jpeg',           alt: 'Villgro' },
  { src: '/freeflow.jpeg',          alt: 'Freeflow Venture Builders' },
  { src: '/habitat.jpeg',           alt: 'Habitat for Humanity' },
  { src: '/indiasanitationcoalition.jpeg', alt: 'India Sanitation Coalition' },
]

const allLogos = [...logos, ...logos, ...logos]

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let animId: number

    const tick = () => {
      const items = Array.from(track.querySelectorAll<HTMLElement>('[data-logo]'))
      const cRect = container.getBoundingClientRect()
      const cx = cRect.left + cRect.width / 2

      items.forEach(item => {
        const r = item.getBoundingClientRect()
        const ix = r.left + r.width / 2
        const dist = Math.abs(ix - cx)
        const zone = cRect.width * 0.22
        const edge = cRect.width * 0.30

        const t = dist < zone ? 1 - dist / zone : 0
        const scale = 1 + 0.85 * t * t
        const opacity = dist < zone
          ? 1
          : Math.max(0.25, 1 - (dist - zone) / edge)

        item.style.transform = `scale(${scale.toFixed(3)})`
        item.style.opacity = opacity.toFixed(3)
      })

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <section className="border-t border-b border-gray-100 py-10 bg-white overflow-hidden">
      <style>{`
        @keyframes marquee-ltr {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0); }
        }
        .partners-track {
          animation: marquee-ltr 28s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div ref={containerRef} className="relative">
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white 20%, transparent)' }}/>
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white 20%, transparent)' }}/>

        <div ref={trackRef} className="partners-track flex items-center">
          {allLogos.map((l, i) => (
            <div
              key={i}
              data-logo
              className="flex items-center flex-shrink-0 px-10"
              style={{ transformOrigin: 'center', willChange: 'transform, opacity', transition: 'transform 0.12s ease, opacity 0.12s ease' }}
            >
              <img
                src={l.src}
                alt={l.alt}
                className="h-14 w-auto object-contain"
                style={{ maxWidth: '180px' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
