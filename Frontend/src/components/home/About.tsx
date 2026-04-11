const checkItems = ['150+ Projects', 'Licensed & ISO Certified', 'Experienced Team']

export default function About() {
  return (
    <section id="about" className="px-5 md:px-10 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Images */}
        <div className="relative h-[420px] md:h-[500px]">
          <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-xl">
            <img src="/HomeAbout1.jpeg" alt="About Paving+" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute bottom-0 right-0 w-[55%] h-[55%] rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
            <img src="/HomeAbout2.jpg" alt="Our Mission" className="w-full h-full object-cover"/>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-xs font-bold tracking-[2px] text-gray-400 mb-4 uppercase">About Us</p>
          <h2
            className="font-display font-extrabold text-[#0d3d36] leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Trusted Paving  
            <br />
            Experts You Can
            <br />
            Rely On
          </h2>
          <p className="text-gray-500 text-[15px] leading-[1.85] mb-7">
            At Paving+, we convert low-value waste into durable, carbon-negative construction materials and road solutions.
            Our technology blends circularity with performance, enabling developers, contractors, and governments to build stronger, greener, and more cost-effective infrastructure.
          </p>
          <div className="flex flex-col gap-3.5">
            {checkItems.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#0d3d36] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-semibold text-[15px] text-[#0d3d36]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
