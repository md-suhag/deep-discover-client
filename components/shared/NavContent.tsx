"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User } from "lucide-react";
import { logoutUser } from "@/services/auth/logoutUser";

import { UserRole } from "@/lib/auth-utils";

interface NavContentProps {
  user: {
    role: UserRole;
    email?: string;
  } | null;
}

export default function NavContent({ user }: NavContentProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
  };

  const getLinks = () => {
    if (!user) {
      return [
        { href: "/", label: "Home" }, // Included for mobile, usually logo is home
        { href: "/tours", label: "Explore Tours" },
        { href: "/register?role=guide", label: "Become a Guide" },
      ];
    }

    switch (user.role) {
      case "TOURIST":
        return [
          { href: "/tours", label: "Explore Tours" },
          { href: "/dashboard/my-bookings", label: "My Bookings" },
        ];
      case "GUIDE":
        return [
           { href: "/tours", label: "Explore Tours" },
           { href: "/guide/dashboard", label: "Dashboard" },
        ];
      case "ADMIN":
      case "SUPER_ADMIN":
        return [
          { href: "/admin/dashboard", label: "Admin Dashboard" },
          { href: "/admin/users", label: "Manage Users" },
          { href: "/admin/listings", label: "Manage Listings" },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(pathname);
  
  // Optional: Hide specific nav items on auth pages if desired, but user didn't specify.

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
           <span className="text-primary">Deep</span>Discover
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
             <Link
               key={link.href}
               href={link.href}
               className={`text-sm font-medium transition-colors hover:text-primary ${
                 pathname === link.href ? "text-primary" : "text-muted-foreground"
               }`}
             >
               {link.label}
             </Link>
          ))}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                    <Link href={user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? '/admin/profile' : user.role === 'GUIDE' ? '/guide/profile' : '/dashboard/profile'}>
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
               <Button variant="ghost" asChild>
                 <Link href="/login">Login</Link>
               </Button>
               <Button asChild>
                 <Link href="/register">Register</Link>
               </Button>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-4 mt-8">
                         {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg font-medium transition-colors hover:text-primary ${
                                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                                }`}
                            >
                                {link.label}
                            </Link>
                         ))}
                         
                         {user ? (
                             <>
                                <Link 
                                    href={user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? '/admin/profile' : user.role === 'GUIDE' ? '/guide/profile' : '/dashboard/profile'}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-muted-foreground hover:text-primary"
                                >
                                    Profile
                                </Link>
                                <Button variant="destructive" className="w-full mt-4" onClick={handleLogout}>
                                    Logout
                                </Button>
                             </>
                         ) : (
                             <div className="flex flex-col gap-2 mt-4">
                                <Button variant="outline" asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button asChild onClick={() => setIsOpen(false)}>
                                    <Link href="/register">Register</Link>
                                </Button>
                             </div>
                         )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </nav>
  );
}
