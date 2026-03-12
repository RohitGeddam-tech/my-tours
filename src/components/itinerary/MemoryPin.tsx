// src/components/itinerary/MemoryPin.tsx
import { formatINR } from '@/lib/utils'

type MemoryPinProps = {
    name: string
    notes?: string
    amount_paid?: number
    rating?: number
    image_url?: string
}

export default function MemoryPin({ name, notes, amount_paid, rating, image_url }: MemoryPinProps) {
    return (
        <div className="relative group bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
            {/* Visual Header */}
            <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                {image_url ? (
                    <img
                        src={image_url}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                        📍
                    </div>
                )}

                {/* Rating Badge */}
                {rating && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white shadow-lg flex items-center gap-1.5">
                        <span className="text-xs font-black text-gray-900">{rating}</span>
                        <span className="text-[10px]">⭐</span>
                    </div>
                )}

                {/* Price Badge */}
                {amount_paid && (
                    <div className="absolute bottom-4 left-4 bg-[#E07A3F]/90 backdrop-blur-sm px-3 py-1.5 rounded-2xl border border-white/20 text-white shadow-lg">
                        <span className="text-xs font-black">{formatINR(amount_paid)}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-black text-gray-900 mb-2 group-hover:text-[#E07A3F] transition-colors line-clamp-1">
                    {name}
                </h3>
                {notes && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 italic font-medium">
                        "{notes}"
                    </p>
                )}

                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Memory Pin</span>
                    </div>
                    <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">
                        Save Spot +
                    </button>
                </div>
            </div>
        </div>
    )
}
