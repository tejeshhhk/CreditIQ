import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CreditIQ - AI CIBIL Score Tracker | India',
  description: 'AI-powered CIBIL score tracking, personalized credit improvement tips, and financial insights for Indians',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" style={{
      fontFamily: `${geistSans.style.fontFamily}, ${geistMono.style.fontFamily}`
    }}>
      <body className="bg-gradient-to-br from-background via-background to-blue-50 text-foreground antialiased overflow-x-hidden min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

