'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
  financials?: {
    monthlyIncome: number
    emiAmount: number
    totalDebt: number
    creditLimit: number
    usedCredit: number
    savings: number
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  updateFinancials: (financials: User['financials']) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('creditTrackerUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('creditTrackerUser')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('creditTrackerUsers') || '[]')
      const userRecord = users.find((u: any) => u.email === email)

      if (!userRecord) {
        throw new Error('User not found')
      }

      // In a real app, we'd verify the password hash
      // For demo, we store plain text (NOT SECURE FOR PRODUCTION)
      if (userRecord.password !== password) {
        throw new Error('Invalid password')
      }

      const userData: User = {
        id: userRecord.id,
        email: userRecord.email,
        name: userRecord.name,
        createdAt: userRecord.createdAt,
        financials: userRecord.financials,
      }

      setUser(userData)
      localStorage.setItem('creditTrackerUser', JSON.stringify(userData))
    } catch (error) {
      throw error
    }
  }

  const signup = async (email: string, password: string, name: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('creditTrackerUsers') || '[]')

      if (users.find((u: any) => u.email === email)) {
        throw new Error('User already exists')
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        name,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem('creditTrackerUsers', JSON.stringify(users))

      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      }

      setUser(userData)
      localStorage.setItem('creditTrackerUser', JSON.stringify(userData))
    } catch (error) {
      throw error
    }
  }

  const updateFinancials = async (financials: User['financials']) => {
    if (!user) return

    try {
      const users = JSON.parse(localStorage.getItem('creditTrackerUsers') || '[]')
      const userIndex = users.findIndex((u: any) => u.id === user.id)

      if (userIndex === -1) throw new Error('User not found')

      users[userIndex].financials = financials
      localStorage.setItem('creditTrackerUsers', JSON.stringify(users))

      const updatedUser = { ...user, financials }
      setUser(updatedUser)
      localStorage.setItem('creditTrackerUser', JSON.stringify(updatedUser))
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('creditTrackerUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateFinancials, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
