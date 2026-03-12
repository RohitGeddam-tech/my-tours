import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { formatINR } from '@/lib/utils'
import ExpenseBreakdown from '@/components/itinerary/ExpenseBreakdown'

import TipList from '@/components/itinerary/TipList'
import SafetyNotes from '@/components/itinerary/SafetyNotes'
import MemoryPin from '@/components/itinerary/MemoryPin'
import Link from 'next/link'

import PrintButton from '@/components/itinerary/PrintButton'

export default async function ItineraryPage({ params }: { params: { id: string } }) {
    const userSupabase = createClient()

    const { data: itinerary } = await userSupabase
        .from('itineraries')
        .select(`
            *,
            destinations (name, slug),
            expenses (*),
            tips (*),
            safety_notes (*),
            places (*)
        `)
        .eq('id', params.id)
        .single()

    if (!itinerary) notFound()

    const safety = itinerary.safety_notes?.[0]
    const destination = itinerary.destinations

    if (!destination) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Trip Data Incomplete</h1>
                    <p className="text-gray-500 mb-6">We couldn't load the destination details for this trip.</p>
                    <Link href="/" className="text-[#E07A3F] font-bold hover:underline">Return to Hub</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAF8F5] pb-20">
            {/* ── Header / Breadcrumb ────────────────────────────────────── */}
            <div className="max-w-2xl mx-auto px-6 pt-8">
                <Link
                    href={`/destination/${destination.slug}`}
                    className="text-xs font-bold uppercase tracking-widest text-[#E07A3F] hover:underline flex items-center gap-1 mb-4"
                >
                    ← Back to {destination.name}
                </Link>

                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-4xl font-black text-gray-900 leading-tight">
                        {destination.name} trip
                    </h1>
                    <PrintButton />
                </div>


                <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <span>{itinerary.duration_days} Days</span>
                    <span>·</span>
                    <span className="capitalize">{itinerary.persona}</span>
                    <span>·</span>
                    <span className="capitalize">{itinerary.comfort_level}</span>
                </div>
            </div>

            {/* ── Content ────────────────────────────────────────────────── */}
            <div className="max-w-2xl mx-auto px-6">
                <ExpenseBreakdown
                    expenses={itinerary.expenses}
                    total={itinerary.total_expense}
                />

                <TipList tips={itinerary.tips} />

                {safety && (
                    <SafetyNotes
                        rating={safety.safety_rating}
                        womenTips={safety.women_tips}
                        scamAlerts={safety.scam_alerts}
                    />
                )}

                {/* ── Places Visited ────────────────────────────────────────── */}
                {itinerary.places?.length > 0 && (
                    <section className="mt-12">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-gray-900">Places Visited</h2>
                            <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 shadow-sm">
                                {itinerary.places.length} Total
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {itinerary.places.map((place: any) => (
                                <MemoryPin
                                    key={place.id}
                                    name={place.name}
                                    notes={place.notes}
                                    amount_paid={place.amount_paid}
                                    rating={place.rating}
                                    image_url={place.image_url}
                                />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    )
}

