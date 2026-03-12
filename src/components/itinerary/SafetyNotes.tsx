// src/components/itinerary/SafetyNotes.tsx
import { cn } from '@/lib/utils'

type SafetyProps = {
    rating: number
    womenTips?: string
    scamAlerts?: string
}

export default function SafetyNotes({ rating, womenTips, scamAlerts }: SafetyProps) {
    if (!rating && !womenTips && !scamAlerts) return null

    return (
        <section className="mt-8 bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

            <div className="flex items-center justify-between mb-6 relative">
                <h2 className="text-xl font-bold">Safety & Context</h2>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Feel Rating</span>
                    <span className="text-lg font-black text-blue-400">{rating}/5</span>
                </div>
            </div>

            <div className="space-y-6 relative">
                {womenTips && (
                    <div className="flex gap-4">
                        <div className="w-10 h-10 bg-pink-500/20 rounded-2xl flex items-center justify-center shrink-0 text-xl">👩</div>
                        <div>
                            <h3 className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-1">Women-only Insight</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">{womenTips}</p>
                        </div>
                    </div>
                )}

                {scamAlerts && (
                    <div className="flex gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                        <div className="w-10 h-10 bg-red-500/20 rounded-2xl flex items-center justify-center shrink-0 text-xl">🚨</div>
                        <div>
                            <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-1">Watch Out / Scams</h3>
                            <p className="text-white text-sm leading-relaxed font-medium">{scamAlerts}</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
