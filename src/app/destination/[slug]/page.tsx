import { createClient } from '@/lib/supabase/server'
import BudgetSpectrum from '@/components/destination/BudgetSpectrum'
import { RealitySnapshot } from '@/components/destination/RealitySnapshot'
import ItineraryCard from '@/components/destination/ItineraryCard'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function DestinationPage({
    params,
}: {
    params: { slug: string }
}) {
    const userSupabase = createClient()

    const { data: destination } = await userSupabase
        .from('destinations')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!destination) notFound()

    const { data: itineraries } = await userSupabase
        .from('itineraries')
        .select(`
            id, duration_days, total_expense, persona, comfort_level,
            travel_month, travel_year, quality_tier, view_count, save_count,
            created_at,
            tips (content, tip_type)
        `)
        .eq('destination_id', destination.id)
        .eq('published', true)
        .order('quality_score', { ascending: false })
        .order('created_at', { ascending: false })

    const { data: spectrum } = await userSupabase
        .rpc('get_budget_spectrum', { dest_slug: params.slug })

    return (
        <div className="min-h-screen bg-[#FAF8F5]">
            {/* ── Sub-Nav ────────────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 glass border-b border-gray-100/50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                        ← Hub
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">{destination.name}</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* ── Header ─────────────────────────────────────────────── */}
                <div className="mb-12">
                    <div className="flex items-baseline gap-4 mb-2">
                        <h1 className="text-5xl font-black text-gray-900 leading-tight tracking-tight">
                            {destination.name}
                        </h1>
                        <span className="text-sm font-bold text-gray-300 uppercase tracking-widest italic pt-1">
                            Reality Report
                        </span>
                    </div>
                    <p className="text-lg text-gray-500 font-medium">
                        Real itineraries and ground-level insights from fellow travelers.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── Sidebar: Reality & Budget ── */}
                    <div className="lg:col-span-1 space-y-6">
                        <RealitySnapshot destinationId={destination.id} />
                        <BudgetSpectrum data={spectrum} />
                    </div>

                    {/* ── Main: Itineraries ── */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black text-gray-900">Featured Itineraries</h2>
                            <div className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
                                {itineraries?.length || 0} Reports
                            </div>
                        </div>

                        {itineraries && itineraries.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6">
                                {itineraries.map((i: any) => (
                                    <ItineraryCard key={i.id} itinerary={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border-2 border-dashed border-gray-100 rounded-[32px] p-20 text-center">
                                <div className="text-4xl mb-4">🎒</div>
                                <h3 className="text-lg font-black text-gray-900 mb-2">No reports yet</h3>
                                <p className="text-sm text-gray-500 mb-8">Be the first one to share your {destination.name} trip!</p>
                                <Link
                                    href="/upload"
                                    className="inline-block bg-[#E07A3F] text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-orange-900/10 hover:-translate-y-1 transition-all"
                                >
                                    Share Itinerary +
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export const revalidate = 600
