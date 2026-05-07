'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  Brain, 
  IndianRupee, 
  CreditCard, 
  PieChart,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Users,
  Star,
  Zap,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'CIBIL Score Tracking',
    description: 'Monitor your credit score in real-time with detailed breakdowns',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations to improve your score faster',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: PieChart,
    title: 'Expense Analytics',
    description: 'Track spending in INR with smart categorization and budgets',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Target,
    title: 'Score Predictions',
    description: 'See how your actions today impact your CIBIL score',
    gradient: 'from-amber-400 to-orange-500',
  },
]

const benefits = [
  'Free CIBIL score analysis',
  'Personalized improvement roadmap',
  'EMI & loan eligibility calculator',
  'Weekly progress reports',
  'Bank-level data security',
  'No impact on credit score',
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer, Bangalore',
    content: 'My CIBIL score improved from 680 to 780 in just 4 months following CreditIQ tips!',
    avatar: 'PS',
  },
  {
    name: 'Rahul Verma',
    role: 'Business Owner, Mumbai',
    content: 'Finally got my home loan approved at 8.5% interest. Thank you CreditIQ!',
    avatar: 'RV',
  },
  {
    name: 'Anjali Patel',
    role: 'CA, Delhi',
    content: 'The AI advisor helped me understand exactly why my score was low and how to fix it.',
    avatar: 'AP',
  },
]

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-500/25">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">CreditIQ</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Features</Link>
              <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">How it Works</Link>
              <Link href="#testimonials" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Reviews</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-700 font-medium">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white shadow-lg shadow-sky-500/25 font-medium">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 mb-6">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-700">AI-Powered Credit Intelligence for India</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Boost Your{' '}
                <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                  CIBIL Score
                </span>
                {' '}with AI
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Track, analyze, and improve your credit score with personalized AI recommendations. 
                Join 50,000+ Indians who improved their CIBIL score by an average of 85 points.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white shadow-xl shadow-sky-500/30 text-lg px-8 h-14">
                    Check My Score Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-700 text-lg px-8 h-14 hover:bg-slate-50">
                    See How It Works
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-200">
                <div className="flex -space-x-3">
                  {['RK', 'SP', 'AJ', 'NM'].map((initials, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-md">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-slate-600">Rated 4.9 by 50,000+ users</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Score Card Preview */}
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-8 border border-slate-100">
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium shadow-lg">
                  Live Preview
                </div>
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-slate-500 mb-2">Your CIBIL Score</p>
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-48 h-48 transform -rotate-90">
                      <circle cx="96" cy="96" r="80" stroke="#e2e8f0" strokeWidth="12" fill="none" />
                      <circle 
                        cx="96" cy="96" r="80" 
                        stroke="url(#scoreGradient)" 
                        strokeWidth="12" 
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(756 / 900) * 502} 502`}
                      />
                      <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-slate-900">756</span>
                      <span className="text-emerald-600 font-semibold">Excellent</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-slate-600 font-medium">This Month</span>
                    </div>
                    <p className="text-xl font-bold text-emerald-600">+24 pts</p>
                  </div>
                  <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-100">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-4 h-4 text-sky-600" />
                      <span className="text-xs text-slate-600 font-medium">Utilization</span>
                    </div>
                    <p className="text-xl font-bold text-sky-600">28%</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-sm text-slate-700">All EMIs paid on time this month</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-xl border border-sky-100">
                    <Brain className="w-5 h-5 text-sky-600 flex-shrink-0" />
                    <p className="text-sm text-slate-700">AI Tip: Pay card bill before 25th for +15 pts</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-6 top-1/4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
              >
                <BarChart3 className="w-8 h-8 text-sky-500" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100"
              >
                <Zap className="w-8 h-8 text-amber-500" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                Master Your Credit
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for Indian credit profiles and CIBIL scores
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Improve Your Score in 3 Simple Steps
            </h2>
            <p className="text-lg text-slate-600">No complex procedures. Start improving in minutes.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign Up Free', desc: 'Create your account with just email. No PAN or Aadhaar needed to start.', icon: Users },
              { step: '02', title: 'Get AI Analysis', desc: 'Our AI analyzes your financial profile and creates a personalized improvement plan.', icon: Brain },
              { step: '03', title: 'Watch Score Rise', desc: 'Follow the recommendations and track your CIBIL score progress weekly.', icon: TrendingUp },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-7xl font-bold text-slate-100 absolute top-4 right-4">{item.step}</div>
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-sky-500/25">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Why 50,000+ Indians Trust CreditIQ
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Built specifically for the Indian credit system. Understand CIBIL like never before.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-sky-500 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl shadow-sky-500/30"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-4xl font-bold">50,000+</p>
                  <p className="text-sky-100">Active Indian Users</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold">+85</p>
                  <p className="text-sky-100 text-sm">Avg. Score Increase</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold">4.9/5</p>
                  <p className="text-sky-100 text-sm">User Rating</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold">3 Months</p>
                  <p className="text-sky-100 text-sm">Avg. Time to 750+</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sky-100 text-sm">Free to Start</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-sky-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Real Results from Real Indians
            </h2>
            <p className="text-lg text-slate-600">See how CreditIQ helped them achieve their financial goals</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">&quot;{t.content}&quot;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-white font-semibold shadow-md">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 to-emerald-500">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Improve Your CIBIL Score?
            </h2>
            <p className="text-lg text-sky-100 mb-8">
              Join thousands of Indians who are taking control of their financial future. Start free today.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-sky-50 text-lg px-10 h-14 shadow-xl font-semibold">
                Start Free Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-sky-200 text-sm mt-4">No credit card required. Free forever plan available.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">CreditIQ</span>
            </div>
            <p className="text-sm text-center md:text-left">Made with care for India. Not affiliated with CIBIL, Experian, or any credit bureau.</p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
