'use client'

import { useAuth } from '@/lib/auth-context'
import { ProtectedLayout } from '@/components/protected-layout'
import { generateDemoFinancialData, getCIBILRating } from '@/lib/financial-utils'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, LineChart, Line } from 'recharts'
import { Activity, TrendingUp, Target } from 'lucide-react'

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [data, setData] = useState<any>(null)
  const [score, setScore] = useState<any>(null)

  useEffect(() => {
    if (user) {
      const fd = generateDemoFinancialData(user.financials)
      setData(fd)
      setScore({
        score: fd.cibilScore,
        rating: getCIBILRating(fd.cibilScore).label
      })
    }
  }, [user])

  if (!data || !score) return <ProtectedLayout><div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" /></div></ProtectedLayout>

  const trend = [{ month: 'Jan', score: score.score - 45 }, { month: 'Feb', score: score.score - 35 }, { month: 'Mar', score: score.score - 25 }, { month: 'Apr', score: score.score - 15 }, { month: 'May', score: score.score - 5 }, { month: 'Jun', score: score.score }]
  const spending = [{ week: 'W1', exp: 3200, bud: 4000 }, { week: 'W2', exp: 3800, bud: 4000 }, { week: 'W3', exp: 3500, bud: 4000 }, { week: 'W4', exp: 4000, bud: 4000 }]
  const debt = [{ m: 'Now', d: data.totalDebt }, { m: '+3m', d: data.totalDebt * 0.9 }, { m: '+6m', d: data.totalDebt * 0.8 }, { m: '+12m', d: data.totalDebt * 0.65 }, { m: '+24m', d: data.totalDebt * 0.35 }]
  const util = [{ m: 'Jan', u: 65 }, { m: 'Feb', u: 60 }, { m: 'Mar', u: 55 }, { m: 'Apr', u: 48 }, { m: 'May', u: 40 }, { m: 'Jun', u: data.creditUtilization }]

  return (
    <ProtectedLayout>
      <div className="px-6 py-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"><Activity className="text-white" size={20} /></div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Analytics</h1>
            </div>
            <p className="text-gray-600">Your CIBIL score and financial insights</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
              <TrendingUp className="text-emerald-600 mb-3" size={24} />
              <p className="text-gray-600 text-sm mb-1">CIBIL Growth</p>
              <p className="text-3xl font-bold text-emerald-600">+{trend[5].score - trend[0].score}</p>
              <p className="text-xs text-emerald-700 mt-2">last 6 months</p>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200">
              <Target className="text-blue-600 mb-3" size={24} />
              <p className="text-gray-600 text-sm mb-1">Debt Reduction</p>
              <p className="text-3xl font-bold text-blue-600">{((1 - debt[4].d / data.totalDebt) * 100).toFixed(0)}%</p>
              <p className="text-xs text-blue-700 mt-2">24 months potential</p>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
              <Activity className="text-purple-600 mb-3" size={24} />
              <p className="text-gray-600 text-sm mb-1">Health Status</p>
              <p className="text-3xl font-bold text-purple-600">{score.rating}</p>
              <p className="text-xs text-purple-700 mt-2">current</p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">CIBIL Score Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trend}>
                  <defs><linearGradient id="cs" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis tick={{fill: '#6b7280', fontSize: 12}} domain={[300, 900]} />
                  <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937'}} />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#cs)" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Credit Utilization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={util}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="m" tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937'}} />
                  <Line type="monotone" dataKey="u" stroke="#8b5cf6" strokeWidth={3} dot={{fill: '#8b5cf6', r: 4}} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Weekly Spending (₹)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={spending}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937'}} />
                  <Bar dataKey="exp" fill="#3b82f6" />
                  <Line type="monotone" dataKey="bud" stroke="#8b5cf6" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.6}} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Debt Projection (₹)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={debt}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="m" tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937'}} />
                  <Bar dataKey="d" fill="#c084fc" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.7}} className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4">Key Insights</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex gap-2"><span className="text-blue-600 font-bold">•</span><span>Your CIBIL score is improving! Keep up good payment habits.</span></li>
              <li className="text-sm text-gray-700 flex gap-2"><span className="text-blue-600 font-bold">•</span><span>Credit utilization trending down - excellent progress!</span></li>
              <li className="text-sm text-gray-700 flex gap-2"><span className="text-blue-600 font-bold">•</span><span>Projected debt payoff: {((1 - debt[4].d / data.totalDebt) * 100).toFixed(0)}% in 24 months</span></li>
            </ul>
          </motion.div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
