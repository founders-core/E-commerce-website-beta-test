const highlights = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="#0d3d36">
        <rect x="8" y="4" width="20" height="24" rx="2" fill="none" stroke="#0d3d36" strokeWidth="2"/>
        <path d="M12 10h12M12 15h12M12 20h8" stroke="#0d3d36" strokeWidth="2" strokeLinecap="round"/>
        <rect x="13" y="26" width="10" height="4" rx="1"/>
        <rect x="15" y="30" width="6" height="2" rx="1"/>
      </svg>
    ),
    title: 'Granted Patent',
    desc: 'Secured a patent for our groundbreaking technology, underscoring our commitment to innovation and advancement in the field.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4 8C4 6.9 4.9 6 6 6h10v24H6C4.9 30 4 29.1 4 28V8Z" fill="#0d3d36" opacity="0.85"/>
        <path d="M32 8C32 6.9 31.1 6 30 6H20v24h10c1.1 0 2-.9 2-2V8Z" fill="#0d3d36"/>
      </svg>
    ),
    title: 'Published 12 Research Papers',
    desc: 'Featured in leading international journals, demonstrating our dedication to advancing knowledge and research in sustainable materials.',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="#0d3d36">
        <polygon points="18,4 21.5,13.5 32,13.5 23,19.5 26.5,29 18,23 9.5,29 13,19.5 4,13.5 14.5,13.5"/>
      </svg>
    ),
    title: '2+ Published Patents',
    desc: 'Paving+ has published patents on technology, underscoring our commitment to innovation and advancement in the field.',
  },
]

const awards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,4 18.5,11.5 26,11.5 20,16 22.5,23.5 16,19 9.5,23.5 12,16 6,11.5 13.5,11.5" fill="#b5e42a"/>
      </svg>
    ),
    title: 'Realty NXT (Proptech Demo Day)',
    desc: 'One of the top most promising Indian Startup.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="13" r="9" stroke="#b5e42a" strokeWidth="2.2" fill="none"/>
        <path d="M10 20l-3 8h18l-3-8" stroke="#b5e42a" strokeWidth="2" fill="none"/>
        <path d="M12 28l4-4 4 4" stroke="#b5e42a" strokeWidth="2" fill="none"/>
      </svg>
    ),
    title: 'ASEAN India Scale Hub 2024',
    desc: 'ICT industry excellence award for Sustainability vendor of the year by GATES.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="13" r="9" stroke="#b5e42a" strokeWidth="2.2" fill="none"/>
        <path d="M10 20l-3 8h18l-3-8" stroke="#b5e42a" strokeWidth="2" fill="none"/>
        <path d="M12 28l4-4 4 4" stroke="#b5e42a" strokeWidth="2" fill="none"/>
      </svg>
    ),
    title: 'ASEAN India Scale Hub 2024',
    desc: 'Winner at 60 sec smart pitch, organised by Gates.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="13" r="9" stroke="#b5e42a" strokeWidth="2.2" fill="none"/>
        <path d="M10 20l-3 8h18l-3-8" stroke="#b5e42a" strokeWidth="2" fill="none"/>
        <path d="M12 28l4-4 4 4" stroke="#b5e42a" strokeWidth="2" fill="none"/>
      </svg>
    ),
    title: 'Naveen Soch ki Khoj Award 2023',
    desc: 'Winner of Emerging Startup, awarded by Sunmarg Business Awards.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,4 18.5,11.5 26,11.5 20,16 22.5,23.5 16,19 9.5,23.5 12,16 6,11.5 13.5,11.5" fill="#b5e42a"/>
      </svg>
    ),
    title: 'TIECON Kolkata 2020',
    desc: 'Runners up at "The Hot Pitch by Tie Con Kolkata, 2020".',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <polygon points="16,4 18.5,11.5 26,11.5 20,16 22.5,23.5 16,19 9.5,23.5 12,16 6,11.5 13.5,11.5" fill="#b5e42a"/>
      </svg>
    ),
    title: 'TATA Social Enterprise Challenge 2020',
    desc: 'Winner at "Hack The Group".',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M8 26V14l8-8 8 8v12H20v-7h-8v7H8Z" stroke="#b5e42a" strokeWidth="2.2" fill="none"/>
      </svg>
    ),
    title: 'Entrepreneurship World Cup India 2019',
    desc: 'Awarded for Excellent Entrepreneurship Skill in the Regional event.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C10 4 6 9 6 14c0 6 10 16 10 16s10-10 10-16c0-5-4-10-10-10Z" stroke="#b5e42a" strokeWidth="2.2" fill="none"/>
        <circle cx="16" cy="14" r="3" fill="#b5e42a"/>
      </svg>
    ),
    title: 'HULT PRIZE 2019',
    desc: 'Awarded for being in the top 6 Promising Startups.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="16" width="20" height="12" rx="2" stroke="#b5e42a" strokeWidth="2.2" fill="none"/>
        <path d="M11 16V11a5 5 0 0 1 10 0v5" stroke="#b5e42a" strokeWidth="2.2" fill="none"/>
        <circle cx="16" cy="22" r="2" fill="#b5e42a"/>
      </svg>
    ),
    title: 'AAVISHKAR 2.0 2018',
    desc: 'Recognized for technological excellence in one of the top tech fests, organized by National Institute of Technology Durgapur.',
  },
]

export default function Awards() {
  return (
    <section className="bg-[#f5f7f2] px-5 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-16">
          <div>
            <p className="text-xs font-bold tracking-[2.5px] text-gray-400 uppercase mb-4">Recognition</p>
            <h2
              className="font-display font-extrabold text-[#0d3d36] leading-[1.1]"
              style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
            >
              Celebrating Excellence<br />And Innovation
            </h2>
          </div>
          <div className="flex items-center h-full">
            <p className="text-gray-500 text-[15px] leading-[1.85]">
              At Paving+, we take pride in our journey of innovation and excellence, marked by a series of prestigious awards and recognitions. Our achievements reflect our commitment to pushing boundaries, driving sustainability, and leading with purpose.
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlights.map((h, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-[#0d3d36]/8 flex items-center justify-center mx-auto mb-5">
                {h.icon}
              </div>
              <h3 className="font-display font-extrabold text-[#0d3d36] text-[17px] mb-3">{h.title}</h3>
              <p className="text-gray-500 text-[13.5px] leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-bold tracking-[2px] text-gray-400 uppercase">Awards & Recognitions</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {awards.map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#b5e42a]/40"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0d3d36] flex items-center justify-center flex-shrink-0">
                {a.icon}
              </div>
              <div>
                <h4 className="font-display font-extrabold text-[#0d3d36] text-[14px] leading-snug mb-1.5">{a.title}</h4>
                <p className="text-gray-500 text-[12.5px] leading-relaxed">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
