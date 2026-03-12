'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthButton({ user }: { user: any }) {
    const supabase = createClient()
    const router = useRouter()

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                    onClick={handleSignOut}
                    className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        )
    }

    return (
        <button
            onClick={handleSignIn}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
            Sign In with Google
        </button>
    )
}
