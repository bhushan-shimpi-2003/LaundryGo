"use client"

import { useState } from "react"
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  ArrowRight,
  ArrowUpRight,
  BarChart,
  Calendar,
  LineChart,
  PieChart,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminDashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("month")

  // Mock data for recent providers
  const recentProviders = [
    {
      id: "SP001",
      name: "CleanCo Laundry",
      location: "New York, NY",
      status: "Active",
      joinDate: "Mar 15, 2023",
    },
    {
      id: "SP002",
      name: "Fresh Fold Services",
      location: "Los Angeles, CA",
      status: "Active",
      joinDate: "Mar 14, 2023",
    },
    {
      id: "SP003",
      name: "Sparkle Wash",
      location: "Chicago, IL",
      status: "Pending",
      joinDate: "Mar 13, 2023",
    },
    {
      id: "SP004",
      name: "Laundry Express",
      location: "Miami, FL",
      status: "Active",
      joinDate: "Mar 12, 2023",
    },
    {
      id: "SP005",
      name: "Wash & Fold Co.",
      location: "Seattle, WA",
      status: "Suspended",
      joinDate: "Mar 10, 2023",
    },
  ]

  // Mock data for recent orders
  const recentOrders = [
    {
      id: "ORD-1234",
      customer: "Sarah Johnson",
      provider: "CleanCo Laundry",
      service: "Standard Wash",
      date: "Mar 23, 2023",
      amount: "$24.99",
      status: "Completed",
    },
    {
      id: "ORD-1235",
      customer: "Michael Brown",
      provider: "Fresh Fold Services",
      service: "Dry Cleaning",
      date: "Mar 22, 2023",
      amount: "$34.99",
      status: "In Progress",
    },
    {
      id: "ORD-1236",
      customer: "Emily Davis",
      provider: "Sparkle Wash",
      service: "Premium Wash",
      date: "Mar 22, 2023",
      amount: "$29.99",
      status: "Scheduled",
    },
    {
      id: "ORD-1237",
      customer: "David Wilson",
      provider: "Laundry Express",
      service: "Ironing",
      date: "Mar 21, 2023",
      amount: "$19.99",
      status: "Completed",
    },
    {
      id: "ORD-1238",
      customer: "Jessica Martinez",
      provider: "CleanCo Laundry",
      service: "Standard Wash",
      date: "Mar 21, 2023",
      amount: "$24.99",
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => router.push("/dashboard/admin/reports")}>
            <LineChart className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/customers")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+180 from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/providers")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+3 from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/orders")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+456 from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/analytics")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,325.50</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Service Providers</CardTitle>
              <CardDescription>Manage laundry service providers on the platform</CardDescription>
            </div>
            <Button size="sm" onClick={() => router.push("/dashboard/admin/providers/new")}>
              <Package className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">#{provider.id}</TableCell>
                    <TableCell>{provider.name}</TableCell>
                    <TableCell>{provider.location}</TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${provider.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          ${provider.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                          ${provider.status === "Suspended" ? "bg-red-100 text-red-800" : ""}
                        `}
                      >
                        {provider.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/dashboard/admin/providers/${provider.id}`)}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/providers")}>
                View All Providers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders across the platform</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/orders")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{order.customer}</span>
                      <span>•</span>
                      <span>{order.provider}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{order.date}</span>
                      <span>•</span>
                      <span>{order.amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${order.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                        ${order.status === "In Progress" ? "bg-blue-100 text-blue-800" : ""}
                        ${order.status === "Scheduled" ? "bg-yellow-100 text-yellow-800" : ""}
                      `}
                    >
                      {order.status}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => router.push(`/dashboard/admin/orders/${order.id}`)}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                      <span className="sr-only">View order</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Orders by service type</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-primary/20">
              <div className="flex flex-col items-center">
                <PieChart className="h-10 w-10 text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Service breakdown</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="grid w-full grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-primary"></div>
                <span>Standard Wash (45%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                <span>Premium Wash (25%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                <span>Dry Cleaning (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                <span>Ironing (10%)</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New customer signups over time</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="flex flex-col items-center">
              <BarChart className="h-10 w-10 text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">Monthly growth trend</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full text-sm">
              <div className="mb-2 flex items-center justify-between">
                <span>Current month:</span>
                <span className="font-medium">180 new customers</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span>Previous month:</span>
                <span className="font-medium">165 new customers</span>
              </div>
              <div className="flex items-center justify-between text-green-500">
                <span>Growth rate:</span>
                <span className="font-medium">+9.1%</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Platform revenue over time</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="flex flex-col items-center">
              <LineChart className="h-10 w-10 text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">Monthly revenue trend</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full text-sm">
              <div className="mb-2 flex items-center justify-between">
                <span>Current month:</span>
                <span className="font-medium">$24,325.50</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span>Previous month:</span>
                <span className="font-medium">$21,720.25</span>
              </div>
              <div className="flex items-center justify-between text-green-500">
                <span>Growth rate:</span>
                <span className="font-medium">+12.0%</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

