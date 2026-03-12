// src/app/api/images/unsplash/route.ts
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')

    if (!query) return Response.json({ error: 'Missing query' }, { status: 400 })

    const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` } }
    )

    const data = await res.json()
    const url = data.results?.[0]?.urls?.regular ?? null

    return Response.json({ url })
}