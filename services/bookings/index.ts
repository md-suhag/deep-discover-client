"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function createBooking(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const payload = {
        listing: rawData.listingId,
        date: rawData.date,
        notes: rawData.notes
    };

    const res = await serverFetch.post("/bookings", payload);
    
    if (res.success) {
        revalidatePath("/dashboard/my-bookings");
        revalidatePath("/guide/bookings");
    }
    return res;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create booking" };
  }
}

export async function getBookings() {
   try {
       // Assuming endpoint exists or is implied by context
       const res = await serverFetch.get("/bookings");
       return res;
   } catch (error) {
       console.error("Error fetching bookings:", error);
       return { success: false, message: "Failed to fetch bookings", data: [] };
   }
}

export async function updateBookingStatus(id: string, status: "ACCEPTED" | "REJECTED") {
    try {
        const res = await serverFetch.patch(`/bookings/${id}`, { status });
        revalidatePath("/guide/bookings");
        revalidatePath("/dashboard/my-bookings");
        return res;
    } catch (error) {
         return { success: false, message: "Failed to update booking status" };
    }
}
