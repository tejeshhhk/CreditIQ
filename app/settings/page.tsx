'use client'

import { useAuth } from '@/lib/auth-context'
import { ProtectedLayout } from '@/components/protected-layout'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Bell, Shield, Copy, Check } from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [copied, setCopied] = useState(false)
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    scoreAlerts: true,
    spendingAlerts: true,
    weeklyReport: true,
  })

  const handleCopy = () => {
    if (user?.id) {
      navigator.clipboard.writeText(user.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <ProtectedLayout>
      <div className="px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Settings className="text-white" size={20} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            </div>
            <p className="text-gray-600">Manage your account and preferences</p>
          </motion.div>

          {/* Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  value={user?.name || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none disabled:opacity-50"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none disabled:opacity-50"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">User ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={user?.id || ''}
                    readOnly
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 font-mono text-sm focus:outline-none disabled:opacity-50"
                    disabled
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check size={18} className="text-emerald-600" />
                        <span className="text-xs">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span className="text-xs">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Security */}

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-blue-600" size={20} />
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            </div>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
              Change Password
            </button>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About CreditIQ</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Version:</span> 1.0.0
              </p>
              <p>
                <span className="font-semibold text-gray-900">Built with:</span> Next.js, React, TypeScript, Tailwind CSS, Groq AI
              </p>
              <p>
                <span className="font-semibold text-gray-900">Features:</span> CIBIL score tracking, AI-powered advice, expense management, and financial analytics
              </p>
              <p className="pt-2">
                Powered by Groq&apos;s fast LLM inference and modern web technologies for a seamless financial management experience tailored for Indians.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
