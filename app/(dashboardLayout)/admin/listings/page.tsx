import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getListings } from "@/services/listings";

export default async function AdminListingsPage() {
  const result = await getListings();
  const listings = result?.data || [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Listing Management</h1>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Guide</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.length === 0 ? (
                <TableRow>
                     <TableCell colSpan={6} className="h-24 text-center">
                        No listings found.
                    </TableCell>
                </TableRow>
            ) : (
                listings.map((item: any) => (
                    <TableRow key={item._id}>
                        <TableCell className="font-medium">{item.title}</TableCell>
                         {/* Assuming listing object has guide populated or we fetch it */}
                        <TableCell>{item.guide?.name || "Unknown"}</TableCell>
                        <TableCell>{item.city}, {item.country}</TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                             <Badge variant="outline">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                             <span className="text-sm text-destructive cursor-pointer hover:underline">Delete</span>
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
