import { Header } from '@/components/layout/Header'
import { SearchBar } from '@/components/search/SearchBar'
import { DestinationCard } from '@/components/search/DestinationCard'
import ItineraryCard from '@/components/destination/ItineraryCard'
import { createClient } from '@/lib/supabase/server'
import { MapPin, TrendingUp, Wallet, Lightbulb } from 'lucide-react'

export default async function HomePage() {
  const supabase = createClient()

  // Fetch Featured Destinations
  const { data: featuredDestinations } = await supabase
    .from('destinations')
    .select('*')
    .limit(6)

  // Fetch Trending Itineraries
  const { data: trendingItineraries } = await supabase
    .from('itineraries')
    .select(`
      id, duration_days, total_expense, persona, comfort_level,
      travel_month, travel_year, quality_tier, view_count, save_count,
      created_at,
      tips (content, tip_type),
      destinations (name, slug)
    `)
    .eq('published', true)
    .order('view_count', { ascending: false })
    .limit(4)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center font-serif">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Plan trips with <span className="text-primary">real expenses</span> from real travelers
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty font-sans">
              No more guessing. See actual costs, practical tips, and street-smart advice from people who have already been there.
            </p>
            <SearchBar size="lg" className="max-w-xl mx-auto font-sans" />
            
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground font-sans">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {featuredDestinations?.length || 0} destinations
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                280+ real itineraries
              </span>
              <span className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                1,200+ tips shared
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Real Trip Expenses</h3>
              <p className="text-muted-foreground text-sm">
                See actual cost breakdowns from travelers - stay, food, travel, and activities.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Ground-Level Tips</h3>
              <p className="text-muted-foreground text-sm">
                Practical insights you will not find elsewhere - from network coverage to negotiation hacks.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Street-Smart Pricing</h3>
              <p className="text-muted-foreground text-sm">
                Learn how travelers got their prices - direct bookings, negotiation, and local rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Popular Destinations</h2>
              <p className="text-muted-foreground mt-1">Explore itineraries from top Indian destinations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations?.map((destination: any) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Itineraries */}
      <section className="py-12 md:py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trending Itineraries</h2>
              <p className="text-muted-foreground mt-1">Most viewed trips this month</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingItineraries?.map((itinerary: any) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} showDestination />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Been somewhere recently?
            </h2>
            <p className="text-muted-foreground mb-8">
              Share your trip in under 60 seconds. Help other travelers plan better and see your real-world impact.
            </p>
            <a 
              href="/upload" 
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Share Your Trip
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">My Tours</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The most practical, street-smart travel planning platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}