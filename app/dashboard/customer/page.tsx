"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { CalendarClock, Clock, Package, RefreshCw, Search, ShoppingCart, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for recent orders
const mockOrders = [
  {
    id: "#1234",
    date: "Mar 14, 2023",
    service: "Standard Wash",
    weight: "5 kg",
    amount: "₹999",
    status: "In Progress",
    provider: "CleanCo Laundry",
  },
  {
    id: "#1233",
    date: "Mar 10, 2023",
    service: "Dry Cleaning",
    weight: "3 items",
    amount: "₹1,499",
    status: "Delivered",
    provider: "Fresh Fold Services",
  },
  {
    id: "#1232",
    date: "Mar 5, 2023",
    service: "Standard Wash",
    weight: "4 kg",
    amount: "₹799",
    status: "Delivered",
    provider: "CleanCo Laundry",
  },
  {
    id: "#1231",
    date: "Feb 28, 2023",
    service: "Premium Wash",
    weight: "6 kg",
    amount: "₹1,299",
    status: "Delivered",
    provider: "Sparkle Wash",
  },
  {
    id: "#1230",
    date: "Feb 22, 2023",
    service: "Ironing",
    weight: "10 items",
    amount: "₹599",
    status: "Delivered",
    provider: "Laundry Express",
  },
]

// Mock data for active order tracking
const mockActiveOrder = {
  id: "#1234",
  date: "Mar 14, 2023",
  service: "Standard Wash",
  provider: "CleanCo Laundry",
  progress: 60,
  status: "In Progress",
  timeline: [
    {
      status: "Order Placed",
      date: "Mar 14, 10:30 AM",
      completed: true,
    },
    {
      status: "Picked Up",
      date: "Mar 14, 2:00 PM",
      completed: true,
    },
    {
      status: "Processing",
      date: "Mar 14, 3:30 PM",
      completed: true,
    },
    {
      status: "Out for Delivery",
      date: "Mar 15, 10:00 AM (Est.)",
      completed: false,
    },
    {
      status: "Delivered",
      date: "Mar 15, 12:00 PM (Est.)",
      completed: false,
    },
  ],
}

// Mock data for upcoming pickups/deliveries
const mockSchedule = [
  {
    id: "SCH-001",
    type: "Pickup",
    date: "Tomorrow",
    time: "10:00 AM - 12:00 PM",
    address: "123 Main St, Apt 4B",
    orderId: "#1234",
  },
  {
    id: "SCH-002",
    type: "Delivery",
    date: "Mar 15, 2023",
    time: "1:00 PM - 3:00 PM",
    address: "123 Main St, Apt 4B",
    orderId: "#1233",
  },
]

