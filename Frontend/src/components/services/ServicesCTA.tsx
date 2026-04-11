import { Link } from 'react-router-dom'

export default function ServicesCTA() {
  return (
    <section className="bg-[#0d3d36] px-5 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#b5e42a] rounded-3xl px-8 md:px-14 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[#0d3d36]/65 text-xs font-bold tracking-[2px] uppercase mb-4">Ready to Start Your Project?</p>
            <h2 className="font-display font-extrabold text-[#0d3d36] leading-[1.1]" style={{ fontSize: 'clamp(26px, 4vw, 48px)' }}>
              From Idea to Reality,<br/>Let's Begin
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="text-[#0d3d36]/70 text-[15px] leading-relaxed">
              Your home should be more than a place to live — it should reflect your lifestyle, your values, and your dreams.
            </p>
            <div>
              <Link to="/#contact">
                <button className="bg-[#0d3d36] text-white font-bold text-xs tracking-widest px-10 py-4 rounded-full hover:bg-[#0a2420] hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200">
                  LET'S TALK
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
