"use client";

import { useState } from "react";
import SidebarFilter from "./SidebarFilter";
import ListingCard from "./ListingCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Search, Sparkles } from "lucide-react";
import type { Listing } from "@/types";

interface ExplorePageContentProps {
    listings: Listing[];
    searchParams: any;
}

export default function ExplorePageContent({ listings }: ExplorePageContentProps) {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            {/* Hero Header Section */}
            <div className="relative py-20 bg-zinc-900 border-b border-zinc-800 overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 blur-[120px] translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/80 text-sm font-bold animate-fade-in">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Discover Hidden Gems
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                        Explore Extraordinary <br /> <span className="text-primary italic">Experiences</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-zinc-400 font-medium">
                        Curated local journeys, hidden cultural treasures, and unforgettable adventures waiting for you to discover.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden">
                        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="w-full h-14 rounded-2xl border-zinc-200 dark:border-zinc-800 text-lg font-bold shadow-lg shadow-zinc-100 dark:shadow-none">
                                    <Filter className="mr-3 h-5 w-5 text-primary" /> Refine Search
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[320px] p-0 border-r-zinc-200 dark:border-r-zinc-800 overflow-y-auto">
                                <SidebarFilter />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Sidebar (Desktop) */}
                    <div className="hidden lg:block w-[320px] flex-shrink-0">
                        <SidebarFilter />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
                            <div>
                                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                    {listings.length > 0 ? (
                                        <>Results <span className="text-primary">{listings.length}</span></>
                                    ) : (
                                        "No Results"
                                    )}
                                </h2>
                                <p className="text-zinc-500 font-medium text-sm mt-1">Found based on your preferences</p>
                            </div>

                            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
                                <Button variant="ghost" size="sm" className="rounded-lg h-9 font-bold bg-white dark:bg-zinc-800 shadow-sm transition-all">List</Button>
                                <Button variant="ghost" size="sm" className="rounded-lg h-9 font-bold text-zinc-400 hover:text-zinc-600">Map</Button>
                            </div>
                        </div>

                        {listings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-zinc-50 dark:bg-zinc-900/50 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center space-y-6">
                                <div className="w-24 h-24 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                                    <Search className="w-10 h-10 text-zinc-400" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black">Nothing found, yet!</h3>
                                    <p className="text-zinc-500 max-w-sm font-medium">Try broadening your filters or reset your search to see more exciting results.</p>
                                </div>
                                <Button variant="outline" className="rounded-xl px-8 h-12 font-bold" onClick={() => window.location.href = "/explore"}>
                                    Clear Search
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {listings.map((listing, index) => (
                                    <div key={listing._id} className="animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-both" style={{ animationDelay: `${index * 100}ms` }}>
                                        <ListingCard listing={listing} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

