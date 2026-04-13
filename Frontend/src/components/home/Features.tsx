const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'On Time',
    desc: 'We respect your time with planning and predictable project timelines.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M12 13v9" />
        <path d="M8 17l4 4 4-4" />
      </svg>
    ),
    title: 'ISO Certified',
    desc: 'Our ISO certification reflects our commitment to excellence and reliability in every project we undertake.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="4" rx="1" />
        <rect x="4" y="11" width="16" height="4" rx="1" />
        <rect x="6" y="15" width="12" height="4" rx="1" />
      </svg>
    ),
    title: 'Quality Materials',
    desc: 'We use high-grade asphalt, concrete, and sealants designed for long-lasting performance in all weather conditions.',
  },
]

export default function Features() {
  return (
    <section className="px-5 md:px-10 pb-20 -mt-6 relative z-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl px-8 md:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((f, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-full bg-[#0d3d36] flex items-center justify-center flex-shrink-0">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-[#0d3d36] font-display">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
