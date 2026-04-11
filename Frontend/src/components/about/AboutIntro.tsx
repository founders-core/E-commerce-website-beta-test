export default function AboutIntro() {
  return (
    <section className="px-5 md:px-12 py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-0">
          <div>
            <h2 className="font-display font-extrabold text-[#0d3d36] leading-[1.1]"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              Building Sustainable Futures. Trusted Across India.
            </h2>
          </div>
          <div className="flex items-center h-full">
            <div className="text-gray-500 text-[16px] leading-[1.85] flex flex-col gap-5">
              <p>
                At Paving+, we believe construction goes beyond structures — it's about creating sustainable, efficient, and future-ready infrastructure. We partner with builders, developers, and organizations to deliver expert consultancy that simplifies complex processes and drives meaningful impact.
              </p>
              <p>
                With a strong focus on green building practices and industry-recognized certifications like IGBC, LEED, and GRIHA, we help our clients enhance project value, ensure compliance, and achieve long-term operational excellence. Backed by expertise and a commitment to innovation, Paving+ empowers projects to meet modern environmental standards while maintaining quality, precision, and performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
