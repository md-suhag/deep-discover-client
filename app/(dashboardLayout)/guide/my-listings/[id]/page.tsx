import { getListingById } from "@/services/listings";
import { Badge } from "@/components/ui/badge";

// params needs to be awaited in Next.js 15+, but let's check Next 16 behavior or assume standard
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getListingById(id);
  const listing = result?.data;

  if (!listing) {
      return <div>Listing not found</div>
  }

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-2">
         <Button variant="ghost" className="p-0 h-auto hover:bg-transparent hover:text-primary" asChild>
             <Link href="/guide/my-listings" className="flex items-center gap-2 text-muted-foreground">
                 <ArrowLeft className="h-4 w-4" /> Back to Listings
             </Link>
         </Button>
      </div>
      <div className="flex justify-between items-start">
         <h1 className="text-3xl font-bold tracking-tight text-[#1c2434]">{listing.title}</h1>
         <Badge>Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
              <img 
                src={listing.images?.[0] || "/placeholder.jpg"} 
                alt={listing.title} 
                className="w-full h-64 object-cover rounded-lg"
              />
          </div>
          <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-semibold text-lg">৳ {listing.price}</p>
                  </div>
                  <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-semibold">{listing.duration} hours</p>
                  </div>
                  <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{listing.city}, {listing.country}</p>
                  </div>
                   <div>
                      <p className="text-muted-foreground">Group Size</p>
                      <p className="font-medium">{listing.maxGroupSize} people</p>
                  </div>
              </div>
              <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{listing.description}</p>
              </div>
          </div>
      </div>
    </div>
  );
}
