export default function QualityMeter({ score }: { score: number }) {
    return (
        <div className="flex items-center space-x-2">
            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${score}%` }} />
            </div>
            <span className="text-xs font-bold text-emerald-600">{score}% Quality</span>
        </div>
    );
}
