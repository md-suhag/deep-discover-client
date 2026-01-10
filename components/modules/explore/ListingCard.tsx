"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Listing } from "@/types";
import { useState } from "react";

interface ListingCardProps {
    listing: Listing;
    className?: string;
}

export default function ListingCard({ listing, className }: ListingCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <Card className={cn("group relative h-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-2xl", className)}>
            <div className="relative aspect-[16/11] w-full overflow-hidden">
                <Link href={`/listings/${listing._id}`}>
                    <Image
                        src={listing.images[0] || "/placeholder-image.jpg"}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={false}
                    />
                </Link>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <Badge className="bg-white/90 backdrop-blur-md text-zinc-900 border-none px-3 py-1 font-medium hover:bg-white">
                        {listing.category}
                    </Badge>
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsWishlisted(!isWishlisted);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 hover:bg-white/40 transition-all duration-300 group/wishlist"
                >
                    <Heart className={cn("w-5 h-5 transition-colors duration-300", isWishlisted ? "fill-red-500 text-red-500" : "text-white group-hover/wishlist:text-red-100")} />
                </button>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <Link href={`/listings/${listing._id}`} className="block mb-2">
                    <div className="flex justify-between items-start gap-3">
                        <h3 className="font-bold text-lg leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors line-clamp-2">
                            {listing.title}
                        </h3>
                    </div>
                </Link>

                <div className="flex items-center gap-2 mb-3 text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{listing.city}, {listing.country}</span>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                    {listing.description || "Embark on an unforgettable journey through the heart of the city with our expert local guides."}
                </p>

                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{listing.duration}h</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            <span className="text-zinc-900 dark:text-zinc-100">4.9</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-zinc-500 font-medium">From</span>
                        <div className="text-xl font-extrabold text-primary">
                            ${listing.price}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

