"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getAllUsers() {
    try {
        const res = await serverFetch.get("/users");
        return res;
    } catch (error) {
        return { success: false, message: "Failed to fetch users", data: [] };
    }
}
