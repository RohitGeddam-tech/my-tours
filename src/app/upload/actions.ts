// src/app/upload/actions.ts  (Server Action)
'use server'

import { createClient } from '@/lib/supabase/server'
import { computeQualityScore } from '@/lib/quality'
import { redirect } from 'next/navigation'

export async function submitItinerary(formData: any) {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return { error: 'Not authenticated' }

        const qualityScore = computeQualityScore(formData)

        // 1. Get or Create Destination
        let { data: dest, error: destError } = await supabase
            .from('destinations')
            .select('id')
            .eq('slug', formData.destination_slug)
            .maybeSingle()

        if (destError) {
            console.error('Destination fetch error:', destError)
            return { error: 'Error checking for destination' }
        }

        if (!dest) {
            // Create it if it doesn't exist
            const { data: newDest, error: insertError } = await supabase
                .from('destinations')
                .insert({
                    name: formData.destination,
                    slug: formData.destination_slug,
                    cover_image: formData.cover_image
                })
                .select('id')
                .single()

            if (insertError) {
                console.error('Destination insert error:', insertError)
                return { error: `Failed to create destination "${formData.destination}": ${insertError.message}` }
            }
            dest = newDest
        }

        if (!dest?.id) {
            return { error: 'Destination ID not found' }
        }


        // 2. Insert itinerary
        const { data: itinerary, error: itinError } = await supabase
            .from('itineraries')
            .insert({
                user_id: user.id,
                destination_id: dest.id,
                duration_days: formData.duration_days,
                total_expense: formData.total_expense * 100,   // convert to paise
                persona: formData.persona,
                comfort_level: formData.comfort_level,
                travel_month: formData.travel_month,
                travel_year: formData.travel_year,
                quality_score: qualityScore,
                published: true,
            })
            .select('id')
            .single()

        if (itinError || !itinerary) {
            console.error('Itinerary insert error:', itinError)
            return { error: 'Failed to create itinerary' }
        }

        // Parallel inserts for sub-tables
        const tasks = []

        // 3. Insert expenses
        if (formData.expenses?.length) {
            tasks.push(supabase.from('expenses').insert(
                formData.expenses.map((e: any) => ({
                    itinerary_id: itinerary.id,
                    category: e.category,
                    amount: Math.round(e.amount * 100),
                    price_type: e.price_type,
                    negotiation_tip: e.negotiation_tip,
                }))
            ))
        }

        // 4. Insert tips
        if (formData.tips?.length) {
            tasks.push(supabase.from('tips').insert(
                formData.tips.map((t: any) => ({
                    itinerary_id: itinerary.id,
                    content: t.content,
                    tip_type: t.tip_type,
                }))
            ))
        }

        // 5. Insert safety note
        if (formData.safety_rating) {
            tasks.push(supabase.from('safety_notes').insert({
                itinerary_id: itinerary.id,
                safety_rating: formData.safety_rating,
                women_tips: formData.women_tips,
                scam_alerts: formData.scam_alerts,
            }))
        }

        // 6. Insert places
        if (formData.places?.length) {
            tasks.push(supabase.from('places').insert(
                formData.places.map((p: any) => ({
                    itinerary_id: itinerary.id,
                    place_type: p.place_type || 'landmark',
                    name: p.name,
                    google_place_id: p.google_place_id,
                    image_url: p.image_url,
                    rating: p.rating,
                    amount_paid: p.amount_paid ? Math.round(p.amount_paid * 100) : null,
                    price_type: p.price_type || 'fixed',
                    negotiation_tip: p.negotiation_tip,
                    timing: p.timing,
                    notes: p.notes,
                }))
            ))
        }

        await Promise.all(tasks)

        return { id: itinerary.id }
    } catch (err) {
        console.error('Submit Itinerary Fatal Error:', err)
        return { error: 'An unexpected error occurred while publishing your trip' }
    }
}

