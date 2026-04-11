const posts = [
  {
    typeColor: '#FF0000',
    typeBg: '#fff0f0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.3 2.8 12 2.8 12 2.8s-4.3 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.9 12 22 12 22s4.3 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z"/>
      </svg>
    ),
    label: 'YouTube',
    thumb: 'https://img.youtube.com/vi/nzp03MmPM3c/hqdefault.jpg',
    title: 'Plastic Waste to Roads — Paving+ Innovation',
    desc: 'Watch how Paving+ is transforming plastic waste into durable road infrastructure. A breakthrough in sustainable construction that addresses both waste management and road quality.',
    href: 'https://share.google/d6Eg830QbqYaFXKEu',
    cta: 'Watch Video',
  },
  {
    typeColor: '#FF0000',
    typeBg: '#fff0f0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.3 2.8 12 2.8 12 2.8s-4.3 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.9 12 22 12 22s4.3 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z"/>
      </svg>
    ),
    label: 'YouTube Short',
    thumb: 'https://img.youtube.com/vi/D27eCStJcNg/hqdefault.jpg',
    title: 'Road Construction Using Waste Plastic — Short',
    desc: 'A quick look at the process of incorporating waste plastic into road-laying techniques. See firsthand how discarded plastic becomes a high-strength construction material.',
    href: 'https://youtube.com/shorts/D27eCStJcNg?si=6l_EC_Q22R9P3uw5',
    cta: 'Watch Short',
  },
  {
    typeColor: '#FF0000',
    typeBg: '#fff0f0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.3 2.8 12 2.8 12 2.8s-4.3 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.9 12 22 12 22s4.3 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z"/>
      </svg>
    ),
    label: 'YouTube Short',
    thumb: 'https://img.youtube.com/vi/faG1pHvIuS4/hqdefault.jpg',
    title: 'Sustainable Roads with Recycled Plastic',
    desc: "Another short highlighting Paving+'s commitment to eco-friendly infrastructure. This clip showcases the real-world impact of plastic roads on communities and the environment.",
    href: 'https://youtube.com/shorts/faG1pHvIuS4?si=ot29FZfiQ_FfiubS',
    cta: 'Watch Short',
  },
  {
    typeColor: '#FF0000',
    typeBg: '#fff0f0',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.3 2.8 12 2.8 12 2.8s-4.3 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.9 12 22 12 22s4.3 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l6.6 3.6-6.6 3.5z"/>
      </svg>
    ),
    label: 'YouTube',
    thumb: 'https://img.youtube.com/vi/nzp03MmPM3c/hqdefault.jpg',
    title: 'From Waste to Roads — Full Documentary',
    desc: "An in-depth look at Paving+'s waste-to-road technology. This full-length feature covers the science, the social impact, and the journey of building greener roads across India.",
    href: 'https://youtu.be/nzp03MmPM3c?si=tIFYKbNZvwgPdw9U',
    cta: 'Watch Video',
  },
  {
    typeColor: '#0A66C2',
    typeBg: '#f0f6ff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    label: 'LinkedIn',
    thumb: '/realfoundation.png',
    title: 'From Waste to Roads — LinkedIn Feature',
    desc: 'Paving+ featured on LinkedIn for their groundbreaking "From Waste to Roads" initiative. Read how industry leaders and sustainability experts are responding to this innovation.',
    href: 'https://www.linkedin.com/posts/from-waste-to-roads-ugcPost-7448306270165467136-XRaM?utm_source=share&utm_medium=member_ios',
    cta: 'Read on LinkedIn',
  },
  {
    typeColor: '#E1306C',
    typeBg: '#fff0f5',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
    label: 'Instagram Reel',
    thumb: '/retrofit.png',
    title: 'Paving+ on Instagram — Waste Plastic Roads',
    desc: "Catch Paving+'s viral Instagram reel showcasing the process of turning waste plastic into roads. A powerful visual story that has inspired thousands across India.",
    href: 'https://www.instagram.com/reel/C-PYE1ESjvd/?igsh=MWtlanp0YnYybDdzMw==',
    cta: 'Watch Reel',
  },
  {
    typeColor: '#1877F2',
    typeBg: '#f0f5ff',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
    label: 'Facebook',
    thumb: '/greencommercialinfrastructure.jpg',
    title: 'Paving+ Featured on Facebook',
    desc: "Our plastic road initiative gained widespread attention on Facebook. See the community reactions and conversations sparked by Paving+'s sustainable road-building solutions.",
    href: 'https://share.google/CFY1x22iy4uSB1lcR',
    cta: 'View Post',
  },
  {
    typeColor: '#0d3d36',
    typeBg: '#f5fce8',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d3d36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
      </svg>
    ),
    label: 'News',
    thumb: '/serviceprovide.png',
    title: "Murshidabad Gets India's First Plastic Waste Road",
    desc: "News18 Bengali reports on Murshidabad's historic plastic road — the first of its kind in the district. Built using waste plastic, this road promises durability and a cleaner environment for years to come.",
    href: 'https://bengali.news18.com/news/south-bengal/murshidabad-plastic-road-first-time-in-murshidabad-road-made-with-waste-plastic-this-road-will-last-for-many-years-l18-local18-2471951.html',
    cta: 'Read Article',
  },
]

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative px-5 md:px-12 pt-36 pb-20 overflow-hidden">
        <img src="/blog.jpg" alt="Blog" className="absolute inset-0 w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-[#0d3d36]/80"/>
        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-[2.5px] text-[#b5e42a] uppercase mb-4">Media & Blog</p>
          <h1
            className="font-display font-extrabold text-white leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Stories of Impact &<br />Innovation
          </h1>
          <p className="text-white/70 text-[16px] leading-relaxed max-w-2xl">
            Explore Paving+'s journey through news coverage, social media features, and documentary content — showcasing how we're turning waste into roads and building a sustainable future.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-gray-50 px-5 md:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <a href={post.href} target="_blank" rel="noopener noreferrer" className="relative block h-48 overflow-hidden group">
                  <img
                    src={post.thumb}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Play button overlay for video posts */}
                  {(post.label === 'YouTube' || post.label === 'YouTube Short') && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center shadow-xl">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Platform badge on image */}
                  <div
                    className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm"
                    style={{ backgroundColor: post.typeBg + 'ee', color: post.typeColor }}
                  >
                    {post.icon}
                    {post.label}
                  </div>
                </a>

                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-display font-extrabold text-[#0d3d36] text-[16px] leading-snug mb-2.5">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-[13px] leading-relaxed flex-1 mb-5">
                    {post.desc}
                  </p>

                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0d3d36] hover:text-[#b5e42a] transition-colors tracking-wide"
                  >
                    {post.cta}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M17 7H7M17 7v10"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