export default function CustomerDashboard() {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<typeof mockOrders>([])
  const [activeOrder, setActiveOrder] = useState<typeof mockActiveOrder | null>(null)
  const [schedule, setSchedule] = useState<typeof mockSchedule>([])
  const [stats, setStats] = useState({
    activeOrders: 0,
    completedOrders: 0,
    nextPickup: "",
    nextPickupTime: "",
    subscription: "Standard",
    renewalDate: "14 days",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // In a real app, this would be API calls
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOrders(mockOrders)
      setActiveOrder(mockActiveOrder)
      setSchedule(mockSchedule)
      setStats({
        activeOrders: 3,
        completedOrders: 12,
        nextPickup: "Tomorrow",
        nextPickupTime: "10:00 AM - 12:00 PM",
        subscription: "Standard",
        renewalDate: "14 days",
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
      order.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.provider.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && order.status !== "Delivered") ||
      (activeTab === "completed" && order.status === "Delivered")

    return matchesSearch && matchesStatus && matchesTab
  })

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge variant="warning">{status}</Badge>
      case "Delivered":
        return <Badge variant="success">{status}</Badge>
      case "Pending":
        return <Badge variant="outline">{status}</Badge>
      case "Ready":
        return <Badge variant="info">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here&apos;s an overview of your laundry services.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Link href="/dashboard/customer/schedule-pickup">
            <Button>
              <Truck className="mr-2 h-4 w-4" />
              Schedule Pickup
            </Button>
          </Link>
        </div>
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
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => {
                  setActiveTab("active")
                  setStatusFilter("all")
                }}
              >
                View active orders
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedOrders}</div>
              <p className="text-xs text-muted-foreground">+4 from last month</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => {
                  setActiveTab("completed")
                  setStatusFilter("all")
                }}
              >
                View order history
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Pickup</CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.nextPickup}</div>
              <p className="text-xs text-muted-foreground">{stats.nextPickupTime}</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => (window.location.href = "/dashboard/customer/schedule-pickup")}
              >
                Schedule new pickup
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.subscription}</div>
              <p className="text-xs text-muted-foreground">Renews in {stats.renewalDate}</p>
            </CardContent>
            <CardFooter className="p-0">
              <Button
                variant="ghost"
                className="w-full rounded-t-none text-xs h-8 hover:bg-muted"
                onClick={() => (window.location.href = "/dashboard/customer/settings")}
              >
                Manage subscription
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
                <CardTitle>My Orders</CardTitle>
                <CardDescription>View and track your laundry service orders</CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Ready">Ready</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Skeleton loading for orders
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 rounded-lg border p-4">
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <div className="flex items-center justify-end">
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-4 gap-4 rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{order.service}</p>
                      <p className="text-sm text-muted-foreground">{order.weight}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{order.amount}</p>
                      <div className="text-sm">{getStatusBadge(order.status)}</div>
                    </div>
                    <div className="flex items-center justify-end">
                      <Link href={`/dashboard/customer/orders/${order.id.replace("#", "")}`}>
                        <Button variant="outline" size="sm">
                          {order.status === "Delivered" ? "View Details" : "Track Order"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No orders found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
                <Link href="/dashboard/customer/schedule-pickup">
                  <Button>Schedule Your First Pickup</Button>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" disabled={filteredOrders.length === 0}>
              Previous
            </Button>
            <Link href="/dashboard/customer/orders">
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </Link>
            <Button variant="outline" size="sm" disabled={filteredOrders.length === 0}>
              Next
            </Button>
          </CardFooter>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Track your active order #{activeOrder?.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {loading ? (
              // Skeleton loading for tracking
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeOrder ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div>Progress</div>
                    <div className="font-medium">{activeOrder.progress}%</div>
                  </div>
                  <Progress value={activeOrder.progress} className="h-2" />
                </div>
                <div className="space-y-6">
                  {activeOrder.timeline.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                          step.completed ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                        }`}
                      >
                        {step.completed ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span className="h-4 w-4 text-muted-foreground text-xs flex items-center justify-center">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{step.status}</p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Link href={`/dashboard/customer/orders/${activeOrder.id.replace("#", "")}`}>
                    <Button>View Order Details</Button>
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No active orders</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You don't have any orders in progress at the moment
                </p>
                <Link href="/dashboard/customer/schedule-pickup">
                  <Button>Schedule a Pickup</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>Your upcoming pickups and deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            // Skeleton loading for schedule
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
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
          ) : schedule.length > 0 ? (
            <div className="space-y-4">
              {schedule.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {item.type === "Pickup" ? (
                      <Truck className="h-5 w-5 text-primary" />
                    ) : (
                      <Package className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {item.type} - {item.date}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                    <p className="text-xs text-muted-foreground">{item.address}</p>
                  </div>
                  <Link href={`/dashboard/customer/orders/${item.orderId.replace("#", "")}`}>
                    <Button variant="outline" size="sm">
                      View Order
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No upcoming schedule</h3>
              <p className="text-sm text-muted-foreground mb-4">You don't have any pickups or deliveries scheduled</p>
              <Link href="/dashboard/customer/schedule-pickup">
                <Button>Schedule a Pickup</Button>
              </Link>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Link href="/dashboard/customer/schedule-pickup" className="w-full">
            <Button variant="outline" className="w-full">
              <Truck className="mr-2 h-4 w-4" />
              Schedule New Pickup
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

