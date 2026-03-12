// src/components/upload/steps/Step3Expenses.tsx
'use client'
import { useUploadStore } from '@/store/uploadStore'
import { formatINR } from '@/lib/utils'
import { useState } from 'react'

const CATEGORIES = ['stay', 'food', 'travel', 'activities', 'other'] as const

export default function Step3Expenses() {
    const { expenses, addExpense, removeExpense, total_expense, nextStep, prevStep } = useUploadStore()

    const [category, setCategory] = useState<typeof CATEGORIES[number]>('stay')
    const [amount, setAmount] = useState('')
    const [priceType, setPriceType] = useState<'fixed' | 'negotiated' | 'seasonal'>('fixed')
    const [negotiationTip, setNegotiationTip] = useState('')

    const currentTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const remaining = total_expense - currentTotal

    const handleAdd = () => {
        if (!amount) return
        addExpense({
            category,
            amount: Number(amount),
            price_type: priceType,
            negotiation_tip: negotiationTip
        })
        setAmount('')
        setNegotiationTip('')
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Expense Breakdown</h2>
            <div className="flex items-center justify-between mb-8">
                <p className="text-gray-500">Total Budget: <span className="font-bold text-gray-900">{formatINR(total_expense * 100)}</span></p>
                <div className={`text-xs font-bold px-3 py-1 rounded-full ${remaining < 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {remaining >= 0 ? `${formatINR(remaining * 100)} remaining` : `Exceeded by ${formatINR(Math.abs(remaining) * 100)}`}
                </div>
            </div>

            <div className="space-y-6">
                {/* Current List */}
                <div className="space-y-3">
                    {expenses.map((exp, i) => (
                        <div key={i} className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                            <div>
                                <div className="text-sm font-bold text-gray-900 capitalize">{exp.category}</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{exp.price_type}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900">{formatINR(exp.amount * 100)}</span>
                                <button onClick={() => removeExpense(i)} className="text-red-400 hover:text-red-600">✕</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New */}
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-[#E07A3F]"
                        >
                            {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                        </select>
                        <input
                            type="number"
                            placeholder="Amount (₹)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-[#E07A3F]"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Price Type</label>
                        <div className="flex gap-2">
                            {(['fixed', 'negotiated', 'seasonal'] as const).map(t => (
                                <button
                                    key={t}
                                    onClick={() => setPriceType(t)}
                                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all
                                        ${priceType === t ? 'bg-[#E07A3F] text-white shadow-md' : 'bg-white text-gray-400 border border-gray-100'}
                                    `}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {priceType === 'negotiated' && (
                        <textarea
                            placeholder="Negotiation tip: e.g. Booked directly via phone..."
                            value={negotiationTip}
                            onChange={(e) => setNegotiationTip(e.target.value)}
                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-sm italic outline-none focus:border-[#E07A3F] mb-4"
                            rows={2}
                        />
                    )}

                    <button
                        onClick={handleAdd}
                        disabled={!amount}
                        className="w-full bg-white border-2 border-[#E07A3F] text-[#E07A3F] font-bold py-2 rounded-xl hover:bg-[#E07A3F] hover:text-white transition-all"
                    >
                        + Add Expense
                    </button>
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={prevStep} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all">
                        Back
                    </button>
                    <button
                        onClick={nextStep}
                        className="flex-[2] bg-[#E07A3F] hover:bg-[#C96A32] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200"
                    >
                        Next: Tips & Tricks
                    </button>
                </div>
            </div>
        </div>
    )
}
