const projectImages = [
  { src: '/project1.jpg',  alt: 'Project 1' },
  { src: '/project2.JPG',  alt: 'Project 2' },
  { src: '/project3.webp', alt: 'Project 3' },
  { src: '/project4.JPG',  alt: 'Project 4' },
]

export default function Projects() {
  return (
    <section id="projects" className="px-5 md:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 mb-12">
          <div>
            <p className="text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-3">Our Projects</p>
            <h2
              className="font-display font-extrabold text-dark-green leading-[1.08]"
              style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
            >
              Built to Last.
              <br />
              Designed to Inspire.
            </h2>
          </div>
          <div className="flex flex-col gap-5 md:max-w-sm">
            <p className="text-gray-500 text-[15px] leading-relaxed">
              From high-end homes to modern office spaces, each Paving-plus project is a reflection of
              quality, detail, and dedication.
            </p>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 self-start bg-[#0d3d36] text-white font-bold px-6 py-3 rounded-full hover:bg-[#0a2e29] hover:scale-105 transition-all duration-200 text-sm"
            >
              View All Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {projectImages.map((project, i) => (
            <div
              key={i}
              className={`rounded-2xl overflow-hidden relative cursor-pointer hover:scale-[0.98] transition-transform duration-300 ${i < 2 ? 'h-72' : 'h-60'}`}
            >
              <img src={project.src} alt={project.alt} className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
