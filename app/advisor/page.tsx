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
      </nav>      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Top Score Bar - Compact & Glassmorphic */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-xl border border-white/40">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Current Score</p>
                  <p className="text-2xl font-bold text-slate-900">{financialData.cibilScore}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-xl border border-white/40">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Potential Gain</p>
                  <p className="text-2xl font-bold text-emerald-600">+{potentialScore - financialData.cibilScore} pts</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-xl border border-white/40">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Risk Level</p>
                  <p className="text-2xl font-bold text-slate-900">{rating.label}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-xl border border-white/40">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Smart Tips</p>
                  <p className="text-2xl font-bold text-slate-900">{tips.length} Available</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8 h-[750px]">
            {/* Sidebar Actions - Compact */}
            <div className="hidden lg:block space-y-6 overflow-y-auto pr-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-violet-600 w-5 h-5" />
                <h3 className="font-bold text-slate-900">Priority Steps</h3>
              </div>
              <div className="space-y-4">
                {tips.map((tip, i) => (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <button
                      onClick={() => setInput(`Tell me more about: ${tip.title}`)}
                      className="w-full text-left p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all group"
                    >
                      <p className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-violet-600 transition-colors">
                        {tip.title}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase text-emerald-600">+{tip.potentialGain} pts</span>
                        <ChevronRight className="w-3 h-3 text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Expansive Chat Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-3 h-full"
            >
              <Card className="border-0 shadow-2xl shadow-violet-200/50 bg-white/80 backdrop-blur-2xl border border-white/50 h-full flex flex-col overflow-hidden rounded-[2.5rem]">
                {/* Chat Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/40">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-violet-500/30">
                      <MessageSquare className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Financial Coach</h2>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-500/50" />
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Active Assistant</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset Chat
                  </Button>
                </div>

                {/* Messages - More Spacious */}
                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                          <div className={`shadow-sm transition-all ${
                            msg.role === 'user' 
                              ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-3xl rounded-tr-none px-6 py-4' 
                              : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-3xl rounded-tl-none px-6 py-4'
                          }`}>
                            <p className="text-base leading-relaxed whitespace-pre-wrap">
                              {msg.content.split('**').map((part, i) => 
                                i % 2 === 1 ? <strong key={i} className={msg.role === 'user' ? 'text-white' : 'text-violet-700 font-extrabold'}>{part}</strong> : part
                              )}
                            </p>
                          </div>
                          <p className={`text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest px-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
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
                      <div className="bg-slate-50 rounded-3xl rounded-tl-none px-6 py-4 border border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1.5 h-1.5 bg-violet-600 rounded-full animate-bounce" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area - Redesigned */}
                <div className="p-6 bg-white/40 border-t border-slate-100">
                  {/* Quick Prompts - Floating Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {quickPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(prompt.text)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 shadow-sm hover:shadow-md border border-transparent ${
                          prompt.color === 'sky' ? 'bg-sky-50 text-sky-700 hover:border-sky-200' :
                          prompt.color === 'violet' ? 'bg-violet-50 text-violet-700 hover:border-violet-200' :
                          prompt.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 hover:border-emerald-200' :
                          'bg-amber-50 text-amber-700 hover:border-amber-200'
                        }`}
                      >
                        <prompt.icon className="w-3.5 h-3.5" />
                        {prompt.text}
                      </button>
                    ))}
                  </div>

                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center gap-4 bg-slate-100/50 p-2 rounded-[2rem] border border-slate-200/50 focus-within:bg-white focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 transition-all shadow-inner"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me about credit improvement, home loans, or EMIs..."
                      className="flex-1 px-6 py-4 bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-400"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="bg-violet-600 hover:bg-violet-700 text-white w-14 h-14 rounded-full shadow-xl shadow-violet-500/30 transition-all flex-shrink-0 active:scale-90 disabled:opacity-50 disabled:scale-100"
                    >
                      <Send className="w-6 h-6" />
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
