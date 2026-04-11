import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#b5e42a] focus:ring-2 focus:ring-[#b5e42a]/20 transition-all bg-white"
  const labelCls = "block text-xs font-bold text-[#0d3d36] uppercase tracking-wider mb-1.5"

  const contactBlocks = [
    {
      label: 'Call Us',
      lines: ['+91-8825217361', '+91-9339693397'],
      sub: 'Mon–Sat 10am–7pm IST',
      icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>,
    },
    {
      label: 'Email Us',
      lines: ['connect@paving-plus.com', 'info@paving-plus.com'],
      sub: 'We reply within 24 hours',
      icon: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></>,
    },
    {
      label: 'Our Office',
      lines: ['36F Topsia Road, Offbeat CCU,', 'Landmark Building, Room No.405,', 'Kolkata - 700039'],
      sub: 'West Bengal, India',
      icon: <><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></>,
    },
    {
      label: 'WhatsApp',
      lines: ['+91-8825217361'],
      sub: 'Quick project queries',
      icon: <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ paddingTop: '70px', background: '#0a2e29' }}>
        <img src="/contact.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ objectPosition: 'center center' }}/>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(3,10,9,0.75) 0%, rgba(10,46,41,0.60) 45%, rgba(13,61,54,0.55) 70%, rgba(4,16,14,0.70) 100%)' }}/>
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16 text-center">
          <h1 className="font-display font-extrabold text-white leading-[1.05] mb-4" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
            Let's Build Something<br/>Great Together
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">Reach out to us — we respond within 24 hours.</p>
        </div>
        <div className="relative z-10">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full block">
            <path d="M0 60H1440V15C1100 55 700 55 720 30C500 5 200 5 0 15V60Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="mb-2">
              <h2 className="font-display font-extrabold text-[#0d3d36] text-2xl mb-1">Contact Information</h2>
              <p className="text-gray-500 text-sm leading-relaxed">Reach us through any of the channels below.</p>
            </div>

            {contactBlocks.map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-[#0d3d36] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#0d3d36] text-sm mb-1">{item.label}</div>
                  {item.lines.map((line, i) => (
                    <div key={i} className="text-gray-700 text-sm font-medium leading-snug">{line}</div>
                  ))}
                  <div className="text-gray-400 text-xs mt-1">{item.sub}</div>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-3 px-4">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', label: 'Facebook', href: 'https://www.facebook.com/pavingplus/' },
                  { icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z', label: 'Instagram', href: 'https://www.instagram.com/pavingplus/' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-10 h-10 rounded-xl bg-[#0d3d36] flex items-center justify-center text-[#b5e42a] hover:bg-[#b5e42a] hover:text-[#0d3d36] transition-all duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d={s.icon}/></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-[#0d3d36] rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full bg-[#b5e42a] flex items-center justify-center mx-auto mb-5">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0d3d36" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3 className="font-display font-extrabold text-white text-2xl mb-2">Message Sent!</h3>
                <p className="text-white/60 text-sm mb-1">We'll get back to you at</p>
                <p className="text-[#b5e42a] font-bold text-sm mb-6">{form.email || 'your email'}</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}
                  className="bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-widest px-7 py-3 rounded-full hover:bg-[#9dca1a] transition-all">
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h3 className="font-display font-extrabold text-[#0d3d36] text-xl mb-1">Send Us a Message</h3>
                <p className="text-gray-500 text-sm mb-6">Fill in your details and we'll reach out promptly.</p>
                <form onSubmit={e => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handle} required placeholder="Rahul Sharma" className={inputCls}/>
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={handle} required placeholder="rahul@company.com" className={inputCls}/>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Phone Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm font-medium text-gray-600 flex-shrink-0">+91</div>
                        <input name="phone" value={form.phone} onChange={handle} placeholder="88252 17361" className={inputCls}/>
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Service Interested In</label>
                      <select name="service" value={form.service} onChange={handle} className={inputCls}>
                        <option value="">Select…</option>
                        {['Residential Construction','Commercial Buildings','Renovation & Remodeling','Site Inspection','Interior Design','Landscaping'].map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Your Message *</label>
                    <textarea name="message" value={form.message} onChange={handle} required rows={5}
                      placeholder="Tell us about your project, timeline, location, or any questions…"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#b5e42a] focus:ring-2 focus:ring-[#b5e42a]/20 transition-all resize-none"/>
                  </div>
                  <button type="submit" className="w-full bg-[#b5e42a] text-[#0d3d36] font-extrabold text-sm tracking-widest py-4 rounded-xl hover:bg-[#9dca1a] hover:-translate-y-0.5 hover:shadow-lg transition-all">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-14 rounded-3xl overflow-hidden h-96 relative">
          <iframe
            title="Paving-plus Office Location"
            src="https://maps.google.com/maps?q=36F+Topsia+Road+Kolkata+700039&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-3 flex items-center gap-3 z-10">
            <div className="w-9 h-9 rounded-full bg-[#b5e42a] flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d3d36" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#0d3d36] text-sm leading-tight">36F Topsia Road, Offbeat CCU</p>
              <p className="text-gray-400 text-xs">Landmark Building, Room No.405, Kolkata - 700039</p>
            </div>
            <a href="https://maps.google.com/?q=36F+Topsia+Road+Kolkata+700039" target="_blank" rel="noopener noreferrer"
              className="ml-2 text-[#0d3d36] text-xs font-bold hover:text-[#b5e42a] transition-colors whitespace-nowrap underline underline-offset-2">
              Open Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
