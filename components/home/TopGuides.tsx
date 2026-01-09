import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const guides = [
  {
    id: 1,
    name: "Elena Rodriguez",
    location: "Barcelona, Spain",
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    specialty: "Art & History"
  },
  {
    id: 2,
    name: "Kenji Tanaka",
    location: "Kyoto, Japan",
    rating: 5.0,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    specialty: "Food & Culture"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 4.8,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    specialty: "Secret Spots"
  }
];

export default function TopGuides() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Top Rated Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <Card key={guide.id} className="text-center hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-col items-center pt-8">
                <Avatar className="h-24 w-24 border-4 border-background shadow-sm">
                  <AvatarImage src={guide.image} alt={guide.name} className="object-cover" />
                  <AvatarFallback>{guide.name[0]}</AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <h3 className="font-bold text-xl">{guide.name}</h3>
                  <p className="text-sm text-muted-foreground">{guide.location}</p>
                </div>
              </CardHeader>
              <CardContent>
                 <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{guide.rating}</span>
                    <span className="text-muted-foreground text-sm">({guide.reviews} reviews)</span>
                 </div>
                 <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {guide.specialty}
                 </span>
              </CardContent>
              <CardFooter className="justify-center pb-8">
                  <Button variant="outline">View Profile</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
