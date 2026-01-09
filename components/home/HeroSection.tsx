"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')] bg-cover bg-center" />
      
      <div className="relative z-10 container px-4 md:px-6 text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Where are you going?
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-[700px] mx-auto">
          Find the best local guides and explore hidden gems in cities around the world.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto bg-white/10 p-4 rounded-lg backdrop-blur-sm">
          <Input 
            placeholder="Search destination, guide, or tour..." 
            className="flex-1 bg-white/90 text-black placeholder:text-gray-500 border-none h-12" 
          />
          <Button size="lg" className="w-full sm:w-auto h-12 text-base">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
}
