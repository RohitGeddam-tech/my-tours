import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Destination } from '@/lib/types'

interface DestinationCardProps {
  destination: Destination
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const formatBudget = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}k`
    }
    return amount.toString()
  }

  return (
    <Link href={`/destination/${destination.slug}`}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={destination.coverImage}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-semibold text-white mb-1">{destination.name}</h3>
            <p className="text-sm text-white/80 line-clamp-1">{destination.description}</p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              {destination.totalItineraries} itineraries
            </span>
            <Badge variant="secondary" className="text-xs">
              Rs {formatBudget(destination.avgBudget.min)} - {formatBudget(destination.avgBudget.max)}
            </Badge>
          </div>
          <div className="flex gap-2">
            {destination.budgetSpectrum.slice(0, 3).map((tier) => (
              <div 
                key={tier.level}
                className={`flex-1 rounded-full h-1.5 ${
                  tier.level === 'budget' 
                    ? 'bg-chart-1' 
                    : tier.level === 'mid-range' 
                      ? 'bg-chart-2' 
                      : 'bg-chart-4'
                }`}
                style={{ opacity: Math.min(1, tier.itineraryCount / 20 + 0.3) }}
              />
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}
