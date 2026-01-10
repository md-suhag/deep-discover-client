"use client";

import { Listing } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Clock, Users, Languages, Check, Star, Share2, Heart, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

interface ListingDetailsContentProps {
    listing: Listing;
}

export default function ListingDetailsContent({ listing }: ListingDetailsContentProps) {
    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            {/* Hero Gallery Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
                    <div className="md:col-span-2 relative h-full group">
                        <Image
                            src={listing.images[0] || "/placeholder-image.jpg"}
                            alt={listing.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                    </div>
                    <div className="hidden md:grid grid-rows-2 gap-4 col-span-1 h-full">
                        <div className="relative h-full group overflow-hidden rounded-r-none">
                            <Image
                                src={listing.images[1] || listing.images[0] || "/placeholder-image.jpg"}
                                alt={listing.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative h-full group overflow-hidden">
                            <Image
                                src={listing.images[2] || listing.images[0] || "/placeholder-image.jpg"}
                                alt={listing.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </div>
                    <div className="hidden md:block relative h-full col-span-1 group overflow-hidden">
                        <Image
                            src={listing.images[3] || listing.images[0] || "/placeholder-image.jpg"}
                            alt={listing.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <span className="text-white font-bold text-lg">See all photos</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary border-none font-bold">
                                    {listing.category}
                                </Badge>
                                <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-4 py-1.5 rounded-full">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <span className="text-sm font-bold">4.9 (128 reviews)</span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
                                    {listing.title}
                                </h1>
                                <div className="flex gap-3">
                                    <Button variant="outline" size="icon" className="rounded-full hover:bg-zinc-50 border-zinc-200">
                                        <Share2 className="w-5 h-5 text-zinc-600" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="rounded-full hover:bg-zinc-50 border-zinc-200">
                                        <Heart className="w-5 h-5 text-zinc-600" />
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{listing.city}, {listing.country}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{listing.duration} Hours</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">Up to {listing.maxGroupSize} people</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Languages className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{listing.languages?.join(", ") || "English"}</span>
                                </div>
                            </div>
                        </div>

                        <Separator className="bg-zinc-100 dark:bg-zinc-800" />

                        {/* Description */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold">About this experience</h2>
                            <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                                {listing.description || "Experience the local culture like never before. This curated journey takes you through the most vibrant parts of the city, guided by experts who know every hidden secret. From traditional markets to modern landmarks, you'll see it all."}
                            </div>
                        </div>

                        {/* Itinerary */}
                        {listing.itinerary && listing.itinerary.length > 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold">What you'll do</h2>
                                <div className="grid gap-4">
                                    {listing.itinerary.map((item, index) => (
                                        <div key={index} className="flex gap-4 p-5 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-md">
                                            <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <p className="text-zinc-700 dark:text-zinc-300 font-medium">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Included */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">Professional Guide</h2>
                            <div className="flex items-center gap-4 bg-zinc-900 dark:bg-zinc-100 p-6 rounded-3xl text-white dark:text-zinc-900">
                                <div className="w-16 h-16 rounded-full bg-zinc-800 dark:bg-zinc-200 overflow-hidden relative">
                                    <Image src={listing.guide?.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"} alt="Guide" fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl">{listing.guide?.name || "Alex Johnson"}</h4>
                                    <p className="text-zinc-400 dark:text-zinc-500 text-sm">Expert in {listing.category}</p>
                                </div>
                                <Badge className="ml-auto bg-primary hover:bg-primary border-none text-white">Verified</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-3xl overflow-hidden border-none bg-zinc-50 dark:bg-zinc-900/50">
                                <CardContent className="p-8 space-y-8">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <span className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">Per Person</span>
                                            <div className="text-4xl font-black text-primary">${listing.price}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-zinc-900 dark:text-zinc-100 font-bold">5.0</div>
                                            <div className="text-zinc-400 text-xs font-medium">8 Reviews</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                                            <div className="flex items-center gap-3">
                                                <CalendarIcon className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="text-xs font-bold text-zinc-400 uppercase">Date</p>
                                                    <p className="font-semibold">Select Date</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between group cursor-pointer hover:border-primary transition-all">
                                            <div className="flex items-center gap-3">
                                                <Users className="w-5 h-5 text-primary" />
                                                <div>
                                                    <p className="text-xs font-bold text-zinc-400 uppercase">Travelers</p>
                                                    <p className="font-semibold">1 Adult</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full h-14 rounded-2xl text-lg font-black bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 transition-all hover:-translate-y-1">
                                        Book This Experience
                                    </Button>

                                    <div className="space-y-4 pt-4">
                                        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                            <ShieldCheck className="w-5 h-5 text-green-500" />
                                            <span className="font-medium">Free cancellation up to 24h before</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                                            <Check className="w-5 h-5 text-green-500" />
                                            <span className="font-medium">Instant confirmation</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Help Box */}
                            <div className="p-8 bg-zinc-900 rounded-3xl text-white space-y-4 border border-zinc-800">
                                <h4 className="font-bold text-xl">Need more info?</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Our support team is available 24/7 to help you with your booking or any questions about this experience.</p>
                                <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 rounded-xl">
                                    Message Guide
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
