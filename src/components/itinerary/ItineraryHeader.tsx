export default function ItineraryHeader({ title }: { title: string }) {
    return (
        <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-900 leading-tight">{title}</h1>
            <div className="flex items-center mt-4 space-x-6 text-sm text-slate-500 font-medium">
                <span>7 Days</span>
                <span>$1,200 - $1,800</span>
            </div>
        </div>
    );
}
