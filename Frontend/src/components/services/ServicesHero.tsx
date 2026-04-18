export default function ServicesHero() {
  return (
    <div className="relative overflow-hidden" style={{ paddingTop: '70px', background: '#0a2e29' }}>
      <img src="/serviceimage.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ objectPosition: 'center center' }}/>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(3,10,9,0.75) 0%, rgba(10,46,41,0.60) 45%, rgba(13,61,54,0.55) 70%, rgba(4,16,14,0.70) 100%)' }}/>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 text-center">
        <h1 className="font-display font-extrabold text-white leading-[1.05] mb-4" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
          Our Construction<br/>Solutions
        </h1>
        <p className="text-white/70 text-lg max-w-xl mx-auto">
          At Paving-plus, we offer expert construction solutions tailored to fit your needs.
        </p>
      </div>

      <div className="relative z-10">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
          <path d="M0 60H1440V15C1100 55 700 55 720 30C500 5 200 5 0 15V60Z" fill="white"/>
        </svg>
      </div>
    </div>
  )
}
