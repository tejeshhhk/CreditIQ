'use client'

import { useAuth } from '@/lib/auth-context'
import { ProtectedLayout } from '@/components/protected-layout'
import { generateDemoExpenses, getSpendingTrends } from '@/lib/financial-utils'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Plus, Trash2, TrendingUp } from 'lucide-react'

interface Expense {
  id: string
  category: string
  amount: number
  date: string
  description: string
}

export default function ExpensesPage() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [form, setForm] = useState({ category: 'food', amount: '', description: '' })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (user) {
      setExpenses(generateDemoExpenses())
    }
  }, [user])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.amount) return
    const exp: Expense = {
      id: Date.now().toString(),
      category: form.category as any,
      amount: parseFloat(form.amount),
      date: new Date().toISOString().split('T')[0],
      description: form.description,
    }
    setExpenses([exp, ...expenses])
    setForm({ category: 'food', amount: '', description: '' })
    setShow(false)
  }

  const cats = getSpendingTrends(expenses)
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4']

  return (
    <ProtectedLayout>
      <div className="px-6 py-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"><TrendingUp className="text-white" size={20} /></div>
                <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
              </div>
              <button onClick={() => setShow(!show)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition font-medium"><Plus size={20} /> Add</button>
            </div>
            <p className="text-gray-600">Track spending by category</p>
          </motion.div>

          {show && (
            <motion.form initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} onSubmit={handleAdd} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
                  <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {['food', 'transport', 'entertainment', 'utilities', 'shopping', 'healthcare'].map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Amount (₹)</label>
                  <input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} placeholder="0.00" required className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <input type="text" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Details..." className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="flex items-end gap-2">
                  <button type="submit" className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md font-medium">Add</button>
                  <button type="button" onClick={() => setShow(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                </div>
              </div>
            </motion.form>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
              <p className="text-gray-600 text-sm mb-1">Total Spent</p>
              <p className="text-4xl font-bold text-blue-600">₹{total.toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
              <p className="text-xs text-gray-600 mt-2">{expenses.length} tracked</p>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}} className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
              <p className="text-gray-600 text-sm mb-1">Average</p>
              <p className="text-4xl font-bold text-purple-600">₹{(total / Math.max(expenses.length, 1)).toLocaleString('en-IN', {maximumFractionDigits: 0})}</p>
              <p className="text-xs text-gray-600 mt-2">per transaction</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">By Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={cats} cx="50%" cy="50%" labelLine={false} label={{fill: '#1f2937', fontSize: 12}} dataKey="amount" stroke="none">
                    {cats.map((_, i) => <Cell key={`c-${i}`} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937'}} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-6">Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="category" tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip contentStyle={{background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#1f2937'}} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.4}} className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Recent</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {expenses.map((e) => (
                <div key={e.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{e.description || e.category.charAt(0).toUpperCase() + e.category.slice(1)}</p>
                    <p className="text-xs text-gray-600">{e.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-blue-600">₹{e.amount.toLocaleString('en-IN')}</span>
                    <button onClick={() => setExpenses(expenses.filter((x) => x.id !== e.id))} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {expenses.length === 0 && <p className="text-center text-gray-600 py-8">No expenses</p>}
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedLayout>
  )
}
