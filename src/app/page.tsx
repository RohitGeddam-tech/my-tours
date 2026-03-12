// src/app/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Popular seed destinations shown as quick-tap chips
const FEATURED_DESTINATIONS = [
  { name: 'Goa', slug: 'goa', meta: '3–5 days' },
  { name: 'Manali', slug: 'manali', meta: '5–7 days' },
  { name: 'Ladakh', slug: 'ladakh', meta: '7–10 days' },
  { name: 'Kerala', slug: 'kerala', meta: '5–7 days' },
  { name: 'Coorg', slug: 'coorg', meta: '2–3 days' },
  { name: 'Dapoli', slug: 'dapoli', meta: '2 days' },
]

const TRUST_PILLS = [
  'Real trip costs',
  'Negotiated prices',
  'Ground-level tips',
  'No sponsored content',
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Auto-focus search on mount
  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSearch = (slug?: string) => {
    const target = slug ?? query.trim().toLowerCase().replace(/\s+/g, '-')
    if (!target) return
    router.push(`/destination/${target}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <span className="text-lg font-bold tracking-tight text-gray-900"
          style={{ fontFamily: "'Georgia', serif" }}>
          my<span className="text-[#E07A3F]">tours</span>
        </span>
        <a
          href="/upload"
          className="text-sm font-medium text-gray-600 hover:text-gray-900
                     border border-gray-300 hover:border-gray-500
                     px-4 py-1.5 rounded-full transition-colors duration-150"
        >
          + Share a trip
        </a>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <main className="flex flex-col items-center px-6 pt-16 pb-24">

        {/* Headline */}
        <div className="text-center mb-10 max-w-xl">
          <h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            What does this trip
            <br />
            <span className="text-[#E07A3F]">actually</span> cost?
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            Real itineraries. Real expenses. Real tips — from travelers
            who have already been there.
          </p>
        </div>

        {/* Trust pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TRUST_PILLS.map(pill => (
            <span
              key={pill}
              className="text-xs text-gray-500 bg-white border border-gray-200
                         px-3 py-1 rounded-full"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Search box */}
        <div className="w-full max-w-lg">
          <div
            className={`flex items-center gap-3 bg-white rounded-2xl px-5 py-4
                        border-2 transition-colors duration-150 shadow-sm
                        ${focused
                ? 'border-[#E07A3F] shadow-[0_0_0_4px_rgba(224,122,63,0.08)]'
                : 'border-gray-200'
              }`}
          >
            {/* Search icon */}
            <svg
              className={`w-5 h-5 flex-shrink-0 transition-colors duration-150
                          ${focused ? 'text-[#E07A3F]' : 'text-gray-400'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search a destination..."
              className="flex-1 bg-transparent text-gray-900 placeholder-gray-400
                         text-base outline-none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />

            {/* Clear button */}
            {query && (
              <button
                onClick={() => { setQuery(''); inputRef.current?.focus() }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <button
              onClick={() => handleSearch()}
              disabled={!query.trim()}
              className="bg-[#E07A3F] hover:bg-[#C96A32] disabled:bg-gray-200
                         text-white disabled:text-gray-400
                         text-sm font-semibold px-4 py-2 rounded-xl
                         transition-colors duration-150 flex-shrink-0"
            >
              Search
            </button>
          </div>
        </div>

        {/* ── Featured destinations ──────────────────────────────── */}
        <div className="w-full max-w-lg mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Hot right now</h2>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {FEATURED_DESTINATIONS.map(dest => (
              <button
                key={dest.slug}
                onClick={() => handleSearch(dest.slug)}
                className="group relative overflow-hidden bg-white border border-gray-100 hover:border-[#E07A3F] rounded-[24px] px-5 py-4 text-left transition-all duration-300 hover:shadow-xl hover:shadow-orange-900/5 hover:-translate-y-1"
              >
                <div className="flex flex-col relative z-10">
                  <span className="text-sm font-black text-gray-900 group-hover:text-[#E07A3F] transition-colors">
                    {dest.name}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                    {dest.meta}
                  </span>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-orange-50 rounded-full blur-2xl -mr-6 -mt-6 group-hover:bg-orange-100 transition-colors" />
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-900 rounded-[32px] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Editor's Pick</div>
              <h3 className="text-xl font-black mb-2">Spiti Valley — The Hidden Trail</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">"Carry cash, there are exactly two ATMs between Kaza and Manali."</p>
              <button
                onClick={() => handleSearch('spiti')}
                className="text-xs font-bold underline decoration-[#E07A3F] decoration-2 underline-offset-4 hover:text-[#E07A3F] transition-colors"
              >
                View full reality report →
              </button>
            </div>
          </div>
        </div>


        {/* ── Bottom CTA ─────────────────────────────────────────── */}
        <div className="mt-20 text-center">
          <p className="text-sm text-gray-400 mb-3">
            Just got back from a trip?
          </p>
          <a
            href="/upload"
            className="inline-flex items-center gap-2 text-sm font-semibold
                       text-[#E07A3F] hover:text-[#C96A32] transition-colors"
          >
            Share your itinerary
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between
                        text-xs text-gray-400">
          <span>© {new Date().getFullYear()} My Tours</span>
          <span>Real trips. Real costs.</span>
        </div>
      </footer>

    </div>
  )
}