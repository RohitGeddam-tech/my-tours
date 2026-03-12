// src/components/itinerary/SaveButton.tsx  (Client Component)
'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SaveButton({ itineraryId, initialSaved }: {
    itineraryId: string
    initialSaved: boolean
}) {
    const [saved, setSaved] = useState(initialSaved)
    const supabase = createClient()
    const router = useRouter()

    const handleSave = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            // Redirect to sign-in, return to this page after
            router.push(`/auth/signin?next=/itinerary/${itineraryId}`)
            return
        }

        const { data } = await supabase.rpc('toggle_save', {
            p_itinerary_id: itineraryId,
            p_user_id: user.id,
        })

        setSaved(data)
    }

    return (
        <button onClick={handleSave} className="...">
            {saved ? '🔖 Saved' : '+ Save'}
        </button>
    )
}