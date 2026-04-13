import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Construction & Sustainability Consultancy',
    desc: 'We provide end-to-end consultancy solutions for builders, contractors, and infrastructure stakeholders—helping you design, develop, and deliver projects that meet modern sustainability standards. From planning to certification, our expert guidance ensures efficient execution, compliance, and long-term value.',
    benefits: [
      'Tailored strategies for sustainable and high-performance construction.',
      'Guidance for industry-recognized certifications (IGBC, LEED, GRIHA, etc.).',
      'Streamlined documentation, approvals, and compliance processes.',
      'Cost-efficient solutions that improve operational and environmental performance.',
    ],
    illustration: (
      <img src="/serviceprovide.png" alt="Construction & Sustainability Consultancy" className="w-full h-full object-cover"/>
    ),
  },
]

function CheckIcon() {
  return (
    <div className="w-6 h-6 rounded-full bg-[#0d3d36] flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L5 9L10 3" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

export default function ServicesList() {
  return (
    <section id="services" className="bg-white py-6">
      <div className="max-w-6xl mx-auto px-5 md:px-12">
        {services.map((service, i) => (
          <div key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-6 border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

            {/* Image — always left on desktop */}
            <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
              {/* Clip top-right corner to half-circle like in screenshots */}
              <div className="absolute inset-0" style={{
                borderRadius: '0 0 0 0',
                clipPath: 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)',
              }}>
                {service.illustration}
              </div>
              {/* Dark circle clip on top-right (the distinctive rounded corner) */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-white" style={{ zIndex: 2 }}/>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-display font-extrabold text-[#0d3d36] mb-4"
                style={{ fontSize: 'clamp(22px, 3vw, 34px)' }}>
                {service.title}
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                {service.desc}
              </p>
              <h4 className="font-display font-extrabold text-[#0d3d36] text-[17px] mb-4">Key Benefits</h4>
              <div className="flex flex-col gap-3 mb-8">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-gray-600 text-[14px] leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>
              <div>
                <Link to="/contact">
                  <button className="bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-widest px-8 py-4 rounded-full hover:bg-[#9dca1a] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
                    ENQUIRE NOW
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
