'use client'
import { useUploadStore } from '@/store/uploadStore'
import QualityMeter from './QualityMeter'
import { computeQualityScore } from '@/lib/quality'

export default function UploadShell({ children }: { children: React.ReactNode }) {
    const state = useUploadStore()
    const score = computeQualityScore(state)

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#FAF8F5] py-12 px-6">
            <div className="max-w-xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <QualityMeter score={score} />
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        Step {state.step} of 6
                    </div>
                </div>

                <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-gray-100 shadow-xl shadow-orange-900/5 min-h-[500px] flex flex-col justify-center">
                    {children}
                </div>

                <p className="text-center text-xs text-gray-400 mt-12 font-medium">
                    Your drafts are saved automatically to your device.
                </p>
            </div>
        </div>
    )
}

