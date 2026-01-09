import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, DollarSign, Users, Star } from "lucide-react";

export default function GuideDashboardPage() {
  // Ideally fetch stats from API. Using static/mock for initial UI structure.
  const stats = [
    { title: "Total Bookings", value: "12", icon: CalendarDays, desc: "+2 this week" },
    { title: "Total Earnings", value: "$2,450", icon: DollarSign, desc: "+$350 this month" },
    { title: "Active Listings", value: "3", icon: Users, desc: "2 pending approval" },
    { title: "Average Rating", value: "4.9", icon: Star, desc: "Based on 24 reviews" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent bookings found.</p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">You have no pending requests.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
