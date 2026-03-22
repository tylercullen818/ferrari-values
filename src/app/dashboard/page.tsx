"use client";

import { TrendingUp, Users, CreditCard, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231",
    change: "+20.1%",
    icon: TrendingUp,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+12.3%",
    icon: Users,
  },
  {
    title: "Subscriptions",
    value: "1,247",
    change: "+8.1%",
    icon: CreditCard,
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+2.4%",
    icon: Activity,
  },
];

const chartData = [
  { month: "Jan", revenue: 4000, users: 1200 },
  { month: "Feb", revenue: 3800, users: 1350 },
  { month: "Mar", revenue: 5200, users: 1500 },
  { month: "Apr", revenue: 4800, users: 1420 },
  { month: "May", revenue: 6100, users: 1800 },
  { month: "Jun", revenue: 5900, users: 1750 },
  { month: "Jul", revenue: 7200, users: 2100 },
  { month: "Aug", revenue: 6800, users: 2000 },
  { month: "Sep", revenue: 7800, users: 2350 },
];

const recentActivity = [
  {
    user: "Sarah Chen",
    action: "Upgraded to Pro",
    date: "2 minutes ago",
    status: "completed",
  },
  {
    user: "Marcus Webb",
    action: "Created new dashboard",
    date: "15 minutes ago",
    status: "completed",
  },
  {
    user: "Priya Sharma",
    action: "Exported report",
    date: "1 hour ago",
    status: "completed",
  },
  {
    user: "James O'Brien",
    action: "Invited 3 team members",
    date: "3 hours ago",
    status: "pending",
  },
  {
    user: "Elena Rodriguez",
    action: "Connected Stripe integration",
    date: "5 hours ago",
    status: "completed",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Your analytics overview for this month.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">{stat.change}</span> from
                last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Monthly revenue and active users over the last 9 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="fillRevenue"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="month"
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  className="text-xs fill-muted-foreground"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `$${v / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-card)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-primary)"
                  fill="url(#fillRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions from your team and users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((item) => (
                <TableRow key={`${item.user}-${item.action}`}>
                  <TableCell className="font-medium">{item.user}</TableCell>
                  <TableCell>{item.action}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "completed" ? "secondary" : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {item.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
