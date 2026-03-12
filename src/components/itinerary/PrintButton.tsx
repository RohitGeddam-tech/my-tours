'use client'

export default function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="no-print p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-xl"
            title="Download for offline use"
        >
            🖨️
        </button>
    )
}
