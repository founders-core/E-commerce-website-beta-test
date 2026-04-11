import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about', dropdown: [
    { label: 'Our Story', to: '/about' },
    { label: 'Our Team', to: '/team' },
  ]},
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
]

// Pages whose hero already has a dark background (navbar can start transparent)
const DARK_HERO_PAGES = ['/', '/about', '/services', '/contact', '/team', '/products']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  // scrolled = user has scrolled past 40px
  const [scrolled, setScrolled] = useState(false)
  // visible = navbar is shown (hides when scrolling down, shows on scroll up / at top)
  const [visible, setVisible] = useState(true)

  const lastScrollY = useRef(0)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, cartCount, logout } = useAuth()
  const dropRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const hasDarkHero = DARK_HERO_PAGES.includes(pathname)

  // Handle scroll: track direction + position
  useEffect(() => {
    const THRESHOLD = 40
    const handleScroll = () => {
      const currentY = window.scrollY
      const isAtTop = currentY < THRESHOLD
      const isScrollingDown = currentY > lastScrollY.current

      setScrolled(currentY > THRESHOLD)

      if (isAtTop) {
        // Always show at top
        setVisible(true)
      } else if (isScrollingDown && currentY > lastScrollY.current + 5) {
        // Scrolling DOWN → hide navbar
        setVisible(false)
        setAboutOpen(false)
        setProfileOpen(false)
      } else if (!isScrollingDown && lastScrollY.current > currentY + 5) {
        // Scrolling UP → show navbar
        setVisible(true)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Init
    lastScrollY.current = window.scrollY
    setScrolled(window.scrollY > 40)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // On route change: reset state
  useEffect(() => {
    setMenuOpen(false)
    setAboutOpen(false)
    setProfileOpen(false)
    setVisible(true)
    lastScrollY.current = 0
    setScrolled(false)
  }, [pathname])

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setAboutOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  // Background: transparent at top on dark-hero pages, always dark green otherwise
  const navBg = (!hasDarkHero || scrolled)
    ? 'bg-[#0d3d36] shadow-lg'
    : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent'

  // Translate: slide up when hidden, slide down when visible
  const navTransform = visible ? 'translate-y-0' : '-translate-y-full'
  const userName = user?.userName?.trim() || 'User'
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[80px] transition-all duration-300 ${navBg} ${navTransform}`}>

      {/* Logo */}
      <Link to="/" className="flex items-center flex-shrink-0">
        <img src="/Paving+logo.png" alt="Paving+" className="h-[62px] w-auto object-contain" style={{ imageRendering: 'auto', maxWidth: '200px' }}/>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-7">
        {navLinks.map((link) => (
          link.dropdown ? (
            <div key={link.label} className="relative" ref={dropRef}>
              <button
                onClick={() => setAboutOpen(o => !o)}
                className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 hover:text-[#b5e42a] ${
                  isActive(link.to) ? 'text-[#b5e42a]' : 'text-white'
                }`}>
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-3 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {link.dropdown.map(item => (
                    <Link key={item.label} to={item.to}
                      className="block px-4 py-3 text-sm font-medium text-[#0d3d36] hover:bg-[#b5e42a]/15 transition-colors border-b border-gray-50 last:border-0">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link key={link.label} to={link.to}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-[#b5e42a] ${
                isActive(link.to) ? 'text-[#b5e42a]' : 'text-white'
              }`}>
              {link.label}
            </Link>
          )
        ))}

        {/* Cart — only when logged in */}
        {user && (
          <Link to="/cart" className="relative text-white hover:text-[#b5e42a] transition-colors duration-200">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#b5e42a] text-[#0d3d36] text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        )}

        {/* Auth */}
        {user ? (
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(o => !o)}
              className="flex items-center gap-2 bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-wide px-4 py-2.5 rounded-full hover:bg-[#9dca1a] transition-all">
              <div className="w-6 h-6 rounded-full bg-[#0d3d36] flex items-center justify-center text-[#b5e42a] text-xs font-bold flex-shrink-0">
                {userInitial}
              </div>
              <span className="max-w-[80px] truncate">{userName}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className={`transition-transform flex-shrink-0 ${profileOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {profileOpen && (
              <div className="absolute top-full right-0 mt-3 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                <div className="px-4 py-3 bg-[#0d3d36]/5 border-b border-gray-100">
                  <div className="font-bold text-[#0d3d36] text-sm truncate">{userName}</div>
                  <div className="text-xs text-gray-500 truncate">{user.email || '-'}</div>
                  <div className="text-xs text-[#b5e42a] font-semibold mt-0.5">{user.role || 'Individual Buyer'}</div>
                </div>
                <Link to="/orders" onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#0d3d36] hover:bg-gray-50 transition-colors border-b border-gray-50">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  My Orders
                </Link>
                <Link to="/cart" onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-[#0d3d36] hover:bg-gray-50 transition-colors border-b border-gray-50">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                  </svg>
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-[#b5e42a] text-[#0d3d36] text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button onClick={() => { logout(); navigate('/'); setProfileOpen(false) }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          !user && (
            <Link to="/login">
              <button className="flex items-center gap-2 bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-wide px-6 py-3 rounded-full hover:bg-[#9dca1a] hover:scale-105 transition-all duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                LOGIN
              </button>
            </Link>
          )
        )}
      </div>

      {/* Mobile right side */}
      <div className="md:hidden flex items-center gap-3">
        {user && (
          <Link to="/cart" className="relative text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#b5e42a] text-[#0d3d36] text-[8px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        )}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl leading-none w-8 h-8 flex items-center justify-center">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-[70px] left-0 right-0 bg-[#0d3d36] border-t border-white/10 px-6 py-5 flex flex-col gap-1 shadow-2xl max-h-[80vh] overflow-y-auto">
          {navLinks.map(link => (
            <div key={link.label}>
              <Link to={link.to} onClick={() => setMenuOpen(false)}
                className={`block font-semibold text-base py-3 border-b border-white/10 transition-colors ${
                  isActive(link.to) ? 'text-[#b5e42a]' : 'text-white hover:text-[#b5e42a]'
                }`}>
                {link.label}
              </Link>
              {link.dropdown?.map(sub => (
                <Link key={sub.label} to={sub.to} onClick={() => setMenuOpen(false)}
                  className="block text-sm text-white/60 py-2.5 pl-4 border-b border-white/5 hover:text-[#b5e42a] transition-colors">
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}

          {user ? (
            <>
              <div className="py-4 mt-1 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#b5e42a] flex items-center justify-center text-[#0d3d36] font-bold">
                    {userInitial}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{userName}</div>
                    <div className="text-white/50 text-xs">{user.role || 'Individual Buyer'}</div>
                  </div>
                </div>
              </div>
              <Link to="/orders" onClick={() => setMenuOpen(false)}
                className="text-white/70 text-sm py-3 hover:text-[#b5e42a] transition-colors border-b border-white/5">
                My Orders
              </Link>
              <button onClick={() => { logout(); navigate('/'); setMenuOpen(false) }}
                className="text-left text-red-400 font-bold text-sm py-3 hover:text-red-300 transition-colors">
                Sign Out
              </button>
            </>
          ) : (
            !user && (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="mt-3 w-full flex items-center justify-center gap-2 bg-[#b5e42a] text-[#0d3d36] font-bold text-sm py-3.5 rounded-full hover:bg-[#9dca1a] transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  LOGIN
                </button>
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  )
}
