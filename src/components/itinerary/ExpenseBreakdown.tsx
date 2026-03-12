// src/components/itinerary/ExpenseBreakdown.tsx
import { formatINR } from '@/lib/utils'

type Expense = {
    id: string
    category: string
    amount: number
    price_type: 'fixed' | 'negotiated' | 'seasonal'
    negotiation_tip?: string
}

export default function ExpenseBreakdown({ expenses, total }: { expenses: Expense[], total: number }) {
    if (!expenses?.length) return (
        <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Expense Breakdown</h2>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center">
                <p className="text-gray-400">No expense breakdown provided for this trip.</p>
                <div className="mt-4 text-2xl font-black text-[#E07A3F]">{formatINR(total)}</div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-semibold">Total Expense</div>
            </div>
        </section>
    )

    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Expense Breakdown</h2>

            <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-6 bg-gray-50/50 border-b border-gray-100">
                    <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Total Trip</span>
                        <span className="text-3xl font-black text-[#E07A3F]">{formatINR(total)}</span>
                    </div>
                </div>

                <div className="divide-y divide-gray-50">
                    {expenses.map((exp) => (
                        <div key={exp.id} className="p-5 hover:bg-gray-50/30 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-800 capitalize">{exp.category}</h3>
                                    <span className={`text-[10px] uppercase tracking-tighter px-1.5 py-0.5 rounded font-bold
                                        ${exp.price_type === 'negotiated' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}
                                    `}>
                                        {exp.price_type}
                                    </span>
                                </div>
                                <span className="font-bold text-gray-900">{formatINR(exp.amount)}</span>
                            </div>

                            {exp.negotiation_tip && (
                                <div className="mt-2 bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex items-start gap-3">
                                    <span className="text-lg">🧠</span>
                                    <div className="text-sm text-amber-900 italic leading-snug">
                                        <span className="font-bold block not-italic text-[10px] uppercase tracking-widest mb-1 text-amber-600">How they got it:</span>
                                        "{exp.negotiation_tip}"
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
