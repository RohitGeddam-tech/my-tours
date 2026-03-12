// src/store/uploadStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Tip {
    content: string
    tip_type: 'warning' | 'recommendation' | 'advice' | 'safety' | 'scam' | 'hack'
}

interface Expense {
    category: 'stay' | 'food' | 'travel' | 'activities' | 'other'
    amount: number       // in rupees (converted to paise on submit)
    price_type: 'fixed' | 'negotiated' | 'seasonal'
    negotiation_tip?: string
}

export interface UploadState {
    step: number
    // Step 1
    destination: string
    destination_slug: string
    cover_image: string
    // Step 2
    duration_days: number
    total_expense: number
    persona: string
    comfort_level: string
    travel_month: number
    travel_year: number
    // Step 3
    expenses: Expense[]
    // Step 4
    tips: Tip[]
    // Step 5
    safety_rating: number
    women_tips: string
    scam_alerts: string
    // Step 6
    places: any[]
    // Actions
    setStep: (step: number) => void
    nextStep: () => void
    prevStep: () => void
    setDestination: (dest: string) => void
    setDurationDays: (days: number) => void
    setTotalExpense: (total: number) => void
    setPersona: (persona: UploadState['persona']) => void
    setComfortLevel: (comfort: UploadState['comfort_level']) => void
    setField: (field: string, value: any) => void
    addTip: (tip: Tip) => void
    removeTip: (index: number) => void
    addExpense: (expense: Expense) => void
    removeExpense: (index: number) => void
    reset: () => void
}

const initialState = {
    step: 1,
    destination: '', destination_slug: '', cover_image: '',
    duration_days: 0, total_expense: 0,
    persona: 'solo', comfort_level: 'budget',
    travel_month: new Date().getMonth() + 1,
    travel_year: new Date().getFullYear(),
    expenses: [], tips: [],
    safety_rating: 0, women_tips: '', scam_alerts: '',
    places: [],
}

export const useUploadStore = create<UploadState>()(
    persist(
        (set) => ({
            ...initialState,
            setStep: (step) => set({ step }),
            nextStep: () => set((s) => ({ step: s.step + 1 })),
            prevStep: () => set((s) => ({ step: Math.max(1, s.step - 1) })),
            setDestination: (destination) => set({ destination, destination_slug: destination.toLowerCase().replace(/\s+/g, '-') }),
            setDurationDays: (duration_days) => set({ duration_days }),
            setTotalExpense: (total_expense) => set({ total_expense }),
            setPersona: (persona) => set({ persona }),
            setComfortLevel: (comfort_level) => set({ comfort_level }),
            setField: (field, value) => set({ [field]: value } as any),
            addTip: (tip) => set((s) => ({ tips: [...s.tips, tip] })),
            removeTip: (i) => set((s) => ({ tips: s.tips.filter((_, idx) => idx !== i) })),
            addExpense: (exp) => set((s) => ({ expenses: [...s.expenses, exp] })),
            removeExpense: (i) => set((s) => ({ expenses: s.expenses.filter((_, idx) => idx !== i) })),
            reset: () => set(initialState),
        }),
        { name: 'my-tours-upload-draft' }
    )
)
