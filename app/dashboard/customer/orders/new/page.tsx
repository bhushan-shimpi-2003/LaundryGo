"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Filter, Search, Banknote, CreditCard } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock orders data
const orders = [
  {
    id: "ORD-12345",
    date: "2023-12-14",
    service: "Premium Wash",
    status: "in-progress",
    paymentStatus: "paid",
    paymentMethod: "card",
    total: 31.86,
  },
  {
    id: "ORD-12344",
    date: "2023-12-10",
    service: "Standard Wash",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "card",
    total: 19.99,
  },
  {
    id: "ORD-12343",
    date: "2023-12-05",
    service: "Dry Cleaning",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "card",
    total: 45.5,
  },
  {
    id: "ORD-12342",
    date: "2023-11-28",
    service: "Wash & Iron",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "card",
    total: 27.75,
  },
  {
    id: "ORD-12341",
    date: "2023-11-20",
    service: "Standard Wash",
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "cod",
    total: 18.5,
  },
]

// Helper function to get status badge variant
function getStatusBadgeVariant(status) {
  switch (status) {
    case "pending":
      return "outline"
    case "scheduled":
      return "secondary"
    case "picked-up":
      return "default"
    case "in-progress":
      return "default"
    case "ready":
      return "success"
    case "delivered":
      return "success"
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

// Helper function to get payment status badge variant
function getPaymentStatusBadgeVariant(status) {
  switch (status) {
    case "paid":
      return "success"
    case "pending":
      return "warning"
    case "failed":
      return "destructive"
    default:
      return "outline"
  }
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Orders</h2>
        <p className="text-muted-foreground">View and track your laundry orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="grid gap-2 flex-1">
          <Input
            placeholder="Search orders..."
            className="w-full"
            prefix={<Search className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="grid gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/dashboard/customer/schedule-pickup">Schedule Pickup</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">Order #{order.id}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      {order.date}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {order.status === "in-progress" ? "In Progress" : order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid gap-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{order.service}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Payment:</span>
                    <div className="flex items-center">
                      {order.paymentMethod === "card" ? (
                        <CreditCard className="mr-1 h-3.5 w-3.5" />
                      ) : (
                        <Banknote className="mr-1 h-3.5 w-3.5" />
                      )}
                      <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)} className="ml-2">
                        {order.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/dashboard/customer/orders/${order.id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="active" className="space-y-4 mt-4">
          {orders
            .filter((order) => ["pending", "scheduled", "picked-up", "in-progress", "ready"].includes(order.status))
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Order #{order.id}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {order.date}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status === "in-progress" ? "In Progress" : order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{order.service}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Payment:</span>
                      <div className="flex items-center">
                        {order.paymentMethod === "card" ? (
                          <CreditCard className="mr-1 h-3.5 w-3.5" />
                        ) : (
                          <Banknote className="mr-1 h-3.5 w-3.5" />
                        )}
                        <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)} className="ml-2">
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/dashboard/customer/orders/${order.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {orders
            .filter((order) => order.status === "delivered")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Order #{order.id}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {order.date}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status === "in-progress" ? "In Progress" : order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{order.service}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Payment:</span>
                      <div className="flex items-center">
                        {order.paymentMethod === "card" ? (
                          <CreditCard className="mr-1 h-3.5 w-3.5" />
                        ) : (
                          <Banknote className="mr-1 h-3.5 w-3.5" />
                        )}
                        <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)} className="ml-2">
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/dashboard/customer/orders/${order.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="cancelled" className="space-y-4 mt-4">
          {orders
            .filter((order) => order.status === "cancelled")
            .map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Order #{order.id}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="mr-1 h-3.5 w-3.5" />
                        {order.date}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status === "in-progress" ? "In Progress" : order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid gap-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Service:</span>
                      <span className="font-medium">{order.service}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Payment:</span>
                      <div className="flex items-center">
                        {order.paymentMethod === "card" ? (
                          <CreditCard className="mr-1 h-3.5 w-3.5" />
                        ) : (
                          <Banknote className="mr-1 h-3.5 w-3.5" />
                        )}
                        <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)} className="ml-2">
                          {order.paymentStatus}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild className="w-full">
                    <Link href={`/dashboard/customer/orders/${order.id}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

