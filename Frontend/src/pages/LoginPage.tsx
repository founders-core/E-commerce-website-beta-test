import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, UserRole } from '../context/AuthContext'

const ROLES: UserRole[] = [
  'Real Estate Developer', 'Contractor', 'Government Body',
  'Architect', 'ESG Consultant', 'Individual Buyer',
]
const STATES = [
  'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala',
  'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'West Bengal', 'Other',
]

type Mode = 'login' | 'register'

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login')
  const [showPass, setShowPass] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { login, register } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    userName: '', email: '', password: '', phoneNo: '',
    role: 'Individual Buyer' as UserRole, organisation: '',
    street: '', city: '', state: 'Maharashtra', pincode: '',
    remember: false,
  })

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  // ── Login ──────────────────────────────────────────────────────────────────
  // LoginPage.tsx (updated handleLogin and handleRegister)
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)
  setLoading(true)
  try {
    const user = await login(form.email, form.password)
    console.log("Login successful:", user)
    navigate('/')
  } catch (err: unknown) {
    console.error("Login error:", err)
    setError(err instanceof Error ? err.message : 'Login failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()
  setError(null)

  // Step 1 just advances the wizard — no API call yet
  if (step === 1) {
    // Validate step 1 fields
    if (!form.userName || !form.email || !form.phoneNo || !form.password) {
      setError('Please fill all required fields')
      return
    }
    setStep(2)
    return
  }

  setLoading(true)
  try {
    const user = await register({
      userName: form.userName,
      email: form.email,
      phoneNo: form.phoneNo,
      password: form.password,
      organisation: form.organisation,
      role: form.role,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
    })
    console.log("Registration successful:", user)
    navigate('/')
  } catch (err: unknown) {
    console.error("Registration error:", err)
    setError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
  } finally {
    setLoading(false)
  }
}

  const switchMode = (m: Mode) => {
    setMode(m)
    setStep(1)
    setError(null)
  }

  // ── Shared styles ──────────────────────────────────────────────────────────
  const inputCls =
    'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#b5e42a] focus:ring-2 focus:ring-[#b5e42a]/20 transition-all bg-white'
  const labelCls = 'block text-xs font-bold text-[#0d3d36] uppercase tracking-wider mb-1.5'
  const submitCls =
    'w-full bg-[#b5e42a] text-[#0d3d36] font-extrabold text-sm tracking-widest py-4 rounded-xl hover:bg-[#9dca1a] hover:-translate-y-0.5 hover:shadow-lg transition-all mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none'

  return (
    <div className="min-h-screen flex bg-gray-50" style={{ paddingTop: '70px' }}>
      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: '#0a2e29' }}
      >
        <img
          src="/signin.jpg" alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          style={{ objectPosition: 'center' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(5,15,13,0.75) 0%, rgba(10,46,41,0.65) 50%, rgba(26,92,82,0.75) 100%)' }}
        />
        <Link to="/" className="flex items-center relative z-10">
          <img src="/Paving+logo.png" alt="Paving+" className="h-12 w-auto object-contain brightness-0 invert" />
        </Link>
        <div className="relative z-10">
          <div className="text-[#b5e42a] font-display font-black text-5xl leading-none mb-4">"</div>
          <p className="text-white text-2xl font-display font-bold leading-snug mb-5">
            Building Your Dreams<br />to Reality — Together.
          </p>
          <p className="text-white/60 text-sm leading-relaxed">
            Trusted by 100+ clients across Central Texas.<br />
            Quality construction, reliable timelines, zero compromise.
          </p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[['100+', 'Projects'], ['80+', 'Clients'], ['10 Yr', 'Warranty']].map(([n, l]) => (
            <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-[#b5e42a] font-display font-extrabold text-xl">{n}</div>
              <div className="text-white/60 text-xs mt-0.5">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 py-14 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center mb-8">
            <img src="/Paving+logo.png" alt="Paving+" className="h-10 w-auto object-contain" />
          </Link>

          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-8">
            {(['login', 'register'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-full transition-all capitalize ${
                  mode === m ? 'bg-[#0d3d36] text-white shadow-md' : 'text-gray-500 hover:text-[#0d3d36]'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin}>
              <h2 className="font-display font-extrabold text-[#0d3d36] text-3xl mb-1">Welcome back</h2>
              <p className="text-gray-500 text-sm mb-7">Sign in to your Paving-plus account</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input
                    name="email" type="email" value={form.email} onChange={handle}
                    required placeholder="you@example.com" className={inputCls}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className={labelCls} style={{ marginBottom: 0 }}>Password</label>
                    <a href="#" className="text-xs text-[#b5e42a] font-semibold hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <input
                      name="password" type={showPass ? 'text' : 'password'} value={form.password}
                      onChange={handle} required placeholder="••••••••" className={inputCls + ' pr-11'}
                    />
                    <EyeToggle show={showPass} onToggle={() => setShowPass(!showPass)} />
                  </div>
                </div>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox" name="remember" checked={form.remember as boolean}
                    onChange={handle} className="w-4 h-4 accent-[#b5e42a] rounded"
                  />
                  <span className="text-sm text-gray-500">Remember me for 30 days</span>
                </label>
                <button type="submit" disabled={loading} className={submitCls}>
                  {loading ? 'SIGNING IN…' : 'SIGN IN'}
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{' '}
                <button type="button" onClick={() => switchMode('register')} className="text-[#b5e42a] font-bold hover:underline">
                  Register
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === 'register' && (
            <form onSubmit={handleRegister}>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {[1, 2].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step >= s ? 'bg-[#b5e42a] text-[#0d3d36]' : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 2 && <div className={`w-16 h-0.5 ${step > 1 ? 'bg-[#b5e42a]' : 'bg-gray-200'}`} />}
                  </div>
                ))}
                <span className="ml-2 text-xs text-gray-500 font-medium">
                  {step === 1 ? 'Personal Info' : 'Address & Role'}
                </span>
              </div>

              <h2 className="font-display font-extrabold text-[#0d3d36] text-3xl mb-1">
                {step === 1 ? 'Create account' : 'Almost done!'}
              </h2>
              <p className="text-gray-500 text-sm mb-7">
                {step === 1 ? 'Join Paving-plus and start building' : 'Your address & professional details'}
              </p>

              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelCls}>Full Name *</label>
                    <input name="userName" value={form.userName} onChange={handle} required placeholder="Rahul Sharma" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} required placeholder="rahul@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Phone Number *</label>
                    <div className="flex gap-2">
                      <div className="flex items-center px-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm font-medium text-gray-600">
                        +91
                      </div>
                      <input name="phoneNo" value={form.phoneNo} onChange={handle} required placeholder="98765 43210" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Organisation (optional)</label>
                    <input name="organisation" value={form.organisation} onChange={handle} placeholder="Your Company Pvt. Ltd." className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Password *</label>
                    <div className="relative">
                      <input
                        name="password" type={showPass ? 'text' : 'password'} value={form.password}
                        onChange={handle} required placeholder="Min. 8 characters" className={inputCls + ' pr-11'}
                      />
                      <EyeToggle show={showPass} onToggle={() => setShowPass(!showPass)} />
                    </div>
                  </div>
                  <button type="submit" className={submitCls}>NEXT →</button>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className={labelCls}>Your Role *</label>
                    <select name="role" value={form.role} onChange={handle} className={inputCls}>
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Street Address *</label>
                    <input name="street" value={form.street} onChange={handle} required placeholder="123, MG Road" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>City *</label>
                      <input name="city" value={form.city} onChange={handle} required placeholder="Mumbai" className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Pincode *</label>
                      <input name="pincode" value={form.pincode} onChange={handle} required placeholder="400001" className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>State *</label>
                    <select name="state" value={form.state} onChange={handle} className={inputCls}>
                      {STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <button
                      type="button" onClick={() => { setStep(1); setError(null) }}
                      className="flex-1 border border-gray-200 text-gray-500 font-bold text-xs tracking-wide py-3.5 rounded-xl hover:border-[#0d3d36] hover:text-[#0d3d36] transition-all"
                    >
                      ← BACK
                    </button>
                    <button type="submit" disabled={loading} className={submitCls + ' flex-1'}>
                      {loading ? 'CREATING…' : 'CREATE ACCOUNT'}
                    </button>
                  </div>
                </div>
              )}

              <p className="text-center text-sm text-gray-500 mt-6">
                Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')} className="text-[#b5e42a] font-bold hover:underline">
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Eye toggle button (extracted to avoid repetition) ─────────────────────────
function EyeToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button
      type="button" onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0d3d36]"
    >
      {show ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  )
}