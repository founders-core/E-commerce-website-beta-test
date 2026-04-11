const features = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <circle cx="13" cy="13" r="11" />
        <path d="M8 13l4 4 6-7" />
      </svg>
    ),
    title: 'Local Knowledge',
    desc: "Deep understanding of Austin's codes, climate, and construction standards.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <circle cx="13" cy="9" r="5" />
        <path d="M7 22c0-4 2-6 6-6s6 2 6 6" />
        <path d="M18 11.5c1.5.5 3 1.8 3 3.5" />
      </svg>
    ),
    title: 'Pro Team',
    desc: 'Skilled, certified builders and project managers committed to quality.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="8" width="20" height="14" rx="2" />
        <path d="M8 8V6a5 5 0 0110 0v2" />
        <circle cx="13" cy="15" r="2" />
      </svg>
    ),
    title: 'Smart Designs',
    desc: 'Modern layouts and features built for comfort, function, and flow.',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
        <path d="M13 2L3 7v6c0 6 4.5 10.5 10 12 5.5-1.5 10-6 10-12V7L13 2z" />
        <path d="M9 13l3 3 5-5" />
      </svg>
    ),
    title: 'Client Focus',
    desc: 'Responsive service and communication — your satisfaction is our priority.',
  },
]

export default function WhyUs() {
  return (
    <section className="bg-gray-100 px-5 md:px-10 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div className="pt-4">
          <p className="text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-4">Why Paving-plus</p>
          <h2
            className="font-display font-extrabold text-[#0d3d36] leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            What Sets Us
            <br />
            Apart
          </h2>
          <p className="text-gray-500 text-[15px] leading-[1.85]">
            We're more than just builders — we're your trusted local partner. From smart design to
            solid delivery, every detail is handled with care, precision, and pride.
          </p>
        </div>

        {/* Right 2x2 grid */}
        <div className="grid grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#0d3d36] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h4 className="font-bold text-[#0d3d36] text-[16px] mb-2">{f.title}</h4>
              <p className="text-gray-500 text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
