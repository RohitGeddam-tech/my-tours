import { createClient } from '@/lib/supabase/server'
import { extractSignals } from '@/lib/signals'

const SIGNAL_ICONS: Record<string, string> = {
    payments: '💳',
    network: '🌐',
    crowds: '👥',
    scams: '🚨',
    atms: '🏧',
    oxygen_risk: '🫁',
    roads: '🛣️',
    night_safety: '🌙',
}

export async function RealitySnapshot({ destinationId }: { destinationId: string }) {
    const userSupabase = createClient()

    // Fetch all tips for this destination across all itineraries
    const { data: tips } = await userSupabase
        .from('tips')
        .select(`
            content, 
            created_at,
            itineraries!inner (destination_id)
        `)
        .eq('itineraries.destination_id', destinationId)

    const signals = extractSignals(tips ?? [])

    if (!signals.length) return null

    return (
        <section className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xl shadow-orange-900/5 mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-black text-gray-900 leading-tight">Reality Layer</h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Aggregated from traveler tips</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full border border-green-100 animate-pulse">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter">Live</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {signals.map(s => (
                    <div
                        key={s.key}
                        className="group flex items-center justify-between p-3.5 bg-gray-50/50 hover:bg-white border border-gray-50 hover:border-gray-100 rounded-2xl transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                                {SIGNAL_ICONS[s.key] || '📍'}
                            </span>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                                    {s.label}
                                </span>
                                <span className="text-sm font-bold text-gray-800 leading-none">
                                    {s.value}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                            <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter
                                ${s.confidence === 'high' ? 'bg-emerald-100 text-emerald-700' :
                                    s.confidence === 'medium' ? 'bg-amber-100 text-amber-700' :
                                        'bg-gray-200 text-gray-500'}
                            `}>
                                {s.confidence}
                            </div>
                            <span className="text-[8px] font-bold text-gray-300 mt-1 uppercase">
                                {s.report_count} Reports
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Verified by our smart signals engine</span>
                <span className="w-1 h-1 bg-gray-200 rounded-full" />
                <span className="text-[#E07A3F] italic underline decoration-dotted">Learn more</span>
            </div>
        </section>
    )
}
