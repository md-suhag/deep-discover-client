"use client";

import { useActionState, useEffect, useState } from "react";
import { createListing } from "@/services/listings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputFieldError from "@/components/shared/InputFieldError";
import { toast } from "sonner";
import { Loader2, Plus, X, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function CreateListingForm() {
  const [state, formAction, isPending] = useActionState(createListing, null);
  const router = useRouter();

  // Dynamic state for arrays
  const [itinerary, setItinerary] = useState<string[]>([]);
  const [currentItineraryItem, setCurrentItineraryItem] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState("");

  const addItineraryItem = () => {
    if (currentItineraryItem.trim()) {
      setItinerary([...itinerary, currentItineraryItem.trim()]);
      setCurrentItineraryItem("");
    }
  };

  const removeItineraryItem = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (currentLanguage.trim()) {
       if(!languages.includes(currentLanguage.trim())) {
           setLanguages([...languages, currentLanguage.trim()]);
       }
       setCurrentLanguage("");
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
  };


  useEffect(() => {
    if (state?.success) {
      toast.success("Listing created successfully!");
      router.push("/guide/my-listings");
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-4xl mx-auto border-none shadow-none">
      <CardHeader className="px-0">
         <CardTitle className="text-2xl">Listing Details</CardTitle>
         <CardDescription>Fill out the details below to create your new tour listing.</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form action={formAction} className="grid gap-6">
          {/* Main Info */}
          <div className="grid gap-4 md:grid-cols-2">
             <div className="grid gap-2">
                <Label htmlFor="title">Tour Title</Label>
                <Input id="title" name="title" placeholder="Sunset Boat Tour..." disabled={isPending} required />
                <InputFieldError field="title" state={state} />
             </div>
             <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" placeholder="Sightseeing, Food..." disabled={isPending} required />
                 {/* Could use Select here if categories are fixed */}
                <InputFieldError field="category" state={state} />
             </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the experience in detail..."
              className="min-h-[120px]"
              disabled={isPending}
              required
            />
            <InputFieldError field="description" state={state} />
          </div>

          {/* Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
                <Label htmlFor="price">Price (Taka)</Label>
                <div className="relative">
                   <span className="absolute left-3 top-2.5 text-muted-foreground">৳</span>
                   <Input id="price" name="price" type="number" className="pl-8" placeholder="2500" disabled={isPending} required />
                </div>
                <InputFieldError field="price" state={state} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="duration">Duration (Hours)</Label>
                <Input id="duration" name="duration" type="number" placeholder="3" disabled={isPending} required />
                <InputFieldError field="duration" state={state} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="maxGroupSize">Max Group Size</Label>
                <Input id="maxGroupSize" name="maxGroupSize" type="number" placeholder="10" disabled={isPending} required />
                <InputFieldError field="maxGroupSize" state={state} />
            </div>
          </div>

          {/* Location */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" placeholder="Dhaka" disabled={isPending} required />
                <InputFieldError field="city" state={state} />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" placeholder="Bangladesh" disabled={isPending} required />
                <InputFieldError field="country" state={state} />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="meetingPoint">Meeting Point</Label>
            <Input id="meetingPoint" name="meetingPoint" placeholder="Sadarghat Terminal..." disabled={isPending} required />
            <InputFieldError field="meetingPoint" state={state} />
          </div>

          {/* Dynamic Itinerary */}
          <div className="grid gap-2">
            <Label>Itinerary</Label>
            <div className="flex gap-2">
                <Input 
                   value={currentItineraryItem} 
                   onChange={(e) => setCurrentItineraryItem(e.target.value)}
                   placeholder="Add an itinerary step..."
                   onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addItineraryItem(); }}}
                />
                <Button type="button" variant="secondary" onClick={addItineraryItem}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                {itinerary.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-md border bg-muted/20 text-sm">
                        <span><span className="font-semibold mr-2">{index + 1}.</span>{item}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeItineraryItem(index)}>
                            <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                    </div>
                ))}
                {itinerary.length === 0 && <p className="text-xs text-muted-foreground">No steps added yet.</p>}
            </div>
            <input type="hidden" name="itinerary" value={JSON.stringify(itinerary)} />
          </div>

          {/* Dynamic Languages */}
           <div className="grid gap-2">
            <Label>Languages Supported</Label>
            <div className="flex gap-2">
                 <Input 
                   value={currentLanguage} 
                   onChange={(e) => setCurrentLanguage(e.target.value)}
                   placeholder="Add a language (e.g. English)..."
                   onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); addLanguage(); }}}
                />
                 <Button type="button" variant="secondary" onClick={addLanguage}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
             <div className="flex flex-wrap gap-2 mt-2">
                {languages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                        {lang}
                        <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeLanguage(lang)} />
                    </Badge>
                ))}
                 {languages.length === 0 && <p className="text-xs text-muted-foreground">No languages added yet.</p>}
            </div>
            <input type="hidden" name="languages" value={JSON.stringify(languages)} />
          </div>

          {/* Image Upload */}
           <div className="grid gap-2">
            <Label htmlFor="images">Upload Images</Label>
            <div className="flex flex-col gap-2 p-6 border-2 border-dashed rounded-lg items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground">Select multiple images</p>
                <Input 
                    id="images" 
                    name="images" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    disabled={isPending}
                />
            </div>
             <InputFieldError field="images" state={state} />
          </div>

          <Button type="submit" size="lg" className="mt-4" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Create Listing
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
