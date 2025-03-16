"use client"

import { useState } from "react"
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
  Calendar,
  LineChart,
  PieChart,
  TrendingUp,
  Settings,
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
      location: "Mumbai, MH",
      status: "Active",
      joinDate: "Mar 15, 2023",
    },
    {
      id: "SP002",
      name: "Fresh Fold Services",
      location: "Delhi, DL",
      status: "Active",
      joinDate: "Mar 14, 2023",
    },
    {
      id: "SP003",
      name: "Sparkle Wash",
      location: "Bangalore, KA",
      status: "Pending",
      joinDate: "Mar 13, 2023",
    },
    {
      id: "SP004",
      name: "Laundry Express",
      location: "Chennai, TN",
      status: "Active",
      joinDate: "Mar 12, 2023",
    },
    {
      id: "SP005",
      name: "Wash & Fold Co.",
      location: "Hyderabad, TS",
      status: "Suspended",
      joinDate: "Mar 10, 2023",
    },
  ]

  // Mock data for recent orders
  const recentOrders = [
    {
      id: "ORD-1234",
      customer: "Rahul Sharma",
      provider: "CleanCo Laundry",
      service: "Standard Wash",
      date: "Mar 23, 2023",
      amount: "₹999",
      status: "Completed",
    },
    {
      id: "ORD-1235",
      customer: "Priya Patel",
      provider: "Fresh Fold Services",
      service: "Dry Cleaning",
      date: "Mar 22, 2023",
      amount: "₹1,499",
      status: "In Progress",
    },
    {
      id: "ORD-1236",
      customer: "Amit Kumar",
      provider: "Sparkle Wash",
      service: "Premium Wash",
      date: "Mar 22, 2023",
      amount: "₹1,299",
      status: "Scheduled",
    },
    {
      id: "ORD-1237",
      customer: "Neha Singh",
      provider: "Laundry Express",
      service: "Ironing",
      date: "Mar 21, 2023",
      amount: "₹799",
      status: "Completed",
    },
    {
      id: "ORD-1238",
      customer: "Vikram Mehta",
      provider: "CleanCo Laundry",
      service: "Standard Wash",
      date: "Mar 21, 2023",
      amount: "₹999",
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
          <Button onClick={() => router.push("/dashboard/admin/reports")} className="bg-orange-600 hover:bg-orange-700">
            <LineChart className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer border-orange-200 hover:border-orange-500 transition-colors"
          onClick={() => router.push("/dashboard/admin/customers")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+180 from last month</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="font-medium">85%</span> active accounts
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer border-green-200 hover:border-green-500 transition-colors"
          onClick={() => router.push("/dashboard/admin/providers")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+3 from last month</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="font-medium">92%</span> approval rate
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer border-blue-200 hover:border-blue-500 transition-colors"
          onClick={() => router.push("/dashboard/admin/orders")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+456 from last month</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="font-medium">98.5%</span> completion rate
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer border-orange-200 hover:border-orange-500 transition-colors"
          onClick={() => router.push("/dashboard/admin/analytics")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹24,32,550</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% from last month</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <span className="font-medium">₹1,25,000</span> avg. daily revenue
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200 mb-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 border-green-200 hover:border-green-500 hover:bg-green-50"
              onClick={() => router.push("/dashboard/admin/providers/new")}
            >
              <Package className="h-8 w-8 mb-2 text-green-500" />
              <span>Add Provider</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 border-blue-200 hover:border-blue-500 hover:bg-blue-50"
              onClick={() => router.push("/dashboard/admin/schedule-pickup")}
            >
              <Calendar className="h-8 w-8 mb-2 text-blue-500" />
              <span>Schedule Pickup</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 border-orange-200 hover:border-orange-500 hover:bg-orange-50"
              onClick={() => router.push("/dashboard/admin/reports")}
            >
              <LineChart className="h-8 w-8 mb-2 text-orange-500" />
              <span>Generate Report</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-4 border-purple-200 hover:border-purple-500 hover:bg-purple-50"
              onClick={() => router.push("/dashboard/admin/settings")}
            >
              <Settings className="h-8 w-8 mb-2 text-purple-500" />
              <span>Platform Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-4 border-green-200 hover:border-green-300 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Service Providers</CardTitle>
            <CardDescription>Manage laundry service providers on the platform</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/providers")}>
              View All
            </Button>
            <Button
              size="sm"
              onClick={() => router.push("/dashboard/admin/providers/new")}
              className="bg-green-600 hover:bg-green-700"
            >
              <Package className="mr-2 h-4 w-4" />
              Add Provider
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProviders.map((provider) => (
                <TableRow
                  key={provider.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/dashboard/admin/providers/${provider.id}`)}
                >
                  <TableCell className="font-medium">#{provider.id}</TableCell>
                  <TableCell>{provider.name}</TableCell>
                  <TableCell>{provider.location}</TableCell>
                  <TableCell>{provider.joinDate}</TableCell>
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
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/dashboard/admin/providers/${provider.id}`)
                      }}
                    >
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 border-blue-200 hover:border-blue-300 transition-colors">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders across the platform</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/orders")}>
                View All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-lg border p-3 hover:border-blue-300 hover:bg-blue-50/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/dashboard/admin/orders/${order.id}`)}
              >
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
                    onClick={(e) => {
                      e.stopPropagation()
                      router.push(`/dashboard/admin/orders/${order.id}`)
                    }}
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-1 border-orange-200 hover:border-orange-300 transition-colors">
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
            <CardDescription>Orders by service type</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-orange-500/20 relative">
              <div className="absolute inset-0 rounded-full border-8 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent transform rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-r-blue-500 border-b-transparent border-l-transparent transform rotate-[135deg]"></div>
              <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-r-transparent border-b-green-500 border-l-transparent transform rotate-[225deg]"></div>
              <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-r-transparent border-b-transparent border-l-yellow-500 transform rotate-[315deg]"></div>
              <div className="flex flex-col items-center">
                <PieChart className="h-10 w-10 text-orange-500" />
                <p className="mt-2 text-sm text-muted-foreground">Service breakdown</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="grid w-full grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-orange-500"></div>
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

        <Card className="col-span-1 lg:col-span-1 border-green-200 hover:border-green-300 transition-colors">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New customer signups over time</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="w-full h-40 flex items-end justify-between px-2">
              <div className="flex flex-col items-center">
                <div className="w-8 bg-green-200 rounded-t" style={{ height: "30%" }}></div>
                <span className="text-xs mt-1">Jan</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-green-300 rounded-t" style={{ height: "45%" }}></div>
                <span className="text-xs mt-1">Feb</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-green-400 rounded-t" style={{ height: "60%" }}></div>
                <span className="text-xs mt-1">Mar</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-green-500 rounded-t" style={{ height: "80%" }}></div>
                <span className="text-xs mt-1">Apr</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-green-600 rounded-t" style={{ height: "100%" }}></div>
                <span className="text-xs mt-1">May</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 bg-green-700 rounded-t" style={{ height: "90%" }}></div>
                <span className="text-xs mt-1">Jun</span>
              </div>
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

        <Card className="col-span-1 lg:col-span-1 border-blue-200 hover:border-blue-300 transition-colors">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Platform revenue over time</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[300px] items-center justify-center">
            <div className="w-full h-40 relative">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-muted"></div>
              <div className="absolute bottom-1/3 left-0 right-0 h-px bg-muted"></div>
              <div className="absolute bottom-2/3 left-0 right-0 h-px bg-muted"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-muted"></div>

              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                  d="M0,35 L10,32 L20,33 L30,30 L40,28 L50,25 L60,20 L70,15 L80,10 L90,8 L100,5"
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth="2"
                />
                <path
                  d="M0,35 L10,32 L20,33 L30,30 L40,28 L50,25 L60,20 L70,15 L80,10 L90,8 L100,5 L100,40 L0,40 Z"
                  fill="rgba(59, 130, 246, 0.1)"
                  stroke="none"
                />
              </svg>
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full text-sm">
              <div className="mb-2 flex items-center justify-between">
                <span>Current month:</span>
                <span className="font-medium">₹24,32,550</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span>Previous month:</span>
                <span className="font-medium">₹21,72,025</span>
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

