import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getBookings } from "@/services/bookings";

export default async function GuideBookingsPage() {
  const result = await getBookings();
  const bookings = result?.data || [];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tour</TableHead>
              <TableHead>Tourist</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No bookings found.
                    </TableCell>
                </TableRow>
            ) : (
                bookings.map((booking: any) => (
                    <TableRow key={booking._id}>
                        <TableCell className="font-medium">{booking.listing?.title || "Unknown Tour"}</TableCell>
                        <TableCell>{booking.tourist?.name || "Unknown User"}</TableCell>
                        <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                             <Badge variant={booking.status === 'ACCEPTED' ? 'default' : booking.status === 'PENDING' ? 'secondary' : 'destructive'}>
                                {booking.status}
                             </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                             {/* Actions like Accept/Reject would go here */}
                             <span className="text-sm text-muted-foreground">Details</span>
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
