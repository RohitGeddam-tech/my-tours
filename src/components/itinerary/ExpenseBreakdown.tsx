import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Utensils, Car, Ticket, MoreHorizontal } from 'lucide-react'
import type { ExpenseBreakdown as ExpenseBreakdownType } from '@/lib/types'
import { formatINR } from '@/lib/utils'

type Expense = {
    id: string
    category: string
    amount: number
    price_type: 'fixed' | 'negotiated' | 'seasonal'
    negotiation_tip?: string
}

interface ExpenseBreakdownProps {
  expenses?: Expense[]
  breakdown?: ExpenseBreakdownType
  totalExpense?: number
  total?: number
}

const expenseCategories = [
  { key: 'stay', label: 'Stay', icon: Home },
  { key: 'food', label: 'Food', icon: Utensils },
  { key: 'travel', label: 'Travel', icon: Car },
  { key: 'activities', label: 'Activities', icon: Ticket },
  { key: 'other', label: 'Other', icon: MoreHorizontal },
] as const

export default function ExpenseBreakdown({ expenses, breakdown: propBreakdown, totalExpense, total }: ExpenseBreakdownProps) {
  
  // Calculate total expense from either prop
  const finalTotal = total || totalExpense || 0
  
  // Map expenses array into ExpenseBreakdownType shape if breakdown is not provided
  let breakdown: ExpenseBreakdownType = propBreakdown || {
      stay: 0, food: 0, travel: 0, activities: 0, other: 0
  }

  if (expenses && expenses.length > 0 && !propBreakdown) {
      breakdown = expenses.reduce((acc, exp) => {
          const key = exp.category as keyof ExpenseBreakdownType
          if (acc[key] !== undefined) {
             acc[key] = (acc[key] || 0) + exp.amount
          } else {
             acc['other'] = (acc['other'] || 0) + exp.amount
          }
          return acc
      }, { stay: 0, food: 0, travel: 0, activities: 0, other: 0 } as ExpenseBreakdownType)
  }

  const valuesArr = Object.values(breakdown).filter(v => typeof v === 'number' && v > 0) as number[]
  const maxAmount = valuesArr.length > 0 ? Math.max(...valuesArr) : 1 // Avoid divide by zero

  if ((!expenses?.length && !propBreakdown) || finalTotal === 0) {
      return (
        <Card className="mt-8 rounded-[32px] border-gray-100 shadow-xl shadow-orange-900/5 bg-white">
          <CardHeader className="pb-3 text-center pt-8">
            <CardTitle className="text-xl font-bold text-gray-900 mb-2">Expense Breakdown</CardTitle>
            <p className="text-gray-400 font-normal">No expense breakdown provided for this trip.</p>
            <div className="mt-4 text-2xl font-black text-[#E07A3F]">{formatINR(finalTotal)}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-semibold">Total Expense</div>
          </CardHeader>
        </Card>
      )
  }

  return (
    <Card className="mt-8 rounded-[32px] border-gray-100 shadow-xl shadow-orange-900/5 bg-white">
      <CardHeader className="pb-3 border-b-0 space-y-0 p-6 mb-2">
        <CardTitle className="text-lg font-black text-gray-900 leading-tight flex items-center justify-between">
          <span>Expense Breakdown</span>
          <span className="text-xl font-bold text-[#E07A3F]">
            {formatINR(finalTotal)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="space-y-5">
          {expenseCategories.map(({ key, label, icon: Icon }) => {
            const amount = breakdown[key as keyof ExpenseBreakdownType]
            if (!amount) return null
            
            const percentage = finalTotal > 0 ? (amount / finalTotal) * 100 : 0
            const barWidth = (amount / maxAmount) * 100

            return (
              <div key={key} className="space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <span className="text-sm font-bold text-gray-800">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-gray-900 tabular-nums">
                      {formatINR(amount)}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest w-8 text-right">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#E07A3F] rounded-full transition-all duration-1000 group-hover:opacity-80"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
