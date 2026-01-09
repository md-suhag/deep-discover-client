"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Users,
  CalendarDays,
  List,
  UserCircle,
  LogOut,
  FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/auth/logoutUser";

interface SidebarProps {
  role: "ADMIN" | "SUPER_ADMIN" | "GUIDE" | "TOURIST";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const commonLinks = [
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle },
  ];

  const roleLinks = {
    ADMIN: [
      { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/users", label: "Manage Users", icon: Users },
      { href: "/admin/listings", label: "Manage Listings", icon: List },
    ],
    SUPER_ADMIN: [
      { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/users", label: "Manage Users", icon: Users },
      { href: "/admin/listings", label: "Manage Listings", icon: List },
    ],
    GUIDE: [
      { href: "/guide/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/guide/my-listings", label: "My Listings", icon: Map },
      { href: "/guide/bookings", label: "Bookings", icon: CalendarDays },
    ],
    TOURIST: [
      { href: "/dashboard/my-bookings", label: "My Trips", icon: CalendarDays },
      { href: "/dashboard/wishlist", label: "Wishlist", icon: FolderOpen },
    ],
  };

  // Adjust profile link based on role path convention if needed, 
  // currently treating /dashboard/profile as generic or redirecting.
  // Actually, let's align with the folder structure:
  // Admin: /admin/profile ?? -> No, sticking to /dashboard/profile or specific
  // Guide: /guide/profile
  // Tourist: /dashboard/profile
  
  const getProfileLink = () => {
      if (role === 'GUIDE') return { href: "/guide/profile", label: "Profile", icon: UserCircle };
      if (role === 'ADMIN' || role === 'SUPER_ADMIN') return { href: "/admin/profile", label: "Profile", icon: UserCircle };
      return { href: "/dashboard/profile", label: "Profile", icon: UserCircle };
  }

  const links = [...(roleLinks[role] || []), getProfileLink()];

  return (
    <div className="flex h-full max-h-screen flex-col gap-2 bg-[#1c2434] text-gray-300">
      <div className="flex h-14 items-center border-b border-[#333a48] px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="text-xl">Deep</span>
          <span className="text-xl font-light text-gray-400">Discover</span>
        </Link>
      </div>
      <div className="flex-1 py-4">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
          {links.map((link) => {
            const Icon = link.icon;
             const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-[#333a48] hover:text-white",
                  isActive
                    ? "bg-[#333a48] text-white shadow-sm"
                    : "text-gray-400"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-gray-400")} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-[#333a48]">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-gray-400 hover:bg-[#333a48] hover:text-white" 
            onClick={() => logoutUser()}
          >
             <LogOut className="h-4 w-4" />
             Logout
          </Button>
      </div>
    </div>
  );
}
