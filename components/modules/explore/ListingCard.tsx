"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Listing } from "@/types";

interface ListingCardProps {
    listing: Listing;
    className?: string;
}

export default function ListingCard({ listing, className }: ListingCardProps) {
    return (
        <Link href={`/listings/${listing._id}`}>
            <Card className={cn("group h-full overflow-hidden hover:shadow-lg transition-shadow duration-300", className)}>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                        src={listing.images[0] || "/placeholder-image.jpg"}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white/100">
                        {listing.category}
                    </Badge>
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary">
                            {listing.title}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-medium">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span>4.8</span>
                            {/* Hardcoded rating for now as it's not in the simple type above, update if API has it */}
                            <span className="text-muted-foreground text-xs">(12)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{listing.city}, {listing.country}</span>
                    </div>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {listing.description || "No description available."}
                    </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{listing.duration} Hours</span>
                    </div>
                    <div className="text-lg font-bold text-primary">
                        ${listing.price}
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
