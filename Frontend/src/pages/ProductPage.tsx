// ProductPage.tsx - Updated version
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { cartApi } from '../api'
import { fetchProducts, fetchCategories, type FrontendProduct } from '../components/services/productService'

const PaverIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="9" height="9" rx="1" /><rect x="13" y="2" width="9" height="9" rx="1" />
    <rect x="2" y="13" width="9" height="9" rx="1" /><rect x="13" y="13" width="9" height="9" rx="1" />
  </svg>
)
const BrickIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="5" rx="1" /><rect x="2" y="11" width="8" height="5" rx="1" />
    <rect x="12" y="11" width="10" height="5" rx="1" /><rect x="2" y="18" width="20" height="4" rx="1" />
  </svg>
)
const KerbIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="8" width="20" height="10" rx="2" /><path d="M6 8V5" /><path d="M12 8V4" /><path d="M18 8V5" />
  </svg>
)
const TileIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b5e42a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
)

const getIcon = (category: string) => {
  if (category.includes('Kerb')) return <KerbIcon />
  if (category.includes('Tile')) return <TileIcon />
  if (category.includes('Brick')) return <BrickIcon />
  return <PaverIcon />
}

// Category list for filter
const STATIC_CATEGORIES = [
  'Paver Blocks',
  'Kerb Stones', 
  'Tiles',
  'Cement',
  'Plasters',
  'Admixtures',
  'Bitumen Roads'
] as const

