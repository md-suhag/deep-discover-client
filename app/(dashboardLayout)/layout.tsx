import { Sidebar } from "@/components/shared/Sidebar";
import DashboardMobileNav from "@/components/shared/DashboardMobileNav";
import { getCookie } from "@/services/auth/tokenHandlers";
import jwt from "jsonwebtoken";
import { UserRole } from "@/lib/auth-utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getCookie("accessToken");
  let role: UserRole = "TOURIST";

  if (token) {
    try {
      const decoded = jwt.decode(token) as { role: UserRole };
      if (decoded) role = decoded.role;
    } catch (e) {
      console.error("Token decode failed", e);
    }
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
           <Sidebar role={role} />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
           <DashboardMobileNav role={role} />
           <div className="w-full flex-1">
             {/* Can add breadcrumb or title here if needed */}
             <span className="font-semibold">Dashboard</span>
           </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
