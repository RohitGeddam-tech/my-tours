// src/components/upload/StepDestination.tsx
'use client'
import { useUploadStore } from '@/store/uploadStore'
import { useState } from 'react'

export default function Step1Destination() {
    const { destination, setDestination, nextStep } = useUploadStore()
    const [input, setInput] = useState(destination || '')

    const handleNext = () => {
        if (input.trim()) {
            setDestination(input)
            nextStep()
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Where did you travel?</h2>
            <p className="text-gray-500 mb-8">Enter the city or destination you visited.</p>

            <div className="space-y-6">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g. Dapoli, Goa, Manali..."
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-6 py-4 text-lg font-medium focus:border-[#E07A3F] focus:bg-white outline-none transition-all"
                    autoFocus
                />

                <button
                    onClick={handleNext}
                    disabled={!input.trim()}
                    className="w-full bg-[#E07A3F] hover:bg-[#C96A32] disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200"
                >
                    Continue
                </button>
            </div>
        </div>
    )
}
