import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Sustainable Residential Solutions',
    desc: 'We deliver eco-conscious residential solutions that combine smart design, energy efficiency, and long-term sustainability. From planning to certification, we help homeowners and developers create future-ready living spaces with improved performance and reduced environmental impact.',
    image: '/sustainableresidentialsolutions.png',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0d3d36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6L6 20V42H18V30H30V42H42V20L24 6Z"/>
        <path d="M20 42V32Q24 27 28 32V42"/><path d="M24 18C24 18 18 22 18 27C18 30 21 32 24 32C27 32 30 30 30 27C30 22 24 18 24 18Z"/>
      </svg>
    ),
  },
  {
    title: 'Green Commercial Infrastructure',
    desc: 'Our consultancy supports businesses in developing sustainable, scalable commercial spaces. We guide projects through green building certifications, ensuring compliance, cost efficiency, and enhanced operational performance for modern enterprises.',
    image: '/greencommercialinfrastructure.jpg',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0d3d36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="12" width="40" height="32" rx="1"/>
        <rect x="10" y="18" width="8" height="8"/><rect x="22" y="18" width="8" height="8"/><rect x="34" y="18" width="6" height="8"/>
        <rect x="10" y="30" width="8" height="6"/><rect x="22" y="30" width="8" height="6"/>
        <path d="M24 6L44 12H4L24 6Z"/>
      </svg>
    ),
  },
  {
    title: 'Retrofit & Sustainability Upgrades',
    desc: 'Upgrade your existing infrastructure with sustainable retrofitting solutions. We help optimize energy usage, improve building performance, and achieve certifications through efficient upgrades and smart resource management.',
    image: '/retrofit.png',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#0d3d36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 40H40"/><path d="M12 40V24H20V40"/><path d="M28 40V16H36V40"/>
        <path d="M6 24C6 24 12 10 24 14C36 18 42 8 42 8"/>
        <circle cx="42" cy="8" r="3"/>
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-gray-100 px-5 md:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-3">What We Do</p>
          <h2 className="font-display font-extrabold text-[#0d3d36] leading-tight" style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}>
            Our Full-Spectrum<br/>Construction Services
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {services.map((s, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="h-52 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover"/>
              </div>
              <div className="p-8 flex flex-col items-center text-center flex-1">
                <div className="mb-4">{s.icon}</div>
                <h3 className="font-display font-extrabold text-[#0d3d36] text-xl mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <Link to="/services" className="text-xs font-bold text-[#0d3d36] underline underline-offset-4 tracking-wide hover:text-[#b5e42a] transition-colors">
                  ENQUIRE NOW
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
