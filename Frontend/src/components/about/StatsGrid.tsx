// 3-column mosaic: dark-green stat | photo | dark-green stat (top row)
// photo | lime commitment card | photo (bottom row)
export default function StatsGrid() {
  return (
    <section className="px-0 pb-0">
      <div className="max-w-full">

        {/* TOP ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* Stat 1 - Projects */}
          <div className="bg-[#0d3d36] px-10 py-14 flex flex-col justify-between min-h-[340px]">
            <p className="text-[#b5e42a] text-xs font-bold tracking-[2.5px] uppercase">Projects</p>
            <div>
              <div className="font-display font-extrabold text-[#b5e42a] leading-none mb-4"
                style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}>
                100+
              </div>
              <p className="text-white/70 text-[15px] leading-relaxed">
                Completed over 100 residential and commercial projects across Central Texas with
                unmatched precision and professionalism.
              </p>
            </div>
          </div>

          {/* Center photo */}
          <div className="relative min-h-[340px] overflow-hidden">
            <img src="/100.png" alt="Projects" className="w-full h-full object-cover absolute inset-0"/>
          </div>

          {/* Stat 2 - Happy Clients */}
          <div className="bg-[#0d3d36] px-10 py-14 flex flex-col justify-between min-h-[340px]">
            <p className="text-[#b5e42a] text-xs font-bold tracking-[2.5px] uppercase">Happy Clients</p>
            <div>
              <div className="font-display font-extrabold text-[#b5e42a] leading-none mb-4"
                style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}>
                80+
              </div>
              <p className="text-white/70 text-[15px] leading-relaxed">
                We've earned the trust of over 80 homeowners and businesses through honest work,
                clear communication, and quality builds.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3">

          {/* Photo — bottom left */}
          <div className="relative min-h-[380px] overflow-hidden">
            <img src="/80.jpg" alt="Happy Clients" className="w-full h-full object-cover absolute inset-0"/>
          </div>

          {/* Lime Commitment card */}
          <div className="bg-[#b5e42a] px-10 py-14 flex flex-col justify-between min-h-[380px]">
            <p className="text-[#0d3d36] text-xs font-bold tracking-[2.5px] uppercase">Commitment</p>
            <div>
              <div className="font-display font-extrabold text-[#0d3d36] leading-none mb-5"
                style={{ fontSize: 'clamp(56px, 8vw, 96px)' }}>
                110%
              </div>
              <p className="text-[#0d3d36]/80 text-[15px] leading-relaxed">
                We go above and beyond — with 110% dedication to your project, your goals, and your
                satisfaction from day one.
              </p>
            </div>
          </div>

          {/* Photo — bottom right */}
          <div className="relative min-h-[380px] overflow-hidden">
            <img src="/110.jpg" alt="Commitment" className="w-full h-full object-cover absolute inset-0"/>
          </div>
        </div>
      </div>
    </section>
  )
}
