'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Extracted from existing code and adapted
export type ComfortLevel = 'budget' | 'midrange' | 'luxury'

export type BudgetTier = {
  level: ComfortLevel
  minBudget: number
  maxBudget: number
  itineraryCount: number
}

// Custom props to allow both original spectrum rows and mapped format
interface BudgetSpectrumProps {
  data?: {
      comfort_level: ComfortLevel
      min_expense: number
      max_expense: number
      count: number
  }[] | null

  // For compatibility with the new component code you provided
  budgetSpectrum?: BudgetTier[]
  duration?: number
  durationDays?: number
  onFilterChange?: (level: ComfortLevel | null) => void
  activeFilter?: ComfortLevel | null
}

const tierStyles = {
  budget: {
    bg: 'bg-emerald-500', // Matches existing theme
    text: 'text-emerald-600',
    label: 'Budget',
    icon: '🟢',
  },
  midrange: {
    bg: 'bg-[#E07A3F]',
    text: 'text-[#E07A3F]',
    label: 'Mid-range',
    icon: '🟡',
  },
  luxury: {
    bg: 'bg-indigo-600',
    text: 'text-indigo-600',
    label: 'Luxury',
    icon: '🔴',
  },
}

export default function BudgetSpectrum({
  data,
  budgetSpectrum: propBudgetSpectrum,
  duration,
  durationDays,
  onFilterChange,
  activeFilter,
}: BudgetSpectrumProps) {

  // Map the existing data format to the new expected format if provided
  const budgetSpectrum: BudgetTier[] = propBudgetSpectrum || (data ? data.map(d => ({
    level: d.comfort_level,
    minBudget: d.min_expense,
    maxBudget: d.max_expense,
    itineraryCount: d.count
  })) : [])

  const finalDuration = duration || durationDays

  if (!budgetSpectrum || budgetSpectrum.length === 0) return null

  const formatBudget = (amountPaise: number) => {
    const amount = Math.round(amountPaise / 100) // Convert paise to rupees
    if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)}L`
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k`
    }
    return amount.toString()
  }

  const totalItineraries = budgetSpectrum.reduce((acc, tier) => acc + tier.itineraryCount, 0)
  const maxCount = Math.max(...budgetSpectrum.map(t => t.itineraryCount))

  // Sort tiers by expected order
  const sortedSpectrum = [...budgetSpectrum].sort((a, b) => {
      const order = { budget: 0, midrange: 1, luxury: 2 }
      return order[a.level] - order[b.level]
  })

  return (
    <Card className="rounded-[32px] border-gray-100 shadow-xl shadow-orange-900/5 bg-white">
      <CardHeader className="pb-3 border-b-0 space-y-0 p-6 mb-2">
        <CardTitle className="text-lg font-black text-gray-900 leading-tight flex items-center justify-between">
          <span>Budget Spectrum</span>
          {finalDuration && (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic font-normal">
              {finalDuration} Days
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="space-y-6">
          {sortedSpectrum.map((tier) => {
            const style = tierStyles[tier.level]
            const widthPercent = (tier.itineraryCount / maxCount) * 100
            const isActive = activeFilter === tier.level

            return (
              <button
                key={tier.level}
                onClick={() => onFilterChange?.(isActive ? null : tier.level)}
                className={`w-full text-left rounded-lg transition-all group focus:outline-none ${
                    onFilterChange ? 'cursor-pointer' : 'cursor-default'
                } ${
                  isActive
                    ? 'ring-2 ring-primary/20 bg-primary/5'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${style.text}`}>
                      {style.label}
                    </span>
                  </div>
                  <span className="text-sm font-black text-gray-900 tabular-nums">
                    ₹{formatBudget(tier.minBudget)} — ₹{formatBudget(tier.maxBudget)}
                  </span>
                </div>
                <div className="relative h-2 bg-gray-50 rounded-full overflow-hidden mt-2">
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full ${style.bg} transition-all duration-1000 ${onFilterChange ? 'group-hover:opacity-80' : ''}`}
                    style={{ width: `${widthPercent}%` }}
                  />
                </div>
                
                <div className="mt-1.5 flex justify-end">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter italic">
                        {tier.itineraryCount} reports
                    </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-center">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">
            {totalItineraries} total itineraries available
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
