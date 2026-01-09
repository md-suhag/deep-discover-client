import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getListings } from "@/services/listings";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function GuideListingsPage() {
  const result = await getListings();
  const listings = result?.data || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Listings</h1>
        <Button asChild>
            <Link href="/guide/my-listings/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Listing
            </Link>
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No listings found. Create one to get started.
                    </TableCell>
                </TableRow>
            ) : (
                listings.map((item: any) => (
                    <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>{item.city}, {item.country}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                            <Badge variant="outline">Active</Badge> 
                            {/* logic for status if available */}
                        </TableCell>
                        <TableCell className="text-right">
                             <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                    </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
