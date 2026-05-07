'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Brain,
  IndianRupee,
  Send,
  Sparkles,
  TrendingUp,
  Target,
  CreditCard,
  PiggyBank,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Lightbulb,
  Shield,
  MessageSquare
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
  generateCIBILTips,
  CIBILTip,
  calculatePotentialScore
} from '@/lib/financial-utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const quickPrompts = [
  { icon: TrendingUp, text: 'How can I improve my CIBIL score quickly?', color: 'sky' },
  { icon: CreditCard, text: 'Should I close my unused credit cards?', color: 'violet' },
  { icon: PiggyBank, text: 'Best way to reduce my credit utilization?', color: 'emerald' },
  { icon: Target, text: 'How to get approved for a home loan?', color: 'amber' },
]

export default function AdvisorPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [financialData, setFinancialData] = useState<FinancialData | null>(null)
  const [tips, setTips] = useState<CIBILTip[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const timer = setTimeout(() => {
      const data = generateDemoFinancialData(user.financials)
      setFinancialData(data)
      setTips(generateCIBILTips(data))
      setIsAnalyzing(false)

      const rating = getCIBILRating(data.cibilScore)
      const generatedTips = generateCIBILTips(data)
      setMessages([{
        id: '1',
        role: 'assistant',
        content: `Namaste ${user.name?.split(' ')[0]}! 🙏 I'm your AI Credit Advisor.\n\nI've analyzed your CIBIL profile:\n\n**Current Score: ${data.cibilScore} (${rating.label})**\n**Credit Utilization: ${data.creditUtilization}%**\n**Payment History: ${data.paymentHistory}%**\n\nBased on your profile, I can help you improve your score by up to **+${generatedTips.reduce((sum, t) => sum + t.potentialGain, 0)} points**.\n\nAsk me anything about credit improvement, loan eligibility, or financial planning!`,
        timestamp: new Date(),
      }])
    }, 800)

    return () => clearTimeout(timer)
  }, [user, router])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading || !financialData) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const rating = getCIBILRating(financialData.cibilScore)
      const financialContext = `
User's CIBIL Score: ${financialData.cibilScore} (${rating.label})
Monthly Income: ${formatINR(financialData.monthlyIncome)}
Total EMI: ${formatINR(financialData.emiAmount)} (FOIR: ${Math.round((financialData.emiAmount / financialData.monthlyIncome) * 100)}%)
Credit Utilization: ${financialData.creditUtilization}%
Payment History: ${financialData.paymentHistory}%
Total Debt: ${formatINR(financialData.totalDebt)}
Savings: ${formatINR(financialData.savings)}
Credit Age: ${financialData.creditAge} years
Total Credit Accounts: ${financialData.totalAccounts}
Hard Inquiries (last 6 months): ${financialData.hardInquiries}
Credit Limit: ${formatINR(financialData.creditLimit)}
Used Credit: ${formatINR(financialData.usedCredit)}

Context: This is an Indian user asking about CIBIL score (300-900 range), Indian banking products, and Indian financial regulations.
      `.trim()

      const response = await fetch('/api/ai-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input.trim(), 
          financialContext 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get advice')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.advice || 'I apologize, but I was unable to generate advice at this moment. Please try again.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I encountered an issue: ${error.message}. Please try again or check your connection.`,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!user || isAnalyzing || !financialData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center animate-pulse shadow-xl shadow-violet-500/30">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Analyzing Your Profile</h2>
          <p className="text-slate-600">Our AI is reviewing your financial data...</p>
        </div>
      </div>
    )
  }

  const rating = getCIBILRating(financialData.cibilScore)
  const potentialScore = calculatePotentialScore(financialData.cibilScore, tips)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">
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
                { name: 'Dashboard', href: '/dashboard', active: false },
                { name: 'AI Advisor', href: '/advisor', active: true },
                { name: 'Expenses', href: '/expenses', active: false },
                { name: 'Analytics', href: '/analytics', active: false },
              ].map((item) => (
                <Link key={item.name} href={item.href}>
                  <Button 
                    variant={item.active ? 'secondary' : 'ghost'} 
                    className={item.active ? 'bg-violet-100 text-violet-700 hover:bg-violet-100' : 'text-slate-600 hover:text-slate-900'}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="text-slate-500">
                  <Settings className="w-5 h-5" />
                </Button>
              </Link>
              <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-red-500">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Score & Tips */}
          <div className="space-y-6">
            {/* Score Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-0 shadow-xl shadow-violet-200/50 bg-gradient-to-br from-violet-500 to-purple-600 text-white overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-violet-200 text-sm">AI Analysis</p>
                      <p className="font-bold text-lg">Your CIBIL Health</p>
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-violet-200 text-sm mb-1">Current Score</p>
                      <p className="text-4xl font-bold">{financialData.cibilScore}</p>
                      <p className="text-violet-200">{rating.label}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-violet-200 text-sm mb-1">Potential</p>
                      <p className="text-2xl font-bold text-emerald-300">{potentialScore}</p>
                      <p className="text-emerald-300 text-sm">+{potentialScore - financialData.cibilScore} pts</p>
                    </div>
                  </div>

                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000"
                      style={{ width: `${((financialData.cibilScore - 300) / 600) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Priority Tips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Priority Actions</h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{tips.length} tips</span>
              </div>
              <div className="space-y-3">
                {tips.slice(0, 4).map((tip, i) => (
                  <Card 
                    key={tip.id} 
                    className="border-0 shadow-md bg-white hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => setInput(`Tell me more about: ${tip.title}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          tip.impact === 'high' ? 'bg-red-100 text-red-600' :
                          tip.impact === 'medium' ? 'bg-amber-100 text-amber-600' :
                          'bg-sky-100 text-sky-600'
                        }`}>
                          {tip.impact === 'high' ? <AlertTriangle className="w-4 h-4" /> :
                           tip.impact === 'medium' ? <Lightbulb className="w-4 h-4" /> :
                           <Shield className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-900 text-sm truncate group-hover:text-violet-600 transition-colors">{tip.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-emerald-600 font-semibold">+{tip.potentialGain} pts</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white h-[calc(100vh-12rem)] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900">AI Credit Advisor</h2>
                    <p className="text-xs text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      Online - Powered by AI
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-500" onClick={() => window.location.reload()}>
                  <RefreshCw className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-2xl px-4 py-3 ${
                          msg.role === 'user' 
                            ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-br-md' 
                            : 'bg-slate-100 text-slate-800 rounded-bl-md'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.content.split('**').map((part, i) => 
                              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                            )}
                          </p>
                        </div>
                        <p className={`text-xs text-slate-400 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              <div className="px-4 py-3 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(prompt.text)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                        prompt.color === 'sky' ? 'bg-sky-50 text-sky-700 hover:bg-sky-100' :
                        prompt.color === 'violet' ? 'bg-violet-50 text-violet-700 hover:bg-violet-100' :
                        prompt.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' :
                        'bg-amber-50 text-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      <prompt.icon className="w-3 h-3" />
                      {prompt.text.length > 30 ? prompt.text.slice(0, 30) + '...' : prompt.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-100">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about credit improvement, loans, EMIs..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-900 placeholder:text-slate-400"
                      disabled={isLoading}
                    />
                  </div>
                  <Button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white h-12 px-6 rounded-xl shadow-lg shadow-violet-500/25"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
