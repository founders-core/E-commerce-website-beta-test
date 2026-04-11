const checkItems = [
  'Licensed, insured, and ISO-certified professionals',
  'Customized Build Solutions',
  'Reliable Timelines',
  'Clean & Organized Job Sites',
]

export default function WhatDrivesUs() {
  return (
    <section className="bg-white px-5 md:px-12 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left — real foundation image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden" style={{ height: '520px' }}>
            <img src="/realfoundation.png" alt="Real Foundation" className="w-full h-full object-cover"/>
          </div>
        </div>

        {/* Right — text */}
        <div>
          <p className="text-xs font-bold tracking-[2.5px] text-gray-400 uppercase mb-4">Real Foundation</p>
          <h2 className="font-display font-extrabold text-[#0d3d36] leading-[1.1] mb-6"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
            What Drives Us
          </h2>
          <div className="flex flex-col gap-5 text-gray-500 text-[15px] leading-[1.9]">
            <p>
              At Paving+, our mission is to bring clarity, reliability, and sustainability to the construction ecosystem. We are driven by the belief that every project should deliver not just structural strength, but long-term environmental and operational value.
            </p>

            <div>
              <h4 className="font-display font-extrabold text-[#0d3d36] text-[17px] mb-4">Key Highlights</h4>
              <div className="flex flex-col gap-3">
                {[
                  'Certified experts in green building standards (IGBC, LEED, GRIHA)',
                  'Tailored consultancy solutions for every project scale',
                  'Reliable execution with streamlined processes and timelines',
                  'Focus on sustainable, efficient, and future-ready infrastructure',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0d3d36] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-gray-600 text-[14px] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p>
              We work closely with developers, builders, and organizations to simplify complex certification processes and implement practical, sustainable solutions. Our approach ensures every project meets modern standards while maintaining efficiency, transparency, and quality from start to finish.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
