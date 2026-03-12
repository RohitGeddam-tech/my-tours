// src/components/upload/steps/Step6Details.tsx
'use client'
import { useUploadStore } from '@/store/uploadStore'
import { useState } from 'react'
import { submitItinerary } from '@/app/upload/actions'
import { useRouter } from 'next/navigation'

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

const YEARS = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

export default function Step6Details() {
    const state = useUploadStore()
    const { prevStep, reset, places, setField, travel_month, travel_year } = state
    const [submitting, setSubmitting] = useState(false)
    const [fetchingImage, setFetchingImage] = useState(false)
    const router = useRouter()

    const [placeName, setPlaceName] = useState('')
    const [placeNotes, setPlaceNotes] = useState('')
    const [placeRating, setPlaceRating] = useState(5)
    const [placePrice, setPlacePrice] = useState('')

    const handleAddPlace = async () => {
        if (!placeName) return
        setFetchingImage(true)

        let imageUrl = ''
        try {
            const res = await fetch(`/api/images/unsplash?query=${encodeURIComponent(placeName)}`)
            const data = await res.json()
            imageUrl = data.url || ''
        } catch (err) {
            console.error('Failed to fetch image:', err)
        }

        const newPlace = {
            name: placeName,
            notes: placeNotes,
            rating: placeRating,
            amount_paid: placePrice ? Number(placePrice) : null,
            image_url: imageUrl,
            place_type: 'landmark' // default
        }

        setField('places', [...places, newPlace])
        setPlaceName('')
        setPlaceNotes('')
        setPlaceRating(5)
        setPlacePrice('')
        setFetchingImage(false)
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const payload = {
                ...state
            }
            // Ensure we don't pass functions if any are in the state
            delete (payload as any).setStep
            delete (payload as any).nextStep
            delete (payload as any).prevStep
            delete (payload as any).setDestination
            delete (payload as any).setDurationDays
            delete (payload as any).setTotalExpense
            delete (payload as any).setPersona
            delete (payload as any).setComfortLevel
            delete (payload as any).setField
            delete (payload as any).addTip
            delete (payload as any).removeTip
            delete (payload as any).addExpense
            delete (payload as any).removeExpense
            delete (payload as any).reset

            const result = await submitItinerary(payload) as { id: string, error?: string }
            if (result?.error) {
                alert(result.error)
            } else if (result?.id) {
                reset()
                router.push(`/itinerary/${result.id}`)
            }
        } catch (err) {
            console.error(err)
            alert('Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Final Polish</h2>
            <p className="text-gray-500 mb-8 font-medium">When did you travel and what did you see?</p>

            <div className="space-y-8">
                {/* Travel Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Month</label>
                        <select
                            value={travel_month}
                            onChange={(e) => setField('travel_month', Number(e.target.value))}
                            className="w-full bg-white border-2 border-gray-100 rounded-2xl px-4 py-3 font-bold focus:border-[#E07A3F] outline-none appearance-none cursor-pointer"
                        >
                            {MONTHS.map((m, i) => (
                                <option key={m} value={i + 1}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Year</label>
                        <select
                            value={travel_year}
                            onChange={(e) => setField('travel_year', Number(e.target.value))}
                            className="w-full bg-white border-2 border-gray-100 rounded-2xl px-4 py-3 font-bold focus:border-[#E07A3F] outline-none appearance-none cursor-pointer"
                        >
                            {YEARS.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Places Visited Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Places Visited</label>
                        <span className="text-[10px] font-black text-[#E07A3F] bg-orange-50 px-2 py-0.5 rounded-full">{places.length} Added</span>
                    </div>

                    {/* List */}
                    <div className="space-y-3 mb-6">
                        {places.map((p, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm group">
                                {p.image_url ? (
                                    <img src={p.image_url} alt={p.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                                ) : (
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">📍</div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-gray-900 truncate">{p.name}</div>
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                        <span>{'⭐'.repeat(p.rating)}</span>
                                        {p.amount_paid && <span>· ₹{p.amount_paid}</span>}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setField('places', places.filter((_, idx) => idx !== i))}
                                    className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                                >✕</button>
                            </div>
                        ))}
                    </div>

                    {/* Add New Place Form */}
                    <div className="bg-gray-50 border-2 border-gray-100 rounded-[32px] p-6">
                        <input
                            type="text"
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                            placeholder="Place name (e.g. Revdanda Fort)"
                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-[#E07A3F] mb-4 shadow-sm"
                        />

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Rating</label>
                                <select
                                    value={placeRating}
                                    onChange={(e) => setPlaceRating(Number(e.target.value))}
                                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-[#E07A3F]"
                                >
                                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Entry/Spend (₹)</label>
                                <input
                                    type="number"
                                    value={placePrice}
                                    onChange={(e) => setPlacePrice(e.target.value)}
                                    placeholder="0"
                                    className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-2 text-sm font-bold outline-none focus:border-[#E07A3F]"
                                />
                            </div>
                        </div>

                        <textarea
                            value={placeNotes}
                            onChange={(e) => setPlaceNotes(e.target.value)}
                            placeholder="Pro-tip or special memory about this place..."
                            className="w-full bg-white border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E07A3F] mb-4 shadow-sm"
                            rows={2}
                        />
                        <button
                            onClick={handleAddPlace}
                            disabled={!placeName || fetchingImage}
                            className="w-full bg-white border-2 border-[#E07A3F] text-[#E07A3F] font-black py-3 rounded-2xl hover:bg-[#E07A3F] hover:text-white transition-all shadow-md shadow-orange-100 disabled:opacity-50"
                        >
                            {fetchingImage ? '✨ Fetching image...' : '+ Add Place'}
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 pt-12">
                    <button onClick={prevStep} disabled={submitting} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 rounded-2xl transition-all">
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                    >
                        {submitting ? 'Publishing...' : 'Publish Trip →'}
                    </button>
                </div>
            </div>
        </div>
    )
}
