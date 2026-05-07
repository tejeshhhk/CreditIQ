'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Settings } from 'lucide-react'

export function Header() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) return null

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">₹</span>
            </div>
            <span className="hidden md:inline font-bold text-lg">CreditTrack AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition">
              Dashboard
            </Link>
            <Link href="/advisor" className="text-sm text-muted-foreground hover:text-foreground transition">
              AI Advisor
            </Link>
            <Link href="/expenses" className="text-sm text-muted-foreground hover:text-foreground transition">
              Expenses
            </Link>
            <Link href="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition">
              Analytics
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user.name}</span>
          <Link href="/settings" className="text-muted-foreground hover:text-foreground transition">
            <Settings size={20} />
          </Link>
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
