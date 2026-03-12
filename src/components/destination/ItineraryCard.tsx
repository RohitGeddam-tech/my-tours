// src/components/destination/ItineraryCard.tsx
import Link from 'next/link'

// Matches the Supabase select shape from destination/[slug]/page.tsx
export type Tip = {
    content: string
    tip_type: 'warning' | 'recommendation' | 'advice' | 'safety' | 'scam' | 'hack'
}


export type ItineraryCardData = {
    id: string
    duration_days: number
    total_expense: number   // paise
    persona: 'solo' | 'couple' | 'family' | 'friends' | 'pet'
    comfort_level: 'budget' | 'midrange' | 'luxury'
    travel_month: number | null
    travel_year: number | null
    quality_tier: 'basic' | 'silver' | 'gold' | 'platinum'
    view_count: number
    save_count: number
    created_at: string
    tips: Tip[]
    destinations?: {
        name: string
        slug: string
    }
}

type Props = {
    itinerary: ItineraryCardData
    showDestination?: boolean
}

// ── Formatters ────────────────────────────────────────────────────────────────

function formatINR(paise: number): string {
    const rupees = Math.round(paise / 100)
    if (rupees >= 100_000) return `₹${(rupees / 100_000).toFixed(1)}L`
    if (rupees >= 1_000) return `₹${Math.round(rupees / 1_000)}k`
    return `₹${rupees}`
}

const MONTH_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function formatTravelDate(month: number | null, year: number | null): string | null {
    if (!month || !year) return null
    return `${MONTH_SHORT[month - 1]} ${year}`
}

// ── Display maps ──────────────────────────────────────────────────────────────

const PERSONA_LABEL: Record<ItineraryCardData['persona'], string> = {
    solo: 'Solo',
    couple: 'Couple',
    family: 'Family',
    friends: 'Friends',
    pet: 'Pet-friendly',
}

const COMFORT_CONFIG: Record<
    ItineraryCardData['comfort_level'],
    { emoji: string; label: string; bg: string; text: string }
> = {
    budget: { emoji: '🟢', label: 'Budget', bg: 'bg-green-50', text: 'text-green-700' },
    midrange: { emoji: '🟡', label: 'Mid-range', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    luxury: { emoji: '🔴', label: 'Luxury', bg: 'bg-red-50', text: 'text-red-700' },
}

const QUALITY_CONFIG: Record<
    ItineraryCardData['quality_tier'],
    { label: string; bg: string; text: string } | null
> = {
    basic: null,   // no badge for basic
    silver: { label: '🥈 Silver', bg: 'bg-gray-100', text: 'text-gray-600' },
    gold: { label: '🥇 Gold', bg: 'bg-amber-50', text: 'text-amber-700' },
    platinum: { label: '⭐ Platinum', bg: 'bg-purple-50', text: 'text-purple-700' },
}

const TIP_TYPE_ICON: Record<Tip['tip_type'], string> = {
    warning: '⚠️',
    recommendation: '💡',
    advice: '✅',
    safety: '🔒',
    scam: '🚨',
    hack: '🧠',
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ItineraryCard({ itinerary, showDestination = false }: Props) {
    const {
        id, duration_days, total_expense, persona, comfort_level,
        travel_month, travel_year, quality_tier, view_count, save_count, tips,
        destinations
    } = itinerary

    const comfort = COMFORT_CONFIG[comfort_level]
    const quality = QUALITY_CONFIG[quality_tier]
    const travelDate = formatTravelDate(travel_month, travel_year)

    // Show at most 2 tips on the card — prefer warnings and hacks first
    const PRIORITY_ORDER: Tip['tip_type'][] = ['warning', 'scam', 'hack', 'safety', 'recommendation', 'advice']
    const previewTips = [...tips]
        .sort((a, b) => PRIORITY_ORDER.indexOf(a.tip_type) - PRIORITY_ORDER.indexOf(b.tip_type))
        .slice(0, 1) // On card we only show 1 high-priority tip now for cleaner look

    return (
        <Link
            href={`/itinerary/${id}`}
            className="group relative bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-2xl hover:shadow-orange-900/10 transition-all duration-500 hover:-translate-y-1 block overflow-hidden"
        >
            {/* Hover Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E07A3F]/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-3xl font-black text-gray-900 tracking-tighter">
                                {formatINR(total_expense)}
                            </span>
                            <span className="text-xs font-black text-gray-300 uppercase tracking-widest pt-2">
                                / {duration_days} Days
                            </span>
                        </div>
                        {showDestination && destinations && (
                            <div className="text-[10px] font-black text-[#E07A3F] uppercase tracking-[0.2em] mb-1">
                                {destinations.name}
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                {PERSONA_LABEL[persona]} Trip
                            </span>
                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                {travelDate || 'Anytime'}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                        <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border
                            ${comfort.bg} ${comfort.text} border-transparent group-hover:border-current transition-colors
                        `}>
                            {comfort.emoji} {comfort.label}
                        </span>
                        {quality && (
                            <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border
                                ${quality.bg} ${quality.text} border-transparent
                            `}>
                                {quality.label}
                            </span>
                        )}
                    </div>
                </div>

                {previewTips.length > 0 && (
                    <div className="mb-6 bg-gray-50/50 rounded-2xl p-4 border border-gray-50 group-hover:bg-white group-hover:border-gray-100 transition-colors">
                        <div className="flex items-start gap-3">
                            <span className="text-xl shrink-0 mt-0.5">{TIP_TYPE_ICON[previewTips[0].tip_type]}</span>
                            <p className="text-sm font-bold text-gray-700 leading-relaxed italic">
                                "{previewTips[0].content}"
                            </p>
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-black text-gray-900">{view_count.toLocaleString()}</span>
                            <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">Views</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-[10px] font-black text-gray-900">{save_count.toLocaleString()}</span>
                            <span className="text-[8px] font-black text-gray-300 uppercase tracking-tighter">Saves</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black text-[#E07A3F] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transform duration-300">
                        View Itinerary
                        <span className="text-sm">→</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
