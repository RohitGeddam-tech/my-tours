'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'

interface SearchBarProps {
  placeholder?: string
  className?: string
  size?: 'default' | 'lg'
}

export function SearchBar({ placeholder = 'Where do you want to go?', className = '', size = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/destination/${query.toLowerCase().trim()}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${
          size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
        }`} />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`pl-12 pr-24 ${
            size === 'lg' 
              ? 'h-14 text-lg rounded-full' 
              : 'h-11 rounded-full'
          }`}
        />
        <Button 
          type="submit" 
          size={size === 'lg' ? 'default' : 'sm'}
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full ${
            size === 'lg' ? 'px-6' : ''
          }`}
        >
          Search
        </Button>
      </div>
    </form>
  )
}
