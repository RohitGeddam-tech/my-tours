export type Persona = 'solo' | 'couple' | 'family' | 'friends' | 'pet-friendly'

export type ComfortLevel = 'budget' | 'mid-range' | 'luxury'

export type TipType = 'warning' | 'recommendation' | 'advice' | 'safety' | 'scam' | 'hack'

export interface Tip {
  id: string
  type: TipType
  content: string
  upvotes: number
}

export interface ExpenseBreakdown {
  stay: number
  food: number
  travel: number
  activities: number
  other?: number
}

export interface Place {
  id: string
  name: string
  image?: string
  type: 'beach' | 'temple' | 'viewpoint' | 'restaurant' | 'hotel' | 'activity' | 'hidden-gem'
}

export interface Stay {
  name: string
  pricePerNight: number
  marketPrice?: number
  negotiated: boolean
  negotiationTip?: string
  image?: string
}

export interface Itinerary {
  id: string
  destination: string
  destinationId: string
  coverImage: string
  duration: number
  totalExpense: number
  persona: Persona
  comfortLevel: ComfortLevel
  expenseBreakdown?: ExpenseBreakdown
  tips: Tip[]
  places: Place[]
  stay?: Stay
  monthOfTravel: string
  createdAt: string
  views: number
  saves: number
  copies: number
  contributor: {
    id: string
    name: string
    avatar?: string
    badge?: string
    travelScore: number
  }
  isMultiStop?: boolean
  stops?: string[]
}

export interface RealitySnapshot {
  network: string
  payments: string
  crowds: 'low' | 'medium' | 'high' | 'very-high'
  hotelNegotiability: 'low' | 'medium' | 'high'
  safety: string
  weather?: string
  scamAlerts?: string[]
}

export interface BudgetTier {
  level: ComfortLevel
  minBudget: number
  maxBudget: number
  itineraryCount: number
}

export interface Destination {
  id: string
  name: string
  slug: string
  coverImage: string
  description: string
  realitySnapshot: RealitySnapshot
  budgetSpectrum: BudgetTier[]
  itineraries: Itinerary[]
  totalItineraries: number
  avgBudget: {
    min: number
    max: number
  }
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  travelScore: number
  badges: string[]
  itineraries: Itinerary[]
  savedItineraries: Itinerary[]
  stats: {
    totalViews: number
    totalSaves: number
    totalCopies: number
    tripsShared: number
    helpfulTips: number
  }
  joinedAt: string
}
