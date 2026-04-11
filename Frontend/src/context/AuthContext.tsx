// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole =
  | 'Real Estate Developer'
  | 'Contractor'
  | 'Government Body'
  | 'Architect'
  | 'ESG Consultant'
  | 'Individual Buyer'

export interface UserAddress {
  street: string
  city: string
  state: string
  pincode: string
}

export interface User {
  userName: string
  email: string
  phoneNo: string
  role: UserRole
  organisation: string
  address: UserAddress[]
  privilege: 'user' | 'admin'
  accessToken?: string
}

// ── API helpers ──────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1'

async function parseApiResponse(res: Response) {
  const raw = await res.text()
  try {
    return raw ? JSON.parse(raw) : {}
  } catch {
    throw new Error(`Server returned non-JSON response (${res.status}). Check backend logs.`)
  }
}

async function apiLogin(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })
  
  const data = await parseApiResponse(res)
  if (!res.ok) throw new Error(data.message ?? 'Login failed')
  
  // Handle both response structures
  const apiUser = data?.data?.user || data?.user
  const accessToken = data?.data?.accessToken || data?.accessToken
  
  if (!apiUser?.userName) {
    throw new Error('Login response is invalid. Please restart backend and try again.')
  }

  return { ...apiUser, accessToken }
}
async function apiRegister(payload: {
  userName: string
  email: string
  phoneNo: string
  password: string
  organisation: string
  address: UserAddress  // Changed from string to object
  role: UserRole
}): Promise<{ user: User; accessToken: string }> {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  })
  
  const data = await parseApiResponse(res)
  if (!res.ok) throw new Error(data.message ?? 'Registration failed')

  const parsed =
    data?.data && typeof data.data === 'object'
      ? data.data
      : data?.message && typeof data.message === 'object'
        ? data.message
        : null

  if (!parsed?.user) {
    throw new Error('Registration response is invalid. Please restart backend and try again.')
  }

  return parsed
}

async function apiLogout(): Promise<void> {
  await fetch(`${API_BASE}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  })
}

// ── Context ──────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null
  cartCount: number
  loading: boolean
  login: (email: string, password: string) => Promise<User>
  register: (payload: RegisterPayload) => Promise<User>
  logout: () => Promise<void>
  setCartCount: (n: number) => void
}

export interface RegisterPayload {
  userName: string
  email: string
  phoneNo: string
  password: string
  organisation: string
  role: UserRole
  address: UserAddress
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  cartCount: 0,
  loading: false,
  login: async () => {
    throw new Error('AuthProvider not initialized')
  },
  register: async () => {
    throw new Error('AuthProvider not initialized')
  },
  logout: async () => {},
  setCartCount: () => {},
})

// ── Provider ─────────────────────────────────────────────────────────────────

const TOKEN_KEY = 'pp_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch {
        localStorage.removeItem(TOKEN_KEY)
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null)
      setCartCount(0)
      localStorage.removeItem(TOKEN_KEY)
    }
    window.addEventListener('auth:unauthorized', handleUnauthorized)
    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized)
    }
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const loggedInUser = await apiLogin(email, password)
      console.log("LoggedInUser: ", loggedInUser);
      
      setUser(loggedInUser)
      setCartCount(0)
      localStorage.setItem(TOKEN_KEY, JSON.stringify(loggedInUser))
      return loggedInUser
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (payload: RegisterPayload): Promise<User> => {
    try {
      // Register the user
      const { user: newUser, accessToken } = await apiRegister({
        ...payload,
        address: payload.address, // Send address as object
      })

      if (!newUser?.userName) {
        throw new Error('Registration did not return a valid user')
      }

      const userWithToken = { ...newUser, accessToken }
      
      setUser(userWithToken)
      setCartCount(0)
      localStorage.setItem(TOKEN_KEY, JSON.stringify(userWithToken))
      return userWithToken
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiLogout()
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      setUser(null)
      setCartCount(0)
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  return (
    <AuthContext.Provider value={{ user, cartCount, loading, login, register, logout, setCartCount }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}