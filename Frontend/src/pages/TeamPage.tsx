import { Link } from 'react-router-dom'

const team = [
  {
    name: 'Ranjan Kumar Gupta',
    role: 'Founder',
    photo: '/ranjan.png',
    linkedin: 'https://www.linkedin.com/in/ranjan-kumar-gupta-502830172/',
  },
  {
    name: 'Sheikh Ziaur Rahaman',
    role: 'Co-Founder',
    photo: '/sheikreheman.jpg',
    linkedin: 'https://www.linkedin.com/in/sheikh-ziaur-rahaman/',
  },
]

const values = [
  { icon: '🏗️', title: 'Craftsmanship', desc: 'Every detail matters. We hold every member of our team to the highest standards of quality.' },
  { icon: '🤝', title: 'Integrity', desc: 'Honest timelines, fair pricing, and transparent communication — always.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We build with materials and methods that respect the environment and last generations.' },
  { icon: '💡', title: 'Innovation', desc: 'We continuously adopt smarter construction techniques and modern design practices.' },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative pt-[80px] overflow-hidden" style={{ background: '#0a2e29' }}>
        <img src="/Teams.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ objectPosition: 'center 30%' }}/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(3,10,9,0.7) 0%, rgba(10,46,41,0.55) 50%, rgba(26,92,82,0.65) 100%)' }}/>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 text-center">
          <span className="inline-block bg-white/15 text-white text-xs font-bold tracking-[3px] px-5 py-2 rounded-full mb-6 border border-white/20">OUR TEAM</span>
          <h1 className="font-display font-extrabold text-white leading-[1.05] mb-4" style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
            The People Behind<br/>Every Build
          </h1>
          <p className="text-white/70 text-lg max-w-lg mx-auto">
            Meet the passionate professionals who bring your construction vision to life — with skill, care, and commitment.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60H1440V15C1100 55 700 55 720 30C500 5 200 5 0 15V60Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Team grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-3">Leadership</p>
          <h2 className="font-display font-extrabold text-[#0d3d36]" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Founder & Co-Founder</h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-10 mb-20">
          {team.map((member) => (
            <div key={member.name}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 w-full sm:w-72">
              {/* Photo */}
              <div className="relative h-72 overflow-hidden bg-gray-100">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Info */}
              <div className="p-6 flex flex-col items-center text-center">
                <h3 className="font-display font-extrabold text-[#0d3d36] text-lg mb-1">{member.name}</h3>
                <p className="text-[#b5e42a] text-xs font-bold uppercase tracking-wider mb-4">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#084e96] transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-gray-50 rounded-3xl p-10">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-2">What Drives Us</p>
            <h2 className="font-display font-extrabold text-[#0d3d36] text-3xl">Our Team Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h4 className="font-display font-extrabold text-[#0d3d36] text-base mb-2">{v.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-12 bg-[#0d3d36] rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-extrabold text-white text-2xl mb-1">Want to Join Our Team?</h3>
            <p className="text-white/60 text-sm">We're always looking for passionate construction professionals.</p>
          </div>
          <Link to="/contact">
            <button className="flex-shrink-0 bg-[#b5e42a] text-[#0d3d36] font-extrabold text-xs tracking-widest px-8 py-4 rounded-full hover:bg-[#9dca1a] hover:-translate-y-0.5 transition-all">
              GET IN TOUCH
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
