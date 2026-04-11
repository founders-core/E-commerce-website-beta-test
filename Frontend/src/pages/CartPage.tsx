import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { cartApi, type Cart } from '../api'

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })

export default function CartPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [promoCode, setPromoCode] = useState('')
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoError, setPromoError] = useState<string | null>(null)
  // tracks which product IDs are mid-request so buttons can show a spinner
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set())

  // ── Fetch cart ──────────────────────────────────────────────────────────────
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await cartApi.get()
      setCart(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load cart')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) fetchCart()
    else setLoading(false)
  }, [user, fetchCart])

  // ── Quantity change ─────────────────────────────────────────────────────────
  const handleQtyChange = async (productID: string, newQty: number) => {
    if (newQty < 0) return
    setBusyIds(s => new Set(s).add(productID))
    try {
      if (newQty === 0) {
        const updated = await cartApi.remove(productID)
        setCart(updated)
      } else {
        const updated = await cartApi.update(productID, newQty)
        setCart(updated)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not update item')
    } finally {
      setBusyIds(s => { const next = new Set(s); next.delete(productID); return next })
    }
  }

  // ── Remove item ─────────────────────────────────────────────────────────────
  const handleRemove = async (productID: string) => {
    setBusyIds(s => new Set(s).add(productID))
    try {
      const updated = await cartApi.remove(productID)
      setCart(updated)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not remove item')
    } finally {
      setBusyIds(s => { const next = new Set(s); next.delete(productID); return next })
    }
  }

  // ── Apply promo ─────────────────────────────────────────────────────────────
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return
    setPromoLoading(true)
    setPromoError(null)
    try {
      const updated = await cartApi.applyDiscount(promoCode.trim())
      setCart(updated)
    } catch (err: unknown) {
      setPromoError(err instanceof Error ? err.message : 'Invalid promo code')
    } finally {
      setPromoLoading(false)
    }
  }

  // ── Derived totals ─────────────────────────────────────────────────────────
  // Backend cart totalPrice is after discount; total shown matches order placement (no tax line item)
  const subtotal = cart?.items.reduce((s, i) => s + i.price * i.quantity, 0) ?? 0
  const discountedBase = cart?.totalPrice ?? subtotal
  const discountSaved = subtotal - discountedBase
  const grandTotal = discountedBase

  // ── Not logged in ───────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[80px] flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-[#0d3d36]/10 flex items-center justify-center mx-auto mb-5">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0d3d36" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h2 className="font-display font-extrabold text-[#0d3d36] text-2xl mb-2">Sign in to view cart</h2>
          <p className="text-gray-500 text-sm mb-6">Please log in or register to access your cart and place orders.</p>
          <Link to="/login"><button className="bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-widest px-8 py-4 rounded-full hover:bg-[#9dca1a] transition-all">LOGIN / REGISTER</button></Link>
        </div>
      </div>
    )
  }

  // ── Loading ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[80px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#b5e42a] border-t-transparent rounded-full animate-spin"/>
          <p className="text-gray-500 text-sm font-medium">Loading your cart…</p>
        </div>
      </div>
    )
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[80px] flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <button onClick={fetchCart} className="bg-[#b5e42a] text-[#0d3d36] font-bold px-6 py-3 rounded-xl text-sm">Retry</button>
        </div>
      </div>
    )
  }

  const items = cart?.items ?? []

  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      {/* Header */}
      <div className="bg-[#0d3d36] px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Link to="/" className="hover:text-[#b5e42a]">Home</Link><span>/</span><span className="text-white">Cart</span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl">Your Project Cart</h1>
              <p className="text-white/60 mt-1">Welcome, {user.userName} · {items.length} item{items.length !== 1 ? 's' : ''}</p>
            </div>
            {items.length > 0 && (
              <button onClick={() => navigate('/orders')} className="flex items-center gap-2 bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-widest px-6 py-3 rounded-full hover:bg-[#9dca1a] transition-all">
                PROCEED TO ORDER →
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ── Items ─────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                </svg>
              </div>
              <p className="text-gray-400 font-semibold mb-4">Your cart is empty</p>
              <Link to="/products"><button className="bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-widest px-6 py-3 rounded-xl hover:bg-[#9dca1a] transition-all">BROWSE PRODUCTS</button></Link>
            </div>
          ) : (
            items.map(item => {
              const pid = item.productID._id
              const busy = busyIds.has(pid)
              return (
                <div key={pid} className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4 ${busy ? 'opacity-60' : ''}`}>
                  {/* Product image / icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#0d3d36] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.productID.productImage
                      ? <img src={item.productID.productImage} alt={item.productID.productName} className="w-full h-full object-cover"/>
                      : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <h3 className="font-display font-bold text-[#0d3d36]">{item.productID.productName}</h3>
                      <button onClick={() => handleRemove(pid)} disabled={busy} className="text-gray-300 hover:text-red-400 transition-colors disabled:cursor-not-allowed">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                      {/* Qty control */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                        <button onClick={() => handleQtyChange(pid, item.quantity - 1)} disabled={busy}
                          className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0d3d36] font-bold hover:bg-[#b5e42a] transition-colors disabled:opacity-50">−</button>
                        <span className="text-sm font-bold text-[#0d3d36] w-6 text-center">{item.quantity}</span>
                        <button onClick={() => handleQtyChange(pid, item.quantity + 1)} disabled={busy}
                          className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0d3d36] font-bold hover:bg-[#b5e42a] transition-colors disabled:opacity-50">+</button>
                      </div>
                      <div className="text-right">
                        <div className="font-display font-extrabold text-[#0d3d36] text-lg">{fmt(item.price * item.quantity)}</div>
                        {item.quantity > 1 && <div className="text-xs text-gray-400">{fmt(item.price)} each</div>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}

          {/* Promo */}
          {items.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h4 className="font-bold text-[#0d3d36] text-sm mb-3">Promo Code</h4>
              <div className="flex gap-3">
                <input
                  value={promoCode} onChange={e => setPromoCode(e.target.value)}
                  placeholder="Enter discount code"
                  disabled={!!cart?.discount}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b5e42a] transition-all disabled:bg-gray-50"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={promoLoading || !!cart?.discount || !promoCode.trim()}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60 ${
                    cart?.discount ? 'bg-green-100 text-green-700' : 'bg-[#0d3d36] text-white hover:bg-[#0a2e29]'
                  }`}
                >
                  {promoLoading ? '…' : cart?.discount ? '✓ Applied' : 'Apply'}
                </button>
              </div>
              {cart?.discount && (
                <p className="text-green-600 text-xs mt-2 font-medium">
                  Code <strong>{cart.discount.discountCode}</strong> applied!
                  {cart.discount.discountPercentage ? ` ${cart.discount.discountPercentage}% off` : ''}
                </p>
              )}
              {promoError && <p className="text-red-500 text-xs mt-2 font-medium">{promoError}</p>}
            </div>
          )}
        </div>

        {/* ── Summary ──────────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm self-start sticky top-28">
            <h3 className="font-display font-extrabold text-[#0d3d36] text-lg mb-5">Order Summary</h3>
            <div className="flex flex-col gap-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-semibold">{fmt(subtotal)}</span></div>
              {discountSaved > 0 && (
                <div className="flex justify-between text-green-600"><span>Discount</span><span>−{fmt(discountSaved)}</span></div>
              )}
              <div className="h-px bg-gray-100 my-1"/>
              <div className="flex justify-between text-[#0d3d36]">
                <span className="font-extrabold font-display">Total</span>
                <span className="font-extrabold font-display text-xl">{fmt(grandTotal)}</span>
              </div>
            </div>
            <button onClick={() => navigate('/orders')} className="w-full bg-[#b5e42a] text-[#0d3d36] font-extrabold text-xs tracking-widest py-4 rounded-xl hover:bg-[#9dca1a] hover:-translate-y-0.5 transition-all mb-3">
              PROCEED TO ORDER
            </button>
            <Link to="/products"><button className="w-full border border-gray-200 text-gray-500 text-xs font-bold tracking-wide py-3 rounded-xl hover:border-[#0d3d36] hover:text-[#0d3d36] transition-all">+ ADD MORE PRODUCTS</button></Link>
            <div className="mt-5 flex flex-col gap-2">
              {['Secure & encrypted checkout', 'Order confirmation emailed', 'Cancel before project start'].map(t => (
                <div key={t} className="flex items-center gap-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span className="text-xs text-gray-500">{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}