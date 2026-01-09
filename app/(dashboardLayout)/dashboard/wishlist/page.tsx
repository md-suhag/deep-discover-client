import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
      
      <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-lg bg-muted/10 text-center gap-4">
         <p className="text-muted-foreground">Your wishlist is empty.</p>
         <Button asChild>
            <Link href="/tours">Explore Amazing Tours</Link>
         </Button>
      </div>
    </div>
  );
}
