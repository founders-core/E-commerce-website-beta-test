const testimonials = [
  {
    category: 'Residential Construction',
    text: 'It turned our dream home into reality. The attention to detail and craftsmanship were truly outstanding.',
    name: 'Rajesh Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    category: 'Commercial Project',
    text: 'Professional, punctual, and reliable — Paving-plus delivered our office space on time and beyond expectations.',
    name: 'Priya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    category: 'Renovation',
    text: 'From the first consultation to the final handover, Paving-plus made the process smooth and stress-free.',
    name: 'Ananya Patel',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
]

function Stars() {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="#f59e0b">
          <path d="M9 1l2.09 4.26L16 6.27l-3.5 3.41.83 4.82L9 12.18l-4.33 2.32.83-4.82L2 6.27l4.91-.71z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-gray-100 px-5 md:px-10 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[2px] text-gray-400 uppercase mb-3">Testimonials</p>
          <h2
            className="font-display font-extrabold text-[#0d3d36]"
            style={{ fontSize: 'clamp(30px, 4vw, 52px)' }}
          >
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-md hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <Stars />
                <svg width="32" height="28" viewBox="0 0 32 28" opacity="0.12" fill="#0d3d36">
                  <path d="M0 28V16C0 7.16 5.33 2.17 16 1L17.5 4C13.17 5 10.67 7.17 10 10.5H16V28H0ZM16 28V16C16 7.16 21.33 2.17 32 1L33.5 4C29.17 5 26.67 7.17 26 10.5H32V28H16Z" />
                </svg>
              </div>
              <h4 className="font-bold text-[#0d3d36] text-[15px]">{t.category}</h4>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{t.text}</p>
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                />
                <span className="font-bold text-[15px] text-[#0d3d36]">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
