'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

interface CreditScoreCardProps {
  score: number
  rating: string
  change?: number
}

export function CreditScoreCard({ score, rating, change = 5 }: CreditScoreCardProps) {
  const percentage = (score / 850) * 100
  
  let scoreColor = 'text-destructive'
  let bgGradient = 'from-destructive/20 to-destructive/10'
  
  if (rating === 'Excellent') {
    scoreColor = 'text-emerald-400'
    bgGradient = 'from-emerald-500/20 to-emerald-400/10'
  } else if (rating === 'Good') {
    scoreColor = 'text-blue-400'
    bgGradient = 'from-blue-500/20 to-blue-400/10'
  } else if (rating === 'Fair') {
    scoreColor = 'text-yellow-400'
    bgGradient = 'from-yellow-500/20 to-yellow-400/10'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${bgGradient} border border-border backdrop-blur-sm`}
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Your Credit Score</p>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-5xl font-bold ${scoreColor}`}
          >
            {score}
          </motion.div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Rating</p>
          <p className={`text-xl font-semibold ${scoreColor}`}>{rating}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-2 flex-1 bg-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r from-primary to-accent`}
            />
          </div>
          <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <TrendingUp size={16} className="text-emerald-400" />
          <span className="text-xs text-emerald-400">+{change} points this month</span>
        </div>
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2230%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%220.5%22/></svg>')] opacity-50" />
      </div>
    </motion.div>
  )
}
