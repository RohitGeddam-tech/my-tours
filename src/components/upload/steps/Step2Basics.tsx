// src/components/upload/StepBasics.tsx
'use client'
import { useUploadStore } from '@/store/uploadStore'
import { useState } from 'react'

const PERSONAS = [
    { id: 'solo', label: 'Solo', icon: '👤' },
    { id: 'couple', label: 'Couple', icon: '👩‍❤️‍👨' },
    { id: 'family', label: 'Family', icon: '👨‍👩-👧‍👦' },
    { id: 'friends', label: 'Friends', icon: '👯‍♂️' },
    { id: 'pet', label: 'Pet-friendly', icon: '🐾' },
]

const COMFORT_LEVELS = [
    { id: 'budget', label: 'Budget', icon: '🟢', desc: 'Hostels, shared transport' },
    { id: 'midrange', label: 'Mid-range', icon: '🟡', desc: 'Standard hotels, private cabs' },
    { id: 'luxury', label: 'Luxury', icon: '🔴', desc: 'Resorts, fine dining' },
]

export default function Step2Basics() {
    const {
        duration_days, setDurationDays,
        total_expense, setTotalExpense,
        persona, setPersona,
        comfort_level, setComfortLevel,
        nextStep, prevStep
    } = useUploadStore()

    const [days, setDays] = useState(duration_days || 1)
    const [expense, setExpense] = useState(total_expense || '')
    const [selectedPersona, setSelectedPersona] = useState(persona || 'solo')
    const [selectedComfort, setSelectedComfort] = useState(comfort_level || 'budget')

    const handleNext = () => {
        setDurationDays(Number(days))
        setTotalExpense(Number(expense))
        setPersona(selectedPersona as any)
        setComfortLevel(selectedComfort as any)
        nextStep()
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-8">Trip Basics</h2>

            <div className="space-y-8">
                {/* Duration & Expense */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Duration (Days)</label>
                        <input
                            type="number"
                            min="1"
                            value={days}
                            onChange={(e) => setDays(Number(e.target.value))}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 font-bold focus:border-[#E07A3F] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Total Budget (₹)</label>
                        <input
                            type="number"
                            value={expense}
                            onChange={(e) => setExpense(e.target.value)}
                            placeholder="7200"
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-3 font-bold focus:border-[#E07A3F] outline-none"
                        />
                    </div>
                </div>

                {/* Persona */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Who was this trip for?</label>
                    <div className="grid grid-cols-3 gap-3">
                        {PERSONAS.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedPersona(p.id)}
                                className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all
                                    ${selectedPersona === p.id ? 'border-[#E07A3F] bg-orange-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}
                                `}
                            >
                                <span className="text-2xl mb-1">{p.icon}</span>
                                <span className="text-xs font-bold text-gray-700">{p.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comfort */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">Comfort Level</label>
                    <div className="space-y-2">
                        {COMFORT_LEVELS.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setSelectedComfort(c.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left
                                    ${selectedComfort === c.id ? 'border-[#E07A3F] bg-orange-50/30' : 'border-gray-100 bg-white hover:border-gray-200'}
                                `}
                            >
                                <span className="text-2xl">{c.icon}</span>
                                <div>
                                    <div className="text-sm font-bold text-gray-900">{c.label}</div>
                                    <div className="text-xs text-gray-400">{c.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={prevStep} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all">
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!expense}
                        className="flex-[2] bg-[#E07A3F] hover:bg-[#C96A32] disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200"
                    >
                        Next Step
                    </button>
                </div>
            </div>
        </div>
    )
}
