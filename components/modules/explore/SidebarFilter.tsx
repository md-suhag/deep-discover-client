"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CATEGORIES = [
    "Culture & Sightseeing",
    "Adventure & Nature",
    "Food & Culinary",
    "Wellness & Retreats",
    "Art & History",
    "Shopping & Fashion",
];

export default function SidebarFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [date, setDate] = useState<Date | undefined>();
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Initialize state from URL params
    useEffect(() => {
        const fromDate = searchParams.get("date");
        if (fromDate) setDate(new Date(fromDate));

        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        if (minPrice || maxPrice) {
            setPriceRange([
                Number(minPrice) || 0,
                Number(maxPrice) || 5000
            ]);
        }

        const cats = searchParams.get("category");
        if (cats) {
            setSelectedCategories(cats.split(","));
        }
    }, [searchParams]);

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (date) {
            params.set("date", date.toISOString());
        } else {
            params.delete("date");
        }

        params.set("minPrice", priceRange[0].toString());
        params.set("maxPrice", priceRange[1].toString());

        if (selectedCategories.length > 0) {
            params.set("category", selectedCategories.join(","));
        } else {
            params.delete("category");
        }

        router.push(`/explore?${params.toString()}`);
    };

    const handleReset = () => {
        setDate(undefined);
        setPriceRange([0, 5000]);
        setSelectedCategories([]);
        router.push("/explore");
    };

    const activeFiltersCount = (date ? 1 : 0) + (selectedCategories.length > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

    return (
        <div className="space-y-8 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-lg tracking-tight">Filters</h3>
                    {activeFiltersCount > 0 && (
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            {activeFiltersCount}
                        </span>
                    )}
                </div>
                {activeFiltersCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleReset}
                        className="h-8 px-2 text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                    >
                        Clear all
                    </Button>
                )}
            </div>

            {/* Date Filter */}
            <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Scheduled Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full h-12 justify-start text-left font-medium border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-primary transition-all duration-300",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-3 h-4 w-4 text-primary" />
                            {date ? format(date, "PPP") : <span>Any date</span>}
                            {date && (
                                <X
                                    className="ml-auto h-4 w-4 hover:text-zinc-900 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setDate(undefined);
                                    }}
                                />
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl border-zinc-200 dark:border-zinc-800" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            className="p-3"
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Price Filter */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Price Range</Label>
                    <span className="text-sm font-bold text-primary">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <Slider
                    value={priceRange}
                    max={5000}
                    step={50}
                    onValueChange={setPriceRange}
                    className="py-2"
                />
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 ml-1">Min</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">$</span>
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-zinc-400 ml-1">Max</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">$</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2 pl-7 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-4">
                <Label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Categories</Label>
                <div className="grid grid-cols-1 gap-2.5">
                    {CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center group cursor-pointer" onClick={() => {
                            if (selectedCategories.includes(category)) {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                            } else {
                                setSelectedCategories([...selectedCategories, category]);
                            }
                        }}>
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                className="rounded-md border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all duration-300"
                            />
                            <label
                                htmlFor={category}
                                className="text-sm font-medium leading-none ml-3 text-zinc-600 dark:text-zinc-400 group-hover:text-primary cursor-pointer transition-colors"
                            >
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" onClick={handleApplyFilters}>
                Apply Results
            </Button>
        </div>
    );
}
