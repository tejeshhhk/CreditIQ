'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown,
  CreditCard, 
  Wallet, 
  PiggyBank,
  ArrowRight,
  Brain,
  IndianRupee,
  ChevronRight,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  Target,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { 
  FinancialData,
  generateDemoFinancialData, 
  getCIBILRating, 
  formatINR,
  generateCIBILHistory,
  generateCIBILTips,
  CIBILTip
} from '@/lib/financial-utils'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [scoreHistory, setScoreHistory] = useState<{ month: string; score: number }[]>([])
  const [tips, setTips] = useState<CIBILTip[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const timer = setTimeout(() => {
      const data = generateDemoFinancialData(user.financials)
      setFinancialData(data)
      setScoreHistory(generateCIBILHistory(data.cibilScore, 6))
      setTips(generateCIBILTips(data))
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [user, router])

  if (!user || isLoading || !financialData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center animate-pulse shadow-xl">
            <IndianRupee className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 font-medium">Loading your financial data...</p>
        </div>
      </div>
    )
  }

  const rating = getCIBILRating(financialData.cibilScore)
  const scorePercentage = ((financialData.cibilScore - 300) / 600) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/25">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">CreditIQ</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {[
                { name: 'Dashboard', href: '/dashboard', active: true },
                { name: 'AI Advisor', href: '/advisor', active: false },
                { name: 'Expenses', href: '/expenses', active: false },
                { name: 'Analytics', href: '/analytics', active: false },
              ].map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button 
                    variant={item.active ? 'secondary' : 'ghost'} 
                    className={item.active ? 'bg-sky-100 text-sky-700 hover:bg-sky-100' : 'text-slate-600 hover:text-slate-900'}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-700">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500">Free Plan</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-red-500 ml-1">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">
            Namaste, {user.name?.split(' ')[0]}!
          </h1>
          <p className="text-slate-600">Here&apos;s your financial health overview for today</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* CIBIL Score Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-emerald-500 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sky-100 font-medium mb-1">Your CIBIL Score</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-bold">{financialData.cibilScore}</span>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        financialData.cibilChange >= 0 
                          ? 'bg-white/20' 
                          : 'bg-red-500/30'
                      }`}>
                        {financialData.cibilChange >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {financialData.cibilChange >= 0 ? '+' : ''}{financialData.cibilChange} this month
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/20 font-semibold">
                    {rating.label}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-sky-100 mb-2">
                    <span>300 (Poor)</span>
                    <span>900 (Excellent)</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${scorePercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <p className="text-sky-100 text-sm mt-3">{rating.description}</p>
                </div>
              </div>
              
              {/* Score History Chart */}
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">Score Trend (6 Months)</h3>
                  <Link href="/analytics">
                    <Button variant="ghost" size="sm" className="text-sky-600 hover:text-sky-700 hover:bg-sky-50">
                      View Details <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={scoreHistory}>
                      <defs>
                        <linearGradient id="scoreGradientFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <YAxis domain={[500, 900]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: 'none', 
                          borderRadius: '12px', 
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          padding: '12px'
                        }}
                        formatter={(value: number) => [`${value}`, 'CIBIL Score']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#0ea5e9" 
                        strokeWidth={3}
                        fill="url(#scoreGradientFill)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { 
                icon: CreditCard, 
                label: 'Credit Utilization', 
                value: `${financialData.creditUtilization}%`,
                subtext: financialData.creditUtilization <= 30 ? 'Healthy (Below 30%)' : 'High - Reduce Usage',
                isGood: financialData.creditUtilization <= 30,
                gradient: 'from-sky-400 to-blue-500'
              },
              { 
                icon: Wallet, 
                label: 'Monthly EMI', 
                value: formatINR(financialData.emiAmount),
                subtext: `${Math.round((financialData.emiAmount / financialData.monthlyIncome) * 100)}% of income`,
                isGood: (financialData.emiAmount / financialData.monthlyIncome) <= 0.4,
                gradient: 'from-violet-400 to-purple-500'
              },
              { 
                icon: PiggyBank, 
                label: 'Total Savings', 
                value: formatINR(financialData.savings),
                subtext: `Emergency fund`,
                isGood: true,
                gradient: 'from-emerald-400 to-green-500'
              },
              { 
                icon: Target, 
                label: 'Payment History', 
                value: `${financialData.paymentHistory}%`,
                subtext: financialData.paymentHistory >= 95 ? 'Excellent Record' : 'Needs Improvement',
                isGood: financialData.paymentHistory >= 95,
                gradient: 'from-amber-400 to-orange-500'
              },
            ].map((stat, i) => (
              <Card key={i} className="border-0 shadow-lg shadow-slate-200/50 bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-500 truncate">{stat.label}</p>
                      <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                      <p className={`text-xs ${stat.isGood ? 'text-emerald-600' : 'text-amber-600'}`}>{stat.subtext}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* AI Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">AI Improvement Tips</h2>
                <p className="text-sm text-slate-500">Personalized recommendations based on your profile</p>
              </div>
            </div>
            <Link href="/advisor">
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-violet-500/25">
                <Brain className="w-4 h-4 mr-2" />
                Talk to AI Advisor
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.slice(0, 3).map((tip, i) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white hover:shadow-xl transition-all h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        tip.impact === 'high' 
                          ? 'bg-red-50 text-red-600' 
                          : tip.impact === 'medium'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-sky-50 text-sky-600'
                      }`}>
                        {tip.impact === 'high' && <AlertTriangle className="w-3 h-3" />}
                        {tip.impact === 'high' ? 'High Priority' : tip.impact === 'medium' ? 'Medium Priority' : 'Low Priority'}
                      </span>
                      <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-full">+{tip.potentialGain} pts</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{tip.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{tip.description}</p>
                    <div className="space-y-2">
                      {tip.actionSteps.slice(0, 2).map((step, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-slate-600 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: Brain, label: 'AI Advisor', desc: 'Get personalized tips', href: '/advisor', gradient: 'from-violet-500 to-purple-600' },
            { icon: PieChart, label: 'Expenses', desc: 'Track your spending', href: '/expenses', gradient: 'from-sky-500 to-blue-600' },
            { icon: BarChart3, label: 'Analytics', desc: 'Deep dive insights', href: '/analytics', gradient: 'from-emerald-500 to-green-600' },
            { icon: Settings, label: 'Settings', desc: 'Manage account', href: '/settings', gradient: 'from-slate-500 to-slate-600' },
          ].map((action, i) => (
            <Link key={i} href={action.href}>
              <Card className="border-0 shadow-lg shadow-slate-200/50 bg-white hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group h-full">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{action.label}</p>
                    <p className="text-sm text-slate-500 truncate">{action.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