export default function ProductPage() {
  const { user } = useAuth()
  
  const [products, setProducts] = useState<FrontendProduct[]>([])
  const [categories, setCategories] = useState<string[]>(['All'])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // per-product state for cart
  const [productStates, setProductStates] = useState<Record<string, 'idle' | 'adding' | 'added' | 'error'>>({})
  
  // Filters
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 100000 })
  const [searchQuery, setSearchQuery] = useState('')
  
  // ── Fetch data from backend ───────────────────────────────────────────────
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      try {
        // Fetch categories
        const apiCategories = await fetchCategories()
        const allCategories = ['All', ...STATIC_CATEGORIES, ...apiCategories.filter(c => !STATIC_CATEGORIES.includes(c as any))]
        setCategories(allCategories)
        
        // Fetch products
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts)
      } catch (err) {
        console.error('Failed to load products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])
  
  // Apply filters
  const filteredProducts = products.filter(product => {
    // Category filter
    if (activeCategory !== 'All' && product.category !== activeCategory) return false
    
    // Price filter
    if (product.price < priceRange.min || product.price > priceRange.max) return false
    
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    
    return true
  })
  
  // ── Add to cart ───────────────────────────────────────────────────────────
  const handleAdd = async (product: FrontendProduct) => {
    if (productStates[product.id] === 'adding' || productStates[product.id] === 'added') return
    
    setProductStates(s => ({ ...s, [product.id]: 'adding' }))
    try {
      await cartApi.add(product.backendId, 1)
      setProductStates(s => ({ ...s, [product.id]: 'added' }))
      // Reset after 2 seconds
      setTimeout(() => {
        setProductStates(s => ({ ...s, [product.id]: 'idle' }))
      }, 2000)
    } catch (err: unknown) {
      console.error('Failed to add to cart:', err)
      setProductStates(s => ({ ...s, [product.id]: 'error' }))
      setTimeout(() => {
        setProductStates(s => ({ ...s, [product.id]: 'idle' }))
      }, 3000)
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[80px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b5e42a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#0d3d36] font-semibold">Loading products...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-[80px]">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#b5e42a] text-[#0d3d36] px-6 py-2 rounded-lg font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      {/* Hero section (keep as is) */}
      <div className="px-6 md:px-12 py-14 relative overflow-hidden" style={{ background: '#0a2e29' }}>
        {/* ... hero content (same as before) ... */}
        <img src="/productimage.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(3,10,9,0.75) 0%, rgba(10,46,41,0.60) 45%, rgba(13,61,54,0.55) 70%, rgba(4,16,14,0.70) 100%)' }}/>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block bg-white/15 text-white text-xs font-bold tracking-[2px] px-5 py-2 rounded-full mb-4 border border-white/20">
                SUSTAINABLE CONSTRUCTION MATERIALS
              </span>
              <h1 className="font-display font-extrabold text-white text-3xl md:text-5xl leading-tight mb-3">Our Products</h1>
              <p className="text-white/65 text-sm md:text-base max-w-xl leading-relaxed">
                High-quality construction materials engineered for durability and built with sustainability at the core.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap md:flex-nowrap md:flex-col md:items-end">
              {[
                [`${products.length}+`, 'Products'], 
                ['100%', 'Quality'], 
                ['ISO', 'Certified']
              ].map(([n, l]) => (
                <div key={l} className="bg-white/10 rounded-xl px-5 py-3 text-center min-w-[80px]">
                  <div className="text-[#b5e42a] font-display font-extrabold text-xl">{n}</div>
                  <div className="text-white/60 text-xs mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and filter bar */}
      <div className="sticky top-[80px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4">
          {/* Search input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#b5e42a]"
            />
          </div>
          
          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                  activeCategory === cat ? 'bg-[#0d3d36] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-400 flex-shrink-0 pl-4">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
      
      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const state = productStates[product.id] ?? 'idle'
            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group">
                {/* Product image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {product.tag && (
                    <span className={`absolute top-3 right-3 z-10 text-[10px] font-bold px-2.5 py-1 rounded-full ${product.tagColor}`}>
                      {product.tag}
                    </span>
                  )}
                  <img 
                    src={product.image || '/product-placeholder.jpg'} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/product-placeholder.jpg'
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="text-xs font-bold text-[#b5e42a] uppercase tracking-wider">{product.category}</div>
                  </div>
                </div>
                
                {/* Product details */}
                <div className="px-6 py-4 flex-1 flex flex-col">
                  <h3 className="font-display font-extrabold text-[#0d3d36] text-base leading-snug mb-2">{product.name}</h3>
                  <div className="text-[#b5e42a] font-bold text-lg mb-2">
                    ₹{product.price.toLocaleString()}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-xs text-gray-500">({product.rating})</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {product.specs.slice(0, 4).map(spec => (
                      <div key={spec} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#b5e42a] flex-shrink-0"/>
                        <span className="text-[11px] text-gray-500 font-medium truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer with add to cart */}
                <div className="px-6 pb-6 pt-3 border-t border-gray-50">
                  {user ? (
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={state === 'adding' || state === 'added' || product.stockQuantity === 0}
                      className={`w-full flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl transition-all disabled:cursor-default ${
                        product.stockQuantity === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                        state === 'added' ? 'bg-green-100 text-green-700' :
                        state === 'error' ? 'bg-red-100 text-red-600' :
                        state === 'adding' ? 'bg-gray-100 text-gray-500' :
                        'bg-[#b5e42a] text-[#0d3d36] hover:bg-[#9dca1a] hover:-translate-y-0.5'
                      }`}
                    >
                      {product.stockQuantity === 0 ? 'OUT OF STOCK' :
                       state === 'added' ? '✓ ADDED TO CART' :
                       state === 'adding' ? 'ADDING...' :
                       state === 'error' ? 'RETRY' :
                       'ADD TO CART'}
                    </button>
                  ) : (
                    <Link to="/login" className="block">
                      <button className="w-full text-xs font-bold px-4 py-2.5 rounded-xl bg-gray-100 text-gray-500 hover:bg-[#0d3d36] hover:text-white transition-all">
                        LOGIN TO ORDER
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <p className="text-gray-400 font-semibold">No products found matching your criteria.</p>
          </div>
        )}
      </div>
      
      {/* CTA Section (keep as is) */}
      <div className="bg-[#0d3d36] mx-6 md:mx-12 rounded-2xl mb-16 px-8 py-10 max-w-6xl xl:mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="font-display font-extrabold text-white text-2xl md:text-3xl mb-2">Need a custom quote?</h2>
          <p className="text-white/60 text-sm max-w-md">Bulk orders, custom dimensions, and project-specific supply — our team is ready to help.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link to="/contact">
            <button className="bg-[#b5e42a] text-[#0d3d36] font-extrabold text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-[#9dca1a] hover:-translate-y-0.5 transition-all">
              GET A QUOTE
            </button>
          </Link>
          <Link to="/cart">
            <button className="bg-white/10 text-white font-bold text-xs tracking-wide px-8 py-4 rounded-xl hover:bg-white/20 transition-all border border-white/20">
              VIEW CART
            </button>
          </Link>
        </div>
      </div>
      
    </div>
  )
}