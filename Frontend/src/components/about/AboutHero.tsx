export default function AboutHero() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '70px' }}>
      <div className="relative" style={{ background: '#0a2e29' }}>
        {/* Background photo */}
        <img src="/aboutus.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ objectPosition: 'center' }}/>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,46,41,0.7) 0%, rgba(13,61,54,0.6) 50%, rgba(26,87,82,0.7) 100%)' }}/>
        {/* Window grid - right side */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-10 pointer-events-none">
          <svg viewBox="0 0 600 500" fill="none" className="h-full w-full" preserveAspectRatio="xMaxYMid slice">
            <rect x="60" y="20" width="500" height="480" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            {Array.from({length:9}).map((_,row) =>
              Array.from({length:5}).map((_,col) => (
                <rect key={`${row}-${col}`} x={80+col*88} y={40+row*50}
                  width="64" height="36" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" rx="1"/>
              ))
            )}
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center" style={{ paddingTop: '60px', paddingBottom: '100px' }}>
          <h1 className="font-display text-white font-extrabold leading-[1.04]" style={{ fontSize: 'clamp(38px, 6vw, 80px)' }}>
            Building With Purpose,<br/>Backed by Trust
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mx-auto max-w-lg mt-5">
            At Paving-plus, we don't just build spaces — we build lasting relationships.
          </p>
        </div>

      </div>
    </section>
  )
}
