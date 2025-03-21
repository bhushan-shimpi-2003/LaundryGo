"use client"

import { useState, useEffect } from "react"
import { Clock, IndianRupee, Package, RefreshCw, Search, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for orders
const mockOrders = [
  {
    id: "#1234",
    customer: "Rahul Sharma",
    service: "Standard Wash",
    status: "Processing",
    amount: "₹450",
    date: "2023-05-15",
  },
  {
    id: "#1233",
    customer: "Priya Patel",
    service: "Dry Cleaning",
    status: "Ready",
    amount: "₹750",
    date: "2023-05-14",
  },
  {
    id: "#1232",
    customer: "Amit Kumar",
    service: "Premium Wash",
    status: "Pending",
    amount: "₹650",
    date: "2023-05-14",
  },
  {
    id: "#1231",
    customer: "Neha Singh",
    service: "Standard Wash",
    status: "Delivered",
    amount: "₹450",
    date: "2023-05-13",
  },
  {
    id: "#1230",
    customer: "Vikram Mehta",
    service: "Ironing",
    status: "Delivered",
    amount: "₹250",
    date: "2023-05-13",
  },
]

// Mock data for schedule
const mockSchedule = [
  {
    id: "SCH-001",
    type: "Pickup",
    customer: "Rahul Sharma",
    timeSlot: "10:00 AM - 12:00 PM",
    address: "123 Andheri East, Mumbai 400069",
    orderId: "#1234",
  },
  {
    id: "SCH-002",
    type: "Delivery",
    customer: "Priya Patel",
    timeSlot: "1:00 PM - 3:00 PM",
    address: "456 Bandra West, Mumbai 400050",
    orderId: "#1233",
  },
  {
    id: "SCH-003",
    type: "Pickup",
    customer: "Amit Kumar",
    timeSlot: "3:30 PM - 5:30 PM",
    address: "789 Powai, Mumbai 400076",
    orderId: "#1232",
  },
  {
    id: "SCH-004",
    type: "Delivery",
    customer: "Neha Singh",
    timeSlot: "5:00 PM - 7:00 PM",
    address: "321 Juhu, Mumbai 400049",
    orderId: "#1231",
  },
]

export default function ProviderDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<typeof mockOrders>([])
  const [schedule, setSchedule] = useState<typeof mockSchedule>([])
  const [stats, setStats] = useState({
    pendingOrders: 0,
    processingOrders: 0,
    totalCustomers: 0,
    revenue: 0,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [refreshing, setRefreshing] = useState(false)

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // In a real app, this would be API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOrders(mockOrders)
      setSchedule(mockSchedule)
      setStats({
        pendingOrders: 8,
        processingOrders: 12,
        totalCustomers: 245,
        revenue: 432550,
      })
      setLoading(false)
    }

    loadData()
  }, [])

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            {status}
          </Badge>
        )
      case "Processing":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {status}
          </Badge>
        )
      case "Ready":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {status}
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, Swachh Laundry Services!</h2>
          <p className="text-muted-foreground">Here&apos;s an overview of your laundry business.</p>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {loading ? (
        // Skeleton loading state
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => router.push("/dashboard/provider/orders?status=pending")}
              >
                View all pending orders
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.processingOrders}</div>
              <p className="text-xs text-muted-foreground">+3 from yesterday</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => router.push("/dashboard/provider/orders?status=processing")}
              >
                View all processing orders
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">+12 from last month</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => router.push("/dashboard/provider/customers")}
              >
                View customer list
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString("en-IN")}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => router.push("/dashboard/provider/reports")}
              >
                View financial reports
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage your recent laundry service orders</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-8 w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Ready">Ready</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Skeleton loading for table
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-5 w-[80px]" />
                    <Skeleton className="h-8 w-[70px]" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.service}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell className="text-right">{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/provider/orders/${order.id.replace("#", "")}`)}
                          >
                            {order.status === "Delivered" ? "View" : "Update"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                        No orders found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/provider/orders")}>
              View All Orders
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Pickups and deliveries for today</CardDescription>
              </div>
              <Tabs defaultValue="all" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Skeleton loading for schedule
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-[140px]" />
                      <Skeleton className="h-3 w-[100px]" />
                      <Skeleton className="h-3 w-[180px]" />
                    </div>
                    <Skeleton className="h-8 w-[70px]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {schedule.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">
                        {item.type} - {item.customer}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.timeSlot}</p>
                      <p className="text-xs text-muted-foreground">{item.address}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/dashboard/provider/orders/${item.orderId.replace("#", "")}`)}
                    >
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/provider/schedule")}>
              View Full Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

