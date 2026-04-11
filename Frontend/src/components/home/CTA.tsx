import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="px-8 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-10 relative" style={{ background: '#0a2e29' }}>
        <img src="/homeletsbuildyourownhouse.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ objectPosition: 'center center' }}/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(3,10,9,0.75) 0%, rgba(10,46,41,0.60) 45%, rgba(13,61,54,0.55) 70%, rgba(4,16,14,0.70) 100%)' }}/>
        <div className="max-w-xl relative z-10">
          <h2 className="font-display font-extrabold text-white leading-[1.08] mb-4" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            Let's Build Your Dream Home.
          </h2>
          <p className="text-white/75 text-[15px] leading-relaxed">
            Whether it's a new build, a remodel, or just an idea — we're here to help bring it to life. Let's talk and explore how Paving-plus can make it happen.
          </p>
        </div>
        <Link to="/contact" className="relative z-10 flex-shrink-0">
          <button className="bg-[#b5e42a] text-[#0d3d36] font-extrabold text-xs tracking-widest px-10 py-5 rounded-full hover:bg-[#9dca1a] hover:-translate-y-1 hover:shadow-2xl transition-all duration-200">
            ENQUIRE NOW
          </button>
        </Link>
      </div>
    </section>
  )
}
