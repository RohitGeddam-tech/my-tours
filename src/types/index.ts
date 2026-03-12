export interface Destination {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image_url?: string;
}

export interface Itinerary {
    id: string;
    destination_id: string;
    title: string;
    duration_days: number;
    budget_level: 'shoestring' | 'moderate' | 'luxury';
    content: any;
}

export interface Tip {
    id: string;
    destination_id: string;
    content: string;
    category: string;
}
