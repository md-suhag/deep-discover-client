
import { cookies } from "next/headers";
import NavContent from "./NavContent";
import { UserRole } from "@/lib/auth-utils";
import jwt from "jsonwebtoken";

export default async function Navbar() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let user: { role: UserRole; email: string } | null = null;

  if (accessToken) {
    try {
      const decoded = jwt.decode(accessToken) as { role: UserRole; email: string };
      if (decoded) {
        user = {
            role: decoded.role,
            email: decoded.email
        };
      }
    } catch (error) {
        console.error("Failed to decode token in Navbar", error);
    }
  }

  return <NavContent user={user} />;
}
