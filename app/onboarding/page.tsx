'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  IndianRupee, 
  Wallet, 
  CreditCard, 
  PiggyBank, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Brain
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function OnboardingPage() {
  const { user, updateFinancials, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    monthlyIncome: '',
    emiAmount: '',
    totalDebt: '',
    creditLimit: '',
    usedCredit: '',
    savings: ''
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (!authLoading && user?.financials) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (value === '' || /^\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await updateFinancials({
        monthlyIncome: Number(formData.monthlyIncome),
        emiAmount: Number(formData.emiAmount),
        totalDebt: Number(formData.totalDebt),
        creditLimit: Number(formData.creditLimit),
        usedCredit: Number(formData.usedCredit),
        savings: Number(formData.savings)
      })
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to update financials:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading || !user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-sky-500/20">
            <IndianRupee className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Your Profile</h1>
          <p className="text-slate-600">Enter your financial details to generate your CIBIL score analysis</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl shadow-slate-200/60 bg-white overflow-hidden">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-sky-500" />
                        Monthly Salary (₹)
                      </label>
                      <input
                        required
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        placeholder="e.g. 75000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        Monthly EMI Total (₹)
                      </label>
                      <input
                        required
                        name="emiAmount"
                        value={formData.emiAmount}
                        onChange={handleChange}
                        placeholder="e.g. 15000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-500" />
                        Total Existing Debt (₹)
                      </label>
                      <input
                        required
                        name="totalDebt"
                        value={formData.totalDebt}
                        onChange={handleChange}
                        placeholder="e.g. 500000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <PiggyBank className="w-4 h-4 text-purple-500" />
                        Total Savings (₹)
                      </label>
                      <input
                        required
                        name="savings"
                        value={formData.savings}
                        onChange={handleChange}
                        placeholder="e.g. 200000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-blue-500" />
                        Total Credit Limit (₹)
                      </label>
                      <input
                        required
                        name="creditLimit"
                        value={formData.creditLimit}
                        onChange={handleChange}
                        placeholder="e.g. 300000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-rose-500" />
                        Current Credit Used (₹)
                      </label>
                      <input
                        required
                        name="usedCredit"
                        value={formData.usedCredit}
                        onChange={handleChange}
                        placeholder="e.g. 45000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white text-lg font-bold rounded-2xl shadow-xl shadow-sky-500/25 transition-all flex items-center justify-center gap-2 group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Generating Your Profile...' : 'Complete Setup'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Brain className="text-sky-400 w-6 h-6" />
                </div>
                <h3 className="font-bold">AI Note</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                We use these details to simulate your real CIBIL profile. Your data is stored locally in your browser and never sent to any credit bureau.
              </p>
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                  <span>Privacy Score</span>
                  <span className="text-emerald-400">100%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full" />
                </div>
              </div>
            </Card>

            <Card className="border-0 shadow-xl bg-white p-6">
              <h3 className="font-bold text-slate-900 mb-4">Why we need this?</h3>
              <ul className="space-y-4">
                {[
                  { icon: TrendingUp, text: 'Analyze EMI/Income ratio', color: 'text-emerald-500' },
                  { icon: CreditCard, text: 'Calculate credit utilization', color: 'text-sky-500' },
                  { icon: Shield, text: 'Estimate risk profile', color: 'text-amber-500' }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    {item.text}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
