export interface Listing {
    _id: string;
    title: string;
    description?: string;
    price: number;
    duration: number;
    city: string;
    country: string;
    category: string;
    images: string[];
    maxGroupSize?: number;
    rating?: number;
    reviewsCount?: number;
    meetingPoint?: string;
    itinerary?: string[];
    languages?: string[];
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    slug?: string;
    guide?: any; // Define Guide type if available
}
