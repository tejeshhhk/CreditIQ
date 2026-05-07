// Indian Financial Utilities - CIBIL Score System

export interface FinancialData {
  cibilScore: number
  cibilChange: number
  savings: number
  monthlyIncome: number
  totalDebt: number
  creditUtilization: number
  paymentHistory: number
  creditAge: number
  totalAccounts: number
  hardInquiries: number
  emiAmount: number
  creditLimit: number
  usedCredit: number
}

export interface Expense {
  id: string
  category: string
  amount: number
  description: string
  date: string
}

export interface CIBILTip {
  id: string
  category: 'payment' | 'utilization' | 'debt' | 'credit_mix' | 'inquiry'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  potentialGain: number
  actionSteps: string[]
  aiGenerated?: boolean
}

// CIBIL Score ranges (300-900 in India)
export function getCIBILRating(score: number): { label: string; color: string; bgColor: string; description: string } {
  if (score >= 750) return { 
    label: 'Excellent', 
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    description: 'You qualify for the best loan rates and premium credit cards'
  }
  if (score >= 700) return { 
    label: 'Good', 
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Most banks will approve your loan applications'
  }
  if (score >= 650) return { 
    label: 'Fair', 
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: 'You may get approved with higher interest rates'
  }
  if (score >= 550) return { 
    label: 'Poor', 
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'Limited options, focus on improving your score'
  }
  return { 
    label: 'Very Poor', 
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    description: 'Rebuild your credit history before applying'
  }
}

// Format currency in INR with Indian numbering
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Generate realistic data based on user input or demo defaults
export function generateDemoFinancialData(userFinancials?: any): FinancialData {
  if (userFinancials) {
    const { monthlyIncome, emiAmount, totalDebt, creditLimit, usedCredit, savings } = userFinancials
    const creditUtilization = Math.round((usedCredit / creditLimit) * 100)
    
    // Simple heuristic for CIBIL score based on input
    let baseScore = 600
    if (creditUtilization < 30) baseScore += 100
    if ((emiAmount / monthlyIncome) < 0.4) baseScore += 50
    if (savings > monthlyIncome * 3) baseScore += 50
    
    return {
      cibilScore: Math.min(900, Math.max(300, baseScore)),
      cibilChange: 0,
      savings,
      monthlyIncome,
      totalDebt,
      creditUtilization,
      paymentHistory: 98, // Default for new users
      creditAge: 1,
      totalAccounts: 2,
      hardInquiries: 0,
      emiAmount,
      creditLimit,
      usedCredit,
    }
  }

  // Fallback to random demo data
  const monthlyIncome = 65000 + Math.floor(Math.random() * 60000)
  const creditLimit = 150000 + Math.floor(Math.random() * 350000)
  const usedCredit = Math.floor(creditLimit * (0.25 + Math.random() * 0.45))
  const creditUtilization = Math.round((usedCredit / creditLimit) * 100)
  
  return {
    cibilScore: 650 + Math.floor(Math.random() * 180),
    cibilChange: Math.floor(Math.random() * 25) - 8,
    savings: 80000 + Math.floor(Math.random() * 300000),
    monthlyIncome,
    totalDebt: 150000 + Math.floor(Math.random() * 600000),
    creditUtilization,
    paymentHistory: 82 + Math.floor(Math.random() * 18),
    creditAge: 1 + Math.floor(Math.random() * 10),
    totalAccounts: 2 + Math.floor(Math.random() * 6),
    hardInquiries: Math.floor(Math.random() * 5),
    emiAmount: 12000 + Math.floor(Math.random() * 30000),
    creditLimit,
    usedCredit,
  }
}

// Generate demo expenses in Indian context
export function generateDemoExpenses(): Expense[] {
  const categories = [
    { name: 'Rent/Home Loan EMI', range: [15000, 40000] },
    { name: 'Groceries & Kirana', range: [6000, 15000] },
    { name: 'Electricity & Gas', range: [1500, 4000] },
    { name: 'Mobile & Internet', range: [800, 2000] },
    { name: 'Petrol/Transport', range: [4000, 10000] },
    { name: 'Food & Swiggy/Zomato', range: [3000, 12000] },
    { name: 'Shopping & Amazon', range: [2000, 18000] },
    { name: 'Entertainment & OTT', range: [500, 2500] },
    { name: 'Medical & Pharma', range: [500, 4000] },
    { name: 'Insurance Premium', range: [1500, 8000] },
    { name: 'Education & Courses', range: [0, 12000] },
    { name: 'Domestic Help', range: [2000, 6000] },
  ]

  const expenses: Expense[] = []
  const now = new Date()

  categories.forEach((cat, index) => {
    const amount = cat.range[0] + Math.floor(Math.random() * (cat.range[1] - cat.range[0]))
    if (amount > 0) {
      expenses.push({
        id: `exp-${index}`,
        category: cat.name,
        amount,
        description: `Monthly ${cat.name.toLowerCase()}`,
        date: new Date(now.getFullYear(), now.getMonth(), 1 + Math.floor(Math.random() * 28)).toISOString(),
      })
    }
  })

  return expenses.sort((a, b) => b.amount - a.amount)
}

