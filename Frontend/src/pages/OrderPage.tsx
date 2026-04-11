import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { orderApi, type Order, type OrderItem } from '../api'

type Step = 'details' | 'review' | 'confirmed'

const indianStates = [
  'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala',
  'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'West Bengal', 'Other',
]

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })

const statusColors = { confirmed: '#16a34a', pending: '#d97706', cancelled: '#dc2626' }
const getOrderItemName = (item: OrderItem) => item.productID?.productName ?? 'Removed product'
const getOrderItemKey = (item: OrderItem, index: number) => item.productID?._id ?? `missing-product-${index}`

export default function OrderPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('details')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)

  const [customer, setCustomer] = useState({
    firstName: user?.userName?.split(' ')[0] ?? '',
    lastName: user?.userName?.split(' ').slice(1).join(' ') ?? '',
    email: user?.email ?? '',
    phone: user?.phoneNo ?? '',
    address: user?.address?.[0]?.street ?? '',
    city: user?.address?.[0]?.city ?? '',
    state: user?.address?.[0]?.state || 'Maharashtra',
    pincode: user?.address?.[0]?.pincode ?? '',
  })

  const handleC = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setCustomer(f => ({ ...f, [e.target.name]: e.target.value }))

  const fullAddress = [customer.address, customer.city, customer.state, customer.pincode]
    .filter(Boolean).join(', ')

  // ── Place order ─────────────────────────────────────────────────────────────
  const handleConfirmOrder = async () => {
    if (!fullAddress.trim()) { setError('Please fill in your delivery address'); return }
    setLoading(true)
    setError(null)
    try {
      const order = await orderApi.place(fullAddress)
      setPlacedOrder(order)
      setStep('confirmed')
      console.log("ORder response: ", order)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Invoice download ────────────────────────────────────────────────────────
  const handleDownloadInvoice = () => {
    if (!placedOrder) return
    const orderNo = `BRK-${placedOrder.orderID}`
    const statusColor = statusColors[placedOrder.orderStatus]
    const rowsHtml = placedOrder.orderItems.map((item, i) =>
      `<tr>
        <td>${i + 1}</td>
        <td>${getOrderItemName(item)}</td>
        <td style="text-align:center">${item.quantity}</td>
        <td style="text-align:right">${fmt(item.orderprice)}</td>
        <td style="text-align:right">${fmt(item.orderprice * item.quantity)}</td>
      </tr>`
    ).join('')

    const invoiceHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Invoice ${orderNo}</title>
<style>
  body{font-family:Arial,sans-serif;padding:40px;color:#1a1a1a;max-width:800px;margin:auto}
  .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;border-bottom:3px solid #b5e42a;padding-bottom:20px}
  .logo-text{font-size:22px;font-weight:900;color:#0d3d36}
  .invoice-meta{text-align:right}
  .invoice-meta h2{font-size:22px;color:#0d3d36;margin:0 0 4px}
  .invoice-meta p{margin:2px 0;font-size:13px;color:#555}
  .status-badge{display:inline-block;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#fff;background:${statusColor};margin-top:6px}
  .section{margin-bottom:24px}
  .section h3{font-size:13px;text-transform:uppercase;letter-spacing:1.5px;color:#0d3d36;border-left:4px solid #b5e42a;padding-left:10px;margin-bottom:12px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .field label{display:block;font-size:11px;text-transform:uppercase;color:#888;letter-spacing:1px;margin-bottom:2px}
  .field p{font-size:14px;color:#1a1a1a;font-weight:600;margin:0}
  table{width:100%;border-collapse:collapse;margin-bottom:16px}
  th{background:#0d3d36;color:#fff;padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:1px}
  td{padding:10px 12px;border-bottom:1px solid #eee;font-size:13px}
  .summary{text-align:right;border-top:2px solid #0d3d36;padding-top:16px}
  .summary p{margin:4px 0;font-size:13px;color:#555}
  .summary .total{font-size:22px;font-weight:900;color:#0d3d36;margin-top:8px}
  .footer{margin-top:40px;text-align:center;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:16px}
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="logo-text">Paving-plus</div>
    <p style="font-size:12px;color:#888;margin:4px 0 0">36F Topsia Road, Kolkata-700039<br/>connect@paving-plus.com</p>
  </div>
  <div class="invoice-meta">
    <h2>TAX INVOICE</h2>
    <p><strong>#${orderNo}</strong></p>
    <p>Date: ${new Date(placedOrder.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
    <div class="status-badge">${placedOrder.orderStatus}</div>
  </div>
</div>
<div class="section">
  <h3>Bill To</h3>
  <div class="grid">
    <div class="field"><label>Name</label><p>${customer.firstName} ${customer.lastName}</p></div>
    <div class="field"><label>Email</label><p>${customer.email || '—'}</p></div>
    <div class="field"><label>Phone</label><p>${customer.phone || '—'}</p></div>
    <div class="field" style="grid-column:1/-1"><label>Address</label><p>${placedOrder.address || '—'}</p></div>
  </div>
</div>
<div class="section">
  <h3>Order Summary</h3>
  <table>
    <thead><tr><th>#</th><th>Product</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit Price</th><th style="text-align:right">Amount</th></tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <div class="summary">
    <p>Subtotal: <strong>${fmt(placedOrder.subTotal)}</strong></p>
    ${placedOrder.discount ? `<p>Discount (${placedOrder.discount.discountCode}): <strong>−${fmt(placedOrder.subTotal - placedOrder.totalAmount)}</strong></p>` : ''}
    <p class="total">Total: ${fmt(placedOrder.totalAmount)}</p>
  </div>
</div>
<div class="footer">Thank you for choosing Paving-plus. This is a computer-generated invoice.<br/>For queries: connect@paving-plus.com | +91-8825217361</div>
</body>
</html>`

    const blob = new Blob([invoiceHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `invoice-${orderNo}.html`
    document.body.appendChild(a); a.click()
    document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    setOrdersLoading(true)
    setOrdersError(null)
    orderApi.myOrders()
      .then(setOrders)
      .catch(err => setOrdersError(err instanceof Error ? err.message : 'Failed to load orders'))
      .finally(() => setOrdersLoading(false))
  }, [user])

  const steps = [
    { key: 'details', label: 'Your Details', icon: '👤' },
    { key: 'review', label: 'Review', icon: '📋' },
    { key: 'confirmed', label: 'Confirmed', icon: '✅' },
  ]
  const stepIndex = steps.findIndex(s => s.key === step)

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#b5e42a] focus:ring-2 focus:ring-[#b5e42a]/20 transition-all bg-white"
  const labelCls = "block text-xs font-bold text-[#0d3d36] uppercase tracking-wider mb-1.5"

  // ── Guard: must be logged in ────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-[80px] flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <h2 className="font-display font-extrabold text-[#0d3d36] text-2xl mb-2">Sign in to place an order</h2>
          <p className="text-gray-500 text-sm mb-6">Please log in or register to continue.</p>
          <Link to="/login"><button className="bg-[#b5e42a] text-[#0d3d36] font-bold text-xs tracking-widest px-8 py-4 rounded-full hover:bg-[#9dca1a] transition-all">LOGIN / REGISTER</button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      {/* --- My Orders Section --- */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
        <h2 className="font-display font-extrabold text-[#0d3d36] text-2xl mb-4">My Orders</h2>
        {ordersLoading && <div className="text-gray-500">Loading orders...</div>}
        {ordersError && <div className="text-red-500">{ordersError}</div>}
        {!ordersLoading && !ordersError && orders.length === 0 && (
          <div className="text-gray-400">You have not placed any orders yet.</div>
        )}
        {!ordersLoading && !ordersError && orders.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-sm">
              <thead>
                <tr className="bg-[#0d3d36] text-white">
                  <th className="px-4 py-2 text-left">Order #</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: Order) => (
                  <tr key={order._id} className="border-b last:border-none">
                    <td className="px-4 py-2 font-bold">BRK-{order.orderID}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-2 capitalize" style={{ color: statusColors[order.orderStatus as keyof typeof statusColors] }}>{order.orderStatus}</td>
                    <td className="px-4 py-2">{fmt(order.totalAmount)}</td>
                    <td className="px-4 py-2">
                      <ul className="list-disc ml-5">
                        {order.orderItems.map((item, index) => (
                          <li key={getOrderItemKey(item, index)}>
                            {getOrderItemName(item)} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="bg-[#0d3d36] px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
            <Link to="/" className="hover:text-[#b5e42a] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-[#b5e42a] transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-white">Order</span>
          </div>
          <h1 className="font-display font-extrabold text-white text-3xl md:text-4xl mb-6">Place Your Order</h1>

          {/* Step indicators */}
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => i < stepIndex && step !== 'confirmed' && setStep(s.key as Step)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    s.key === step ? 'bg-[#b5e42a] text-[#0d3d36]' :
                    i < stepIndex ? 'bg-white/20 text-white cursor-pointer hover:bg-white/30' :
                    'bg-white/10 text-white/40 cursor-not-allowed'
                  }`}>
                  <span>{s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${i < stepIndex ? 'bg-[#b5e42a]' : 'bg-white/20'}`}/>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-10">

        {/* Error banner */}
        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {/* ── STEP 1: Customer Details ── */}
        {step === 'details' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 px-8 py-5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0d3d36] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="2" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <h2 className="font-display font-extrabold text-[#0d3d36] text-lg">Delivery Details</h2>
                <p className="text-gray-500 text-xs">Confirm where we should deliver your order</p>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-bold text-[#0d3d36] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-0.5 bg-[#b5e42a] inline-block"/>Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div><label className={labelCls}>First Name</label><input name="firstName" value={customer.firstName} onChange={handleC} placeholder="Rahul" className={inputCls}/></div>
                <div><label className={labelCls}>Last Name</label><input name="lastName" value={customer.lastName} onChange={handleC} placeholder="Sharma" className={inputCls}/></div>
                <div><label className={labelCls}>Email Address</label><input name="email" type="email" value={customer.email} onChange={handleC} placeholder="rahul@company.com" className={inputCls}/></div>
                <div><label className={labelCls}>Phone Number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm font-medium text-gray-600 flex-shrink-0">+91</div>
                    <input name="phone" value={customer.phone} onChange={handleC} placeholder="98765 43210" className={inputCls}/>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-[#0d3d36] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-5 h-0.5 bg-[#b5e42a] inline-block"/>Delivery Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2"><label className={labelCls}>Street Address *</label><input name="address" value={customer.address} onChange={handleC} required placeholder="123, MG Road" className={inputCls}/></div>
                <div><label className={labelCls}>City *</label><input name="city" value={customer.city} onChange={handleC} required placeholder="Mumbai" className={inputCls}/></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>State</label>
                    <select name="state" value={customer.state} onChange={handleC} className={inputCls}>
                      {indianStates.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div><label className={labelCls}>Pincode</label><input name="pincode" value={customer.pincode} onChange={handleC} placeholder="400001" className={inputCls}/></div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => {
                    if (!customer.address || !customer.city) { setError('Street and city are required'); return }
                    setError(null); setStep('review')
                  }}
                  className="flex items-center gap-2 bg-[#b5e42a] text-[#0d3d36] font-extrabold text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-[#9dca1a] hover:-translate-y-0.5 transition-all">
                  REVIEW ORDER
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Review ── */}
        {step === 'review' && (
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 flex items-center justify-between">
                <h2 className="font-display font-bold text-[#0d3d36]">Customer Details</h2>
                <button onClick={() => setStep('details')} className="text-xs text-[#b5e42a] font-bold hover:underline">Edit</button>
              </div>
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {[
                  { label: 'Full Name', value: `${customer.firstName} ${customer.lastName}`.trim() || '—' },
                  { label: 'Email', value: customer.email || '—' },
                  { label: 'Phone', value: customer.phone || '—' },
                  { label: 'Delivery Address', value: fullAddress || '—' },
                ].map(f => (
                  <div key={f.label}>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{f.label}</div>
                    <div className="text-sm text-[#0d3d36] font-semibold">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#b5e42a]/10 border border-[#b5e42a]/30 rounded-2xl p-5 flex gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d3d36" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm text-[#0d3d36] leading-relaxed">
                By placing this order, you agree to Paving-plus's <a href="#" className="font-bold underline">Terms of Service</a> and <a href="#" className="font-bold underline">Privacy Policy</a>. A representative will contact you within 24 hours to confirm your project details.
              </p>
            </div>

            <div className="flex justify-between">
              <button onClick={() => setStep('details')}
                className="flex items-center gap-2 border border-gray-200 text-gray-500 font-bold text-xs tracking-wide px-6 py-3 rounded-xl hover:border-[#0d3d36] hover:text-[#0d3d36] transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                BACK
              </button>
              <button
                onClick={handleConfirmOrder}
                disabled={loading}
                className="flex items-center gap-2 bg-[#0d3d36] text-white font-extrabold text-xs tracking-widest px-10 py-4 rounded-xl hover:bg-[#0a2e29] hover:-translate-y-0.5 hover:shadow-xl transition-all disabled:opacity-60 disabled:translate-y-0">
                {loading ? 'PLACING ORDER…' : 'CONFIRM ORDER'}
                {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 11l3 3L22 4"/></svg>}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirmed ── */}
        {step === 'confirmed' && placedOrder && (
          <div className="text-center py-10">
            <div className="w-28 h-28 rounded-full bg-[#b5e42a] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#b5e42a]/40">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#0d3d36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="font-display font-extrabold text-[#0d3d36] text-4xl mb-3">Order Confirmed!</h2>
            <p className="text-gray-500 text-lg mb-2">Thank you, <strong>{customer.firstName || 'valued client'}</strong>!</p>
            <p className="text-gray-400 text-sm mb-4 max-w-md mx-auto">
              Your order <strong className="text-[#0d3d36]">#{`BRK-${placedOrder.orderID}`}</strong> has been received.
              A project coordinator will reach you at <strong>{customer.email}</strong> within 24 hours.
            </p>
            <p className="text-[#0d3d36] font-extrabold font-display text-2xl mb-10">
              Total: {fmt(placedOrder.totalAmount)}
            </p>

            <div className="bg-white rounded-2xl shadow-sm p-8 max-w-lg mx-auto text-left mb-8">
              <h3 className="font-display font-bold text-[#0d3d36] mb-4 text-center">What happens next?</h3>
              {[
                { icon: '📞', step: 'Consultation Call', desc: 'Our team contacts you within 24 hours' },
                { icon: '📐', step: 'Site Assessment', desc: 'We schedule a free site visit and survey' },
                { icon: '📄', step: 'Custom Proposal', desc: 'Receive a detailed quote within 3 business days' },
                { icon: '🏗️', step: 'Project Kickoff', desc: 'Sign off and we break ground on your timeline' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 mb-4 last:mb-0">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-bold text-[#0d3d36] text-sm">{item.step}</div>
                    <div className="text-gray-500 text-xs">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={handleDownloadInvoice}
                className="flex items-center gap-2 bg-[#0d3d36] text-white font-extrabold text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-[#0a2e29] hover:-translate-y-0.5 hover:shadow-xl transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                DOWNLOAD INVOICE
              </button>
              <Link to="/"><button className="bg-[#b5e42a] text-[#0d3d36] font-extrabold text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-[#9dca1a] transition-all">BACK TO HOME</button></Link>
              <Link to="/services"><button className="border border-gray-200 text-gray-500 font-bold text-xs tracking-wide px-8 py-4 rounded-xl hover:border-[#0d3d36] hover:text-[#0d3d36] transition-all">VIEW MORE PRODUCTS</button></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


