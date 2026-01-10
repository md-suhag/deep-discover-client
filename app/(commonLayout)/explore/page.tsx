import { getListings } from "@/services/listings";
import ExplorePageContent from "@/components/modules/explore/ExplorePageContent";

interface SearchParams {
    searchTerm?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
    date?: string;
}
interface PageProps {
    searchParams: Promise<SearchParams>;
}

export const metadata = {
    title: "Explore | Deep Discover",
    description: "Find your next diverse local experience.",
};

export default async function ExplorePage({ searchParams }: PageProps) {
    const params = await searchParams;
    const currSearchParams = new URLSearchParams();

    if (params.searchTerm) currSearchParams.set("searchTerm", params.searchTerm);
    if (params.minPrice) currSearchParams.set("minPrice", params.minPrice);
    if (params.maxPrice) currSearchParams.set("maxPrice", params.maxPrice);
    if (params.category) currSearchParams.set("category", params.category);
    // date might need parsing if backend expects specific format, but passing ISO string usually works or needs specific key
    // Assuming backend generic filtering or I might need to adapt.
    // For now passing it as is.
    if (params.date) currSearchParams.set("date", params.date);

    const res = await getListings(currSearchParams.toString());

    // Handle response structure
    let listings = [];
    if (res?.success && res?.data?.result) {
        listings = res.data.result;
    } else if (res?.success && Array.isArray(res?.data)) {
        listings = res.data;
    } else if (Array.isArray(res)) {
        listings = res;
    }
    // Fallback for different API response shapes

    // If the API returns a pagination object, we might need to drill down. 
    // Standard pattern often data: { result: [], meta: {} }

    console.log("Explore Page Listings Fetch:", { success: res?.success, count: listings.length });

    return (
        <ExplorePageContent listings={listings} searchParams={params} />
    );
}