// Generate CIBIL score history for charts
export function generateCIBILHistory(currentScore: number, months: number = 12): { month: string; score: number }[] {
  const history: { month: string; score: number }[] = []
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const now = new Date()

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const variation = Math.floor(Math.random() * 35) - 15
    const score = Math.max(300, Math.min(900, currentScore - (i * 4) + variation))
    
    history.push({
      month: monthNames[date.getMonth()],
      score,
    })
  }

  history[history.length - 1].score = currentScore
  return history
}

// Generate personalized CIBIL improvement tips
export function generateCIBILTips(data: FinancialData): CIBILTip[] {
  const tips: CIBILTip[] = []

  // Credit Utilization Tips
  if (data.creditUtilization > 30) {
    const targetReduction = data.usedCredit - (data.creditLimit * 0.3)
    tips.push({
      id: 'util-1',
      category: 'utilization',
      title: 'Lower Credit Card Utilization',
      description: `Your utilization is ${data.creditUtilization}%. CIBIL recommends keeping it below 30%.`,
      impact: data.creditUtilization > 50 ? 'high' : 'medium',
      potentialGain: data.creditUtilization > 50 ? 45 : 25,
      actionSteps: [
        `Pay ${formatINR(targetReduction)} to reach 30% utilization`,
        'Request credit limit increase from your bank',
        'Pay before statement date to show lower balance',
      ],
    })
  }

  // Payment History Tips
  if (data.paymentHistory < 100) {
    tips.push({
      id: 'payment-1',
      category: 'payment',
      title: 'Never Miss EMI or Bill Payment',
      description: `Payment history is ${data.paymentHistory}%. This is the most critical factor (35% of CIBIL score).`,
      impact: 'high',
      potentialGain: 55,
      actionSteps: [
        'Set up NACH mandate for all EMIs',
        'Enable auto-pay on credit cards',
        'Create Google Calendar reminders 5 days before due dates',
      ],
    })
  }

  // EMI Burden Tips
  const foir = Math.round((data.emiAmount / data.monthlyIncome) * 100)
  if (foir > 45) {
    tips.push({
      id: 'debt-1',
      category: 'debt',
      title: 'Reduce Fixed Obligation Ratio',
      description: `Your FOIR is ${foir}%. Banks prefer it below 45% for new loans.`,
      impact: 'high',
      potentialGain: 35,
      actionSteps: [
        'Consider loan prepayment with bonus or savings',
        'Explore balance transfer to lower EMI',
        'Avoid new loans until existing ones reduce',
      ],
    })
  }

  // Hard Inquiry Tips
  if (data.hardInquiries > 2) {
    tips.push({
      id: 'inquiry-1',
      category: 'inquiry',
      title: 'Stop Multiple Loan Applications',
      description: `${data.hardInquiries} hard inquiries found. Each can reduce score by 5-10 points.`,
      impact: 'medium',
      potentialGain: 20,
      actionSteps: [
        'Wait 6 months before next credit application',
        'Use BankBazaar/Paisabazaar to check eligibility (soft inquiry)',
        'Apply only when confident of approval',
      ],
    })
  }

  // Credit Mix Tips
  if (data.totalAccounts < 3) {
    tips.push({
      id: 'mix-1',
      category: 'credit_mix',
      title: 'Build Credit Mix',
      description: `Only ${data.totalAccounts} credit accounts. A mix of secured and unsecured credit helps.`,
      impact: 'low',
      potentialGain: 15,
      actionSteps: [
        'Get a secured credit card against FD',
        'Keep old accounts active for credit age',
        'Consider small personal loan if needed',
      ],
    })
  }

  // Credit Age Tips
  if (data.creditAge < 3) {
    tips.push({
      id: 'age-1',
      category: 'credit_mix',
      title: 'Build Longer Credit History',
      description: `Credit age is only ${data.creditAge} year(s). Longer history means better score.`,
      impact: 'medium',
      potentialGain: 20,
      actionSteps: [
        'Never close your oldest credit card',
        'Keep old accounts active with small transactions',
        'Time will naturally improve this factor',
      ],
    })
  }

  return tips.sort((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 }
    return impactOrder[a.impact] - impactOrder[b.impact]
  })
}

// Calculate potential CIBIL score improvement
export function calculatePotentialScore(currentScore: number, tips: CIBILTip[]): number {
  const totalGain = tips.reduce((sum, tip) => sum + tip.potentialGain, 0)
  return Math.min(900, currentScore + totalGain)
}

// Get score color for gradient
export function getScoreGradient(score: number): string {
  if (score >= 750) return 'from-emerald-400 to-green-500'
  if (score >= 700) return 'from-green-400 to-emerald-500'
  if (score >= 650) return 'from-amber-400 to-yellow-500'
  if (score >= 550) return 'from-orange-400 to-amber-500'
  return 'from-red-400 to-orange-500'
}

// Analyze spending by category
export function getSpendingTrends(expenses: Expense[]): { category: string; amount: number }[] {
  const trends: { [key: string]: number } = {}
  expenses.forEach(e => {
    trends[e.category] = (trends[e.category] || 0) + e.amount
  })
  return Object.entries(trends).map(([category, amount]) => ({
    category,
    amount
  })).sort((a, b) => b.amount - a.amount)
}
