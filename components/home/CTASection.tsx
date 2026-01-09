import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground text-center">
      <div className="container px-4 md:px-6 space-y-6">
         <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Turn your passion into a profession</h2>
         <p className="text-xl max-w-[700px] mx-auto opacity-90">
             Show travelers your city, meet people from around the world, and earn money doing what you love.
         </p>
         <Button size="lg" variant="secondary" className="mt-4 text-lg px-8 py-6" asChild>
             <Link href="/register?role=guide">Become a Guide</Link>
         </Button>
      </div>
    </section>
  );
}
