// src/components/itinerary/TipList.tsx
import type { Tip } from '../destination/ItineraryCard'


const TIP_TYPE_ICON: Record<Tip['tip_type'], string> = {
    warning: '⚠️',
    recommendation: '💡',
    advice: '✅',
    safety: '🔒',
    scam: '🚨',
    hack: '🧠',
}

const TIP_TYPE_LABEL: Record<Tip['tip_type'], string> = {
    warning: 'Warning',
    recommendation: 'Recommendation',
    advice: 'Advice',
    safety: 'Safety Note',
    scam: 'Scam Alert',
    hack: 'Local Hack',
}

export default function TipList({ tips }: { tips: Tip[] }) {
    if (!tips?.length) return null

    return (
        <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>Travel Tips</span>
                <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {tips.length}
                </span>
            </h2>
            <div className="grid gap-4">
                {tips.map((tip, i) => (
                    <div
                        key={i}
                        className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-2xl mt-1">{TIP_TYPE_ICON[tip.tip_type]}</div>
                            <div className="flex-1">
                                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                                    {TIP_TYPE_LABEL[tip.tip_type]}
                                </div>
                                <p className="text-gray-800 leading-relaxed font-medium">
                                    {tip.content}
                                </p>
                            </div>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-100 hover:border-[#E07A3F] hover:text-[#E07A3F] transition-all group">
                                <span className="text-sm group-hover:scale-110 transition-transform">👍</span>
                                <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#E07A3F] uppercase tracking-wider">Helpful</span>
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
