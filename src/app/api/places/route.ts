// src/app/api/places/route.ts
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const input = searchParams.get('input')

    if (!input) return Response.json({ error: 'Missing input' }, { status: 400 })

    const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json` +
        `?input=${encodeURIComponent(input)}` +
        `&types=(cities)` +
        `&components=country:in` +                        // India only for Phase 1
        `&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`
    )

    const data = await res.json()
    return Response.json(data)
}