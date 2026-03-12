// src/components/destination/BudgetSpectrum.tsx

type SpectrumRow = {
    comfort_level: 'budget' | 'midrange' | 'luxury'
    min_expense: number   // paise
    max_expense: number   // paise
    count: number
}

type Props = {
    data: SpectrumRow[] | null
    durationDays?: number  // optional — shown in the header label
}

const TIER_CONFIG = {
    budget: { emoji: '🟢', label: 'Budget', order: 0 },
    midrange: { emoji: '🟡', label: 'Mid-range', order: 1 },
    luxury: { emoji: '🔴', label: 'Luxury', order: 2 },
} as const

function formatINR(paise: number): string {
    const rupees = Math.round(paise / 100)
    if (rupees >= 100_000) return `₹${(rupees / 100_000).toFixed(1)}L`
    if (rupees >= 1_000) return `₹${Math.round(rupees / 1_000)}k`
    return `₹${rupees}`
}

export default function BudgetSpectrum({ data, durationDays }: Props) {
    if (!data || data.length === 0) return null

    const sorted = [...data].sort(
        (a, b) => TIER_CONFIG[a.comfort_level].order - TIER_CONFIG[b.comfort_level].order
    )

    // Calculate max count for relative bar widths
    const maxCount = Math.max(...data.map(d => d.count))

    return (
        <section className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xl shadow-orange-900/5">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-lg font-black text-gray-900 leading-tight">Budget Spectrum</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Based on {data.reduce((acc, curr) => acc + curr.count, 0)} trip reports</p>
                </div>
            </div>

            <div className="space-y-6">
                {sorted.map((row) => {
                    const { label, order } = TIER_CONFIG[row.comfort_level]
                    const minStr = formatINR(row.min_expense)
                    const maxStr = formatINR(row.max_expense)
                    const isLuxury = row.comfort_level === 'luxury'

                    const barColors = [
                        'bg-emerald-500',
                        'bg-[#E07A3F]',
                        'bg-indigo-600'
                    ]

                    return (
                        <div key={row.comfort_level} className="group">
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-[10px] font-black uppercase tracking-widest
                                    ${order === 0 ? 'text-emerald-600' : order === 1 ? 'text-[#E07A3F]' : 'text-indigo-600'}
                                `}>
                                    {label}
                                </span>
                                <span className="text-sm font-black text-gray-900 tabular-nums">
                                    {isLuxury ? `${minStr}+` : `${minStr} — ${maxStr}`}
                                </span>
                            </div>

                            {/* Bar container */}
                            <div className="relative h-2 bg-gray-50 rounded-full overflow-hidden">
                                <div
                                    className={`absolute left-0 top-0 h-full ${barColors[order]} transition-all duration-1000 group-hover:opacity-80`}
                                    style={{ width: `${(row.count / maxCount) * 100}%` }}
                                />
                            </div>

                            <div className="mt-1.5 flex justify-end">
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter italic">
                                    {row.count} reports
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-center">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center">
                    Prices shown per person for {durationDays || 3} days tour
                </p>
            </div>
        </section>
    )
}

