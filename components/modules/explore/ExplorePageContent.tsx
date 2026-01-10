"use client";

import { useState } from "react";
import SidebarFilter from "./SidebarFilter";
import ListingCard from "./ListingCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import type { Listing } from "@/types"; // We might need to define this type shared

interface ExplorePageContentProps {
    listings: Listing[]; // or existing type from API services
    searchParams: any;
}

export default function ExplorePageContent({ listings }: ExplorePageContentProps) {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden mb-4">
                    <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <Filter className="mr-2 h-4 w-4" /> Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] overflow-y-auto">
                            <SidebarFilter />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Sidebar (Desktop) */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24">
                        <SidebarFilter />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">Explore Experiences</h1>
                        <p className="text-muted-foreground">{listings.length} experiences found</p>
                    </div>

                    {listings.length === 0 ? (
                        <div className="text-center py-20 bg-muted/30 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">No results found</h3>
                            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.map((listing) => (
                                <ListingCard key={listing._id} listing={listing} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
