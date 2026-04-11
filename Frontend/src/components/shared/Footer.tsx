import { Link, useLocation } from 'react-router-dom'

const socialIcons = [
  { label: 'Facebook', href: 'https://www.facebook.com/pavingplus/', d: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'Instagram', href: 'https://www.instagram.com/pavingplus/', d: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/pavingplus/posts/?feedView=all', d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z' },
]

const companyLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Team', to: '/team' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]
const supportLinks = [
  { label: 'Blog', to: '/blog' },
  { label: 'Testimonials', to: '/#testimonials' },
]
const contactItems = [
  { label: 'Call Us', value: '+91-8825217361 / +91-9339693397', icon: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/> },
  { label: 'Email', value: 'connect@paving-plus.com', icon: <><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></> },
  { label: 'Address', value: '36F Topsia Road, Offbeat CCU, Landmark Bldg, Room 405, Kolkata-700039', icon: <><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></> },
]

export default function Footer() {
  const { pathname } = useLocation()
  const isActive = (to: string) => pathname === to || (to !== '/' && pathname.startsWith(to))

  return (
    <footer id="contact" className="bg-[#0d3d36] text-white px-5 md:px-12 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center mb-5">
              <img src="/Paving+logo.png" alt="Paving+" className="h-10 w-auto object-contain"/>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-[210px]">
              At Paving-plus, we are dedicated to delivering exceptional construction services that stand the test of time.
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#b5e42a] hover:text-[#0d3d36] transition-all duration-200">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[14px] tracking-wider uppercase mb-5">Company</h4>
            <div className="flex flex-col gap-3.5">
              {companyLinks.map((link) => (
                <Link key={link.label} to={link.to}
                  className={`text-[14px] transition-colors duration-200 ${isActive(link.to) ? 'text-[#b5e42a]' : 'text-white/55 hover:text-[#b5e42a]'}`}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[14px] tracking-wider uppercase mb-5">Support</h4>
            <div className="flex flex-col gap-3.5">
              {supportLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-white/55 text-[14px] hover:text-[#b5e42a] transition-colors duration-200">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[14px] tracking-wider uppercase mb-5">Contact Us</h4>
            <div className="flex flex-col gap-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#b5e42a] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0d3d36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{item.icon}</svg>
                  </div>
                  <div>
                    <div className="text-white font-bold text-[14px]">{item.label}</div>
                    <div className="text-white/55 text-[13px] mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[13px]">© 2026 Paving-plus Construction. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms & Condition'].map((link) => (
              <a key={link} href="#" className="text-white/40 text-[13px] hover:text-[#b5e42a] transition-colors duration-200">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
