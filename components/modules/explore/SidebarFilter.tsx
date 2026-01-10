"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
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
import { Input } from "@/components/ui/input";

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

    return (
        <div className="space-y-6 p-4 border rounded-lg bg-card h-fit">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5" /> Filters
                </h3>
                <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground h-auto p-0 hover:bg-transparent hover:text-primary">
                    Reset
                </Button>
            </div>

            {/* Date Filter */}
            <div className="space-y-4">
                <Label>Date</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
                <Label>Price Range</Label>
                <Slider
                    defaultValue={[0, 5000]}
                    value={priceRange}
                    max={5000}
                    step={100}
                    onValueChange={setPriceRange}
                    className="py-4"
                />
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="pl-6"
                        />
                    </div>
                    <span className="text-muted-foreground">-</span>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="pl-6"
                        />
                    </div>
                </div>
            </div>

            {/* Categories Filter */}
            <div className="space-y-4">
                <Label>Categories</Label>
                <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        setSelectedCategories([...selectedCategories, category]);
                                    } else {
                                        setSelectedCategories(selectedCategories.filter(c => c !== category));
                                    }
                                }}
                            />
                            <label
                                htmlFor={category}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <Button className="w-full" onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
    );
}
