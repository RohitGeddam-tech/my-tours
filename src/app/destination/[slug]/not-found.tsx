import Link from 'next/link'

export default function DestinationNotFound() {
    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
            {/* ── Sub-Nav ────────────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 glass border-b border-gray-100/50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="text-sm font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
                        ← Hub
                    </Link>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-12 w-full">
                <div className="bg-white border-2 border-dashed border-gray-100 rounded-[32px] p-12 md:p-20 text-center w-full max-w-2xl shadow-sm">
                    <div className="text-6xl mb-6">🗺️</div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        Destination Not Found
                    </h1>
                    <p className="text-lg text-gray-500 font-medium mb-10 max-w-md mx-auto">
                        Looks like this destination hasn't been added to our map yet, or the link is broken.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="inline-block bg-[#E07A3F] text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-orange-900/10 hover:-translate-y-1 transition-all uppercase tracking-widest text-sm"
                        >
                            Return to Hub
                        </Link>
                        <Link
                            href="/upload"
                            className="inline-block bg-white text-gray-900 border-2 border-gray-100 font-black px-8 py-4 rounded-2xl hover:bg-gray-50 hover:border-gray-200 transition-all uppercase tracking-widest text-sm"
                        >
                            Add Location
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
