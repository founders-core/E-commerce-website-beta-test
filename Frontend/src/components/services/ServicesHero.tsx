export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: '70px' }}>
      <div className="relative" style={{ background: '#0a2e29' }}>
        <img src="/serviceimage.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ objectPosition: 'center center' }}/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(3,10,9,0.75) 0%, rgba(10,46,41,0.60) 45%, rgba(13,61,54,0.55) 70%, rgba(4,16,14,0.70) 100%)' }}/>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center" style={{ paddingTop: '60px', paddingBottom: '110px' }}>
          <h1 className="font-display text-white font-extrabold leading-[1.04]" style={{ fontSize: 'clamp(38px, 6vw, 82px)' }}>
            Our Construction<br/>Solutions
          </h1>
          <p className="text-white/75 text-lg leading-relaxed mx-auto max-w-lg mt-5">
            At Paving-plus, we offer expert construction solutions tailored to fit your needs.
          </p>
        </div>

      </div>
    </section>
  )
}
