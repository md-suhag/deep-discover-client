import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, List, CalendarDays, DollarSign } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, desc: "+180 this month" },
    { title: "Active Listings", value: "450", icon: List, desc: "+24 this week" },
    { title: "Total Bookings", value: "3,456", icon: CalendarDays, desc: "+12% from last month" },
    { title: "Revenue", value: "$45,230", icon: DollarSign, desc: "+8% from last month" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.desc}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
