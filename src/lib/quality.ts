// src/lib/quality.ts
import type { UploadState } from '@/store/uploadStore'

export function computeQualityScore(state: Partial<UploadState>): number {
    let score = 0

    if ((state.total_expense ?? 0) > 0) score += 20
    if ((state.tips?.length ?? 0) >= 2) score += 20
    if ((state.expenses?.length ?? 0) > 0) score += 15
    if ((state.tips?.length ?? 0) >= 4) score += 10
    if ((state.places?.length ?? 0) > 0) score += 10
    if (state.expenses?.some(e => e.negotiation_tip)) score += 10
    if ((state.safety_rating ?? 0) > 0) score += 5

    return Math.min(score, 100)
}

export type QualityTier = 'basic' | 'silver' | 'gold' | 'platinum'

export function getQualityTier(score: number): QualityTier {
    if (score >= 80) return 'platinum'
    if (score >= 60) return 'gold'
    if (score >= 40) return 'silver'
    return 'basic'
}

export function getNextUnlock(score: number): string {
    if (score < 40) return 'Add an expense breakdown → reach Silver 🥈'
    if (score < 60) return 'Add 2 more tips → reach Gold 🥇'
    if (score < 80) return 'Add a Local Hack → reach Platinum ⭐'
    return 'Maximum quality reached ⭐'
}