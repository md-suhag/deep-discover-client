import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    guides: 120
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
    guides: 85
  },
  {
    id: 3,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226310-808f0754ee9f?q=80&w=2070&auto=format&fit=crop",
    guides: 200
  },
  {
    id: 4,
    name: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
    guides: 95
  }
];

export default function FeaturedDestinations() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Featured Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((city) => (
            <Card key={city.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{city.name}</h3>
                <p className="text-sm text-muted-foreground">{city.guides} Local Guides</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
