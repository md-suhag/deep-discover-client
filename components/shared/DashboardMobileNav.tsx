"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { UserRole } from "@/lib/auth-utils";
import { useState } from "react";

export default function DashboardMobileNav({ role }: { role: UserRole }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
          <div className="p-0 h-full" onClick={(e) => {
              // Close sheet when a link is clicked, relying on Sidebar Link behavior
              // But Sidebar is a client component using Next/Link which doesn't auto-close Sheet usually unless we control it.
              // To catch link clicks we can wrap sidebar or pass a close prop if we modified Sidebar.
              // For simplicity, we can let the user close it or rely on path change (if sheet is controlled by layout/path).
              // Actually, simpler hack:
              if((e.target as HTMLElement).closest('a')) {
                  setOpen(false);
              }
          }}>
             <Sidebar role={role} />
          </div>
      </SheetContent>
    </Sheet>
  );
}
