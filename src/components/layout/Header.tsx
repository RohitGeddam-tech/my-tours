

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MapPin, Plus, User, LogOut, Bookmark, FileText } from 'lucide-react'
import AuthButton from '../auth/AuthButton'
import { createClient } from '@/lib/supabase/client'

export async function Header() {
    // const pathname = usePathname()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    console.log(user)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <MapPin className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-gray-900"
                            style={{ fontFamily: "'Georgia', serif" }}>
                            MY<span className="text-[#E07A3F]">Tours</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors hover:text-primary 
                                }`}
                        >
                            Explore
                        </Link>
                        <Link
                            href="/destinations"
                            className={`text-sm font-medium transition-colors hover:text-primary 
                                }`}
                        >
                            Destinations
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/create">
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Share Trip</span>
                        </Button>
                    </Link>

                    <DropdownMenu>
                        {user ? (
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" />
                                        <AvatarFallback>RS</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                        ) : (
                            <AuthButton user={user} />
                        )}
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem asChild>
                                <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                                    <User className="h-4 w-4" />
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/profile?tab=trips" className="flex items-center gap-2 cursor-pointer">
                                    <FileText className="h-4 w-4" />
                                    My Trips
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/profile?tab=saved" className="flex items-center gap-2 cursor-pointer">
                                    <Bookmark className="h-4 w-4" />
                                    Saved
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
