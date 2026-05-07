'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
  color: 'blue' | 'purple' | 'green' | 'orange'
  index?: number
}

const colorMap = {
  blue: {
    bg: 'from-blue-500/20 to-blue-400/10',
    icon: 'text-blue-400',
    value: 'text-blue-400',
  },
  purple: {
    bg: 'from-purple-500/20 to-purple-400/10',
    icon: 'text-purple-400',
    value: 'text-purple-400',
  },
  green: {
    bg: 'from-emerald-500/20 to-emerald-400/10',
    icon: 'text-emerald-400',
    value: 'text-emerald-400',
  },
  orange: {
    bg: 'from-orange-500/20 to-orange-400/10',
    icon: 'text-orange-400',
    value: 'text-orange-400',
  },
}

export function MetricCard({ title, value, subtitle, icon, color, index = 0 }: MetricCardProps) {
  const colorStyle = colorMap[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-xl p-6 bg-gradient-to-br ${colorStyle.bg} border border-border backdrop-blur-sm hover:border-primary/50 transition-colors`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={`text-2xl font-bold ${colorStyle.value}`}>{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <div className={`${colorStyle.icon} opacity-80`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}
