export default function Stats() {
  return (
    <section className="px-5 md:px-10 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Text */}
        <div>
          <p className="text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-4">Proven & Trusted</p>
          <h2
            className="font-display font-extrabold text-[#0d3d36] leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
          >
            Driven by Impact,
            <br />
            Built on Trust
          </h2>
          <div className="flex flex-col gap-4 text-gray-500 text-[15px] leading-[1.85] mb-10">
            <p>
              Paving+ has established itself as a trusted partner in sustainable construction consultancy. Whether it's guiding new developments or optimizing existing infrastructure, we ensure every project achieves higher performance, compliance, and long-term value.
            </p>
            <p>
              Our strong client relationships are built on transparency, expertise, and consistent results. From green building certifications to efficient execution strategies, we support every stage of your project with precision and reliability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {[
              { num: '100+', label: 'Successful Projects', sub: 'Delivering certified, sustainable, and high-performance infrastructure solutions across diverse sectors.' },
              { num: '10+ Yrs.', label: 'Industry Expertise', sub: 'Decade-long experience in green building consultancy, certifications, and sustainable project execution.' },
            ].map((s, i) => (
              <div key={i}>
                <div
                  className="font-display font-extrabold text-[#0d3d36] mb-2"
                  style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
                >
                  {s.num}
                </div>
                <div className="h-px bg-gray-200 mb-3" />
                <div className="font-bold text-[14px] text-[#0d3d36] mb-1.5">{s.label}</div>
                <div className="text-[13px] text-gray-500 leading-relaxed">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="h-[480px] rounded-3xl overflow-hidden relative shadow-2xl">
            <img src="/trustedhome.jpg" alt="Trusted Home" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-10 -left-5 bg-[#b5e42a] rounded-2xl px-6 py-4 shadow-xl">
            <div className="font-display font-extrabold text-[#0d3d36] text-base leading-tight">Sustainable</div>
            <div className="font-display font-extrabold text-[#0d3d36] text-base leading-tight">Excellence</div>
          </div>
        </div>
      </div>
    </section>
  )
}
