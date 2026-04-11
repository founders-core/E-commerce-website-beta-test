const steps = [
  {
    number: '1',
    title: 'Plan & Discover',
    desc: 'We start with a detailed consultation to understand your vision, goals, and budget — followed by a site visit and early planning advice.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#b5e42a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="20" height="24" rx="2"/>
        <line x1="9" y1="10" x2="21" y2="10"/>
        <line x1="9" y1="15" x2="21" y2="15"/>
        <line x1="9" y1="20" x2="16" y2="20"/>
        <circle cx="20" cy="20" r="4" fill="#b5e42a" stroke="none"/>
        <path d="M18 20l1.5 1.5L22 18" stroke="#0d3d36" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

export default function Process() {
  return (
    <section className="bg-gray-50 px-5 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[2.5px] text-gray-400 uppercase mb-3">3-Step Process</p>
          <h2 className="font-display font-extrabold text-[#0d3d36] mb-5"
            style={{ fontSize: 'clamp(30px, 5vw, 62px)' }}>
            Our Process, Made Simple
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-2xl mx-auto">
            We believe great construction starts with great communication. That's why our process is
            built around transparency, trust, and timely execution — so you always know what to expect.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i}
              className="bg-white rounded-2xl p-10 flex flex-col items-center text-center gap-5 shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300">
              {/* Icon circle */}
              <div className="w-16 h-16 rounded-full bg-[#0d3d36] flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <h3 className="font-display font-extrabold text-[#0d3d36] text-lg">
                {step.number}. {step.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
