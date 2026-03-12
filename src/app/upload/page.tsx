'use client'
import { useUploadStore } from '@/store/uploadStore'
import UploadShell from '@/components/upload/UploadShell'
import Step1Destination from '@/components/upload/steps/Step1Destination'
import Step2Basics from '@/components/upload/steps/Step2Basics'
import Step3Expenses from '@/components/upload/steps/Step3Expenses'
import Step4Tips from '@/components/upload/steps/Step4Tips'
import Step5Safety from '@/components/upload/steps/Step5Safety'
import Step6Details from '@/components/upload/steps/Step6Details'
import { useEffect, useState } from 'react'

export default function UploadPage() {
    const { step } = useUploadStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <UploadShell>
            {step === 1 && <Step1Destination />}
            {step === 2 && <Step2Basics />}
            {step === 3 && <Step3Expenses />}
            {step === 4 && <Step4Tips />}
            {step === 5 && <Step5Safety />}
            {step === 6 && <Step6Details />}
        </UploadShell>
    )
}

