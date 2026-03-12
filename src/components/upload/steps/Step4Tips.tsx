// src/components/upload/steps/Step4Tips.tsx
'use client'
import { useUploadStore } from '@/store/uploadStore'
import { useState } from 'react'

const TIP_TYPES = [
    { id: 'warning', icon: '⚠️', label: 'Warning' },
    { id: 'scam', icon: '🚨', label: 'Scam Alert' },
    { id: 'hack', icon: '🧠', label: 'Local Hack' },
    { id: 'safety', icon: '🔒', label: 'Safety' },
    { id: 'recommendation', icon: '💡', label: 'Recommendation' },
    { id: 'advice', icon: '✅', label: 'Advice' },
] as const

const PROMPTS = [
    "What's one thing you wish you knew before this trip?",
    "Was there anything travelers should watch out for?",
    "Any hidden gem or practical advice?",
]

export default function Step4Tips() {
    const { tips, addTip, removeTip, nextStep, prevStep } = useUploadStore()
    const [content, setContent] = useState('')
    const [type, setType] = useState<typeof TIP_TYPES[number]['id']>('recommendation')
    const [promptIndex, setPromptIndex] = useState(0)

    const handleAdd = () => {
        if (content.trim().length < 5) return
        addTip({ content, tip_type: type })
        setContent('')
        setPromptIndex((i) => (i + 1) % PROMPTS.length)
    }

    const canContinue = tips.length >= 2

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Practical Tips</h2>
            <p className="text-gray-500 mb-8 font-medium">At least 2 tips are required to help the community.</p>

            <div className="space-y-6">
                {/* List */}
                <div className="space-y-3">
                    {tips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                            <span className="text-2xl shrink-0">{TIP_TYPES.find(t => t.id === tip.tip_type)?.icon}</span>
                            <p className="flex-1 text-sm font-medium text-gray-800 leading-relaxed">{tip.content}</p>
                            <button onClick={() => removeTip(i)} className="text-red-400 hover:text-red-600 shrink-0">✕</button>
                        </div>
                    ))}
                </div>

                {/* Add New */}
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-6 shadow-xl shadow-gray-100">
                    <div className="text-xs font-bold text-[#E07A3F] uppercase tracking-widest mb-3">
                        {PROMPTS[promptIndex]}
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="e.g. UPI is unreliable near Murud beach, carry at least ₹2000 in cash."
                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-[#E07A3F] focus:bg-white transition-all mb-4"
                        rows={3}
                    />

                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {TIP_TYPES.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setType(t.id)}
                                className={`flex flex-col items-center py-2 rounded-xl border-2 transition-all
                                    ${type === t.id ? 'border-[#E07A3F] bg-orange-50/50' : 'border-gray-50 bg-white hover:border-gray-100'}
                                `}
                            >
                                <span className="text-lg mb-0.5">{t.icon}</span>
                                <span className="text-[10px] font-bold text-gray-500 uppercase">{t.label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleAdd}
                        disabled={content.trim().length < 5}
                        className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-gray-100 text-white disabled:text-gray-400 font-bold py-3 rounded-2xl transition-all"
                    >
                        Add Tip
                    </button>
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={prevStep} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all">
                        Back
                    </button>
                    <button
                        onClick={nextStep}
                        disabled={!canContinue}
                        className="flex-[2] bg-[#E07A3F] hover:bg-[#C96A32] disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200"
                    >
                        {canContinue ? 'Next: Safety' : 'Add at least 2 tips'}
                    </button>
                </div>
            </div>
        </div>
    )
}
