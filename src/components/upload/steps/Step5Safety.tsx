// src/components/upload/steps/Step5Safety.tsx
'use client'
import { useUploadStore } from '@/store/uploadStore'
import { useState } from 'react'

const RATINGS = [1, 2, 3, 4, 5]

export default function Step5Safety() {
    const { safety_rating, women_tips, scam_alerts, setField, nextStep, prevStep } = useUploadStore()

    const [rating, setRating] = useState(safety_rating || 0)
    const [women, setWomen] = useState(women_tips || '')
    const [scams, setScams] = useState(scam_alerts || '')

    const handleNext = () => {
        setField('safety_rating', rating)
        setField('women_tips', women)
        setField('scam_alerts', scams)
        nextStep()
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Safety & Context</h2>
            <p className="text-gray-500 mb-8">Help others know what to expect on the ground.</p>

            <div className="space-y-8">
                {/* Feel Rating */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-1">How safe did it feel? (1-5)</label>
                    <div className="flex justify-between gap-2">
                        {RATINGS.map(r => (
                            <button
                                key={r}
                                onClick={() => setRating(r)}
                                className={`flex-1 aspect-square rounded-2xl border-2 font-black text-xl transition-all
                                    ${rating === r ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-md' : 'border-gray-100 bg-white text-gray-300 hover:border-gray-200'}
                                `}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Women Tips */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Tips for Women Travelers (Optional)</label>
                    <textarea
                        value={women}
                        onChange={(e) => setWomen(e.target.value)}
                        placeholder="e.g. Very safe, but avoid wandering alone after 10 PM in Varkala..."
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-blue-500 focus:bg-white transition-all"
                        rows={2}
                    />
                </div>

                {/* Scams */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Common Scams or Pitfalls (Optional)</label>
                    <textarea
                        value={scams}
                        onChange={(e) => setScams(e.target.value)}
                        placeholder="e.g. Autorickshaws might overcharge at the station, use Uber if possible..."
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium outline-none focus:border-red-500 focus:bg-white transition-all"
                        rows={2}
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button onClick={prevStep} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all">
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!rating}
                        className="flex-[2] bg-[#E07A3F] hover:bg-[#C96A32] disabled:bg-gray-200 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200"
                    >
                        Next: Places Visited
                    </button>
                </div>
            </div>
        </div>
    )
}
