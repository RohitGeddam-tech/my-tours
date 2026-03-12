// src/components/itinerary/ViewTracker.tsx
'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function ViewTracker({ itineraryId }: { itineraryId: string }) {
    useEffect(() => {
        const supabase = createClient()
        supabase.rpc('increment_view', { p_itinerary_id: itineraryId })
    }, [itineraryId])

    return null
}