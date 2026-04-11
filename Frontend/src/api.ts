// ─── Central API client ───────────────────────────────────────────────────────
// All fetch calls live here so base URL and error handling are consistent.

const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api/v1'
// Helper to get auth token
function getAuthToken(): string | null {
  try {
    const storedUser = localStorage.getItem('pp_user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      return user.accessToken || null
    }
  } catch (e) {
    console.error('Failed to get auth token', e)
  }
  return null
}

// api.ts - Add retry functionality
async function request<T>(path: string, init: RequestInit = {}, retries = 2): Promise<T> {
  try {
    const token = getAuthToken()
    // FIX: Use a plain object for headers
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      ...(init.headers ?? {}) as { [key: string]: string }
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const res = await fetch(`${BASE}${path}`, {
      credentials: 'include',
      headers,
      ...init,
    })
    const data = await res.json()
    
    if (res.status === 401) {
      localStorage.removeItem('pp_user')
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
      throw new Error(data.message ?? 'Session expired. Please login again.')
    }
    if (!res.ok) throw new Error(data.message ?? `Request failed: ${res.status}`)
    return data.data as T
  } catch (error) {
    if (retries > 0 && error instanceof TypeError && error.message === 'Failed to fetch') {
      console.log(`Retrying request to ${path}, ${retries} attempts left`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return request<T>(path, init, retries - 1)
    }
    throw error
  }
}
// api.ts - Add these types and API functions

// Add these interfaces
export interface Product {
  _id: string
  productID: string
  productName: string
  description: string
  price: number
  stockQuantity: number
  productImage: string
  productRating: number
  category: {
    _id: string
    name: string
  }
  createdBy: string
  createdAt: string
}

// Add product API
export const productApi = {
  getAll: (filters?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) => {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())
    if (filters?.search) params.append('search', filters.search)
    
    const queryString = params.toString()
    return request<Product[]>(`/products${queryString ? `?${queryString}` : ''}`)
  },
  
  getById: (id: string) => request<Product>(`/products/${id}`),
}
// ── Types mirroring backend models ───────────────────────────────────────────

export interface CartItem {
  productID: {
    _id: string
    productName: string
    price: number
    productImage?: string
  }
  quantity: number
  price: number
}

export interface CartDiscount {
  discountCode: string
  discountPercentage?: number
  discountAmount?: number
}

export interface Cart {
  _id: string
  items: CartItem[]
  totalPrice: number
  discount?: CartDiscount
}

export interface OrderItem {
  productID: {
    _id: string
    productName: string
    price: number
    productImage?: string
  } | null
  quantity: number
  orderprice: number
}

export interface Order {
  _id: string
  orderID: number
  orderStatus: 'pending' | 'confirmed' | 'cancelled'
  customer: { _id: string; userName: string; email: string; phoneNo: string }
  address: string
  orderItems: OrderItem[]
  subTotal: number
  totalAmount: number
  discount?: CartDiscount
  createdAt: string
}

export interface Category {
  _id: string
  categoryID: string
  name: string
}

// ── Cart API ──────────────────────────────────────────────────────────────────

export const cartApi = {
  get: () => request<Cart>('/cart'),
  add: (productID: string, quantity = 1) =>
    request<Cart>('/cart/add', { method: 'POST', body: JSON.stringify({ productID, quantity }) }),
  update: (productID: string, quantity: number) =>
    request<Cart>('/cart/update', { method: 'PATCH', body: JSON.stringify({ productID, quantity }) }),
  remove: (productID: string) =>
    request<Cart>(`/cart/remove/${productID}`, { method: 'DELETE' }),
  applyDiscount: (discountCode: string) =>
    request<Cart>('/cart/apply-discount', { method: 'POST', body: JSON.stringify({ discountCode }) }),
  clear: () => request<Cart>('/cart/clear', { method: 'DELETE' }),
}

// ── Order API ─────────────────────────────────────────────────────────────────

export const orderApi = {
  place: (address: string, discountCode?: string) =>
    request<Order>('/orders', { method: 'POST', body: JSON.stringify({ address, discountCode }) }),
  myOrders: () => request<Order[]>('/orders/my-orders'),
  getById: (id: string) => request<Order>(`/orders/${id}`),
  cancel: (id: string) => request<Order>(`/orders/${id}/cancel`, { method: 'PATCH' }),
}

// ── Category API ──────────────────────────────────────────────────────────────

export const categoryApi = {
  getAll: () => request<Category[]>('/categories'),
}
