const cards = [
  {
    title: 'Our Vision',
    desc: 'We aim to create lasting spaces that strengthen communities and inspire confidence — built with care and purpose.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <circle cx="14" cy="14" r="12"/>
        <circle cx="14" cy="14" r="6"/>
        <circle cx="14" cy="14" r="2" fill="#b5e42a" stroke="none"/>
      </svg>
    ),
  },
  {
    title: 'Our Mission',
    desc: 'We make construction simple and dependable through clear communication, skilled craftsmanship, and client-first service.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16v12H4z"/>
        <path d="M8 6V4l4-2 4 2v2"/>
        <path d="M8 18v6l4-2 4 2v-6"/>
        <line x1="8" y1="10" x2="16" y2="10"/>
        <line x1="8" y1="14" x2="13" y2="14"/>
      </svg>
    ),
  },
  {
    title: 'Our Values',
    desc: "We build with integrity, treat every project like our own, and prioritize quality over shortcuts. We're committed to doing it right.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <path d="M14 4C14 4 6 8 6 15a8 8 0 0016 0c0-7-8-11-8-11z"/>
        <path d="M10 16l3 3 5-5" stroke="#b5e42a" strokeWidth="2"/>
      </svg>
    ),
  },
]

export default function VisionMission() {
  return (
    <section className="bg-gray-50 px-5 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[2.5px] text-gray-400 uppercase mb-3">Impactful</p>
          <h2 className="font-display font-extrabold text-[#0d3d36]"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Vision, Mission & Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={i}
              className="bg-white rounded-2xl p-10 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-6">
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-[#0d3d36] flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <h3 className="font-display font-extrabold text-[#0d3d36] text-xl">{card.title}</h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
