import { createServerClient } from "@supabase/ssr";
import { type ClassValue, clsx } from "clsx";
import { NextRequest, NextResponse } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatINR(paise: number): string {
    const rupees = Math.round(paise / 100)
    if (rupees >= 100_000) return `₹${(rupees / 100_000).toFixed(1)}L`
    if (rupees >= 1_000) return `₹${Math.round(rupees / 1_000)}k`
    return `₹${rupees}`
}



export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    await supabase.auth.getUser()

    return supabaseResponse
}