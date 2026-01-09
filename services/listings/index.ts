"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";
import { getCookie } from "../auth/tokenHandlers";

export async function getListings(query?: string) {
  try {
    const endpoint = query ? `/listings?${query}` : "/listings";
    const res = await serverFetch.get(endpoint);
    return res;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return { success: false, message: "Failed to fetch listings" };
  }
}

export async function getListingById(id: string) {
  try {
    const res = await serverFetch.get(`/listings/${id}`);
    return res;
  } catch (error) {
    console.error(`Error fetching listing ${id}:`, error);
    return { success: false, message: "Failed to fetch listing" };
  }
}

export async function createListing(prevState: any, formData: FormData) {
  try {
    const token = await getCookie("accessToken");
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

    // Validate token exists
    if (!token) {
        return { success: false, message: "Unauthorized. Please login again." };
    }

    // Construct payload with correct types
    const rawData = Object.fromEntries(formData.entries());
    const images = formData.getAll("images");
    
    const payload = {
        title: rawData.title,
        description: rawData.description,
        price: Number(rawData.price),
        duration: Number(rawData.duration),
        maxGroupSize: Number(rawData.maxGroupSize),
        city: rawData.city,
        country: rawData.country,
        meetingPoint: rawData.meetingPoint,
        category: rawData.category,
        itinerary: rawData.itinerary ? JSON.parse(rawData.itinerary as string) : [],
        languages: rawData.languages ? JSON.parse(rawData.languages as string) : [],
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(payload));
    
    // Append images
    // Note: formData.getAll("images") returns generic FormDataEntryValue[]
    // We assume they are files.
    for (const image of images) {
        newFormData.append("images", image);
    }

    const res = await fetch(`${BACKEND_API_URL}/listings`, {
        method: "POST",
        headers: {
            "Authorization": token,
        },
        body: newFormData, 
    });

    const result = await res.json();
    
    if (res.ok && result.success) {
        revalidatePath("/listings");
        revalidatePath("/guide/my-listings");
        return { success: true, message: "Listing created successfully!" };
    }
    
    return {
      success: false,
      message: result.message || "Failed to create listing",
      errors: result.errorSources || [] // support backend error format
    };

  } catch (error: any) {
    console.error("Create listing error:", error);
    return {
      success: false,
      message: error.message || "Failed to create listing",
    };
  }
}

export async function updateListing(id: string, prevState: any, formData: FormData) {
  try {
    const token = await getCookie("accessToken");
    const BACKEND_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

    if (!token) {
        return { success: false, message: "Unauthorized. Please login again." };
    }
    
    // Construct payload logic (similar to create)
    // We allow partial updates, but FormData usually sends everything present in the form.
    const rawData = Object.fromEntries(formData.entries());
    const images = formData.getAll("images");
    
    // Parse numeric/json fields
    const payload: any = {
        title: rawData.title,
        description: rawData.description,
        price: Number(rawData.price),
        duration: Number(rawData.duration),
        maxGroupSize: Number(rawData.maxGroupSize),
        city: rawData.city,
        country: rawData.country,
        meetingPoint: rawData.meetingPoint,
        category: rawData.category,
    };
    
    if (rawData.itinerary) payload.itinerary = JSON.parse(rawData.itinerary as string);
    if (rawData.languages) payload.languages = JSON.parse(rawData.languages as string);

    // If images are empty files (not selected), getAll might still return them as empty files.
    // We should only append images if they are actual files to avoid wiping existing images 
    // OR if the backend handles appendage. 
    // Usually for edit, if new images are provided, they might be added or replace?
    // User didn't specify, but often 'images' field implies new uploads.
    // If we want to KEEP existing images, we usually rely on backend logic 
    // (e.g. only add if present, or send a separate "deleteImages" list).
    // For now, I'll send images if provided.

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(payload));

    const validImages = images.filter((img: any) => img.size > 0);
    for (const image of validImages) {
        newFormData.append("images", image);
    }
    
    const res = await fetch(`${BACKEND_API_URL}/listings/${id}`, {
        method: "PUT", // or PATCH. Assuming PUT for full update or PATCH. Let's try PUT as it's often used for "Edit Form" contexts replacing data. User didn't specify. I'll stick to specific method if I knew... assume PATCH for safety? Or PUT?
                      // Actually, commonly PATCH is better for updates. But often PUT is used for "save this resource state".
                      // I will use `PUT` because I am sending the FULL payload from the form.
        headers: {
            "Authorization": token,
        },
        body: newFormData, 
    });

    const result = await res.json();
    
    if (res.ok && result.success) {
        revalidatePath("/listings");
        revalidatePath(`/listings/${id}`); // revalidate details
        revalidatePath("/guide/my-listings");
        return { success: true, message: "Listing updated successfully!" };
    }
    
    return {
      success: false,
      message: result.message || "Failed to update listing",
      errors: result.errorSources || []
    };

  } catch (error: any) {
    console.error("Update listing error:", error);
    return {
      success: false,
      message: error.message || "Failed to update listing",
    };
  }
}

export async function deleteListing(id: string) {
    try {
        const res = await serverFetch.delete(`/listings/${id}`);
        revalidatePath("/listings");
        revalidatePath("/guide/my-listings");
        return res;
    } catch (error: any) {
        return { success: false, message: "Failed to delete listing" };
    }
}
