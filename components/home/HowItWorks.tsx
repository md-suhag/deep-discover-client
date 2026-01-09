import { Search, CalendarCheck, MapPin } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Find a Guide",
    description: "Search by destination or interest to find the perfect local expert for your trip."
  },
  {
    icon: CalendarCheck,
    title: "2. Book & Customize",
    description: "Message your guide, customize your itinerary, and securely book your dates."
  },
  {
    icon: MapPin,
    title: "3. Explore Together",
    description: "Meet your guide and discover hidden gems you wouldn't find in guidebooks."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <step.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground max-w-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
