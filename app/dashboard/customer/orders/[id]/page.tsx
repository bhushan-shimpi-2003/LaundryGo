"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Printer,
  Shirt,
  Truck,
  FileText,
  Banknote,
  CreditCard,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types for the order data
interface OrderItem {
  name: string
  quantity: number
  price: number | string
}

interface OrderAddress {
  type: string
  street: string
  city: string
  phone: string
}

interface OrderProvider {
  name: string
  address: string
  phone: string
  rating: number
}

interface TimelineEvent {
  status: string
  date: string
  time: string
  completed: boolean
  estimated?: boolean
}

interface Order {
  id: string
  date: string
  status: string
  service: string
  weight: string
  amount: string
  paymentMethod: "cod" | "card"
  paymentStatus: "pending" | "paid" | "failed"
  specialInstructions: string
  timeline: TimelineEvent[]
  provider: OrderProvider
  items: OrderItem[]
  address: OrderAddress
}

// Mock data for the order
const orderData: Order = {
  id: "1234",
  date: "Mar 14, 2023",
  status: "In Progress",
  service: "Standard Wash",
  weight: "5 kg",
  amount: "₹999",
  paymentMethod: "card",
  paymentStatus: "paid",
  specialInstructions: "Please handle with care. There are some delicate items.",
  timeline: [
    {
      status: "Order Placed",
      date: "Mar 14, 2023",
      time: "10:30 AM",
      completed: true,
    },
    {
      status: "Picked Up",
      date: "Mar 14, 2023",
      time: "2:00 PM",
      completed: true,
    },
    {
      status: "Processing",
      date: "Mar 14, 2023",
      time: "3:30 PM",
      completed: true,
    },
    {
      status: "Out for Delivery",
      date: "Mar 15, 2023",
      time: "10:00 AM",
      completed: false,
      estimated: true,
    },
    {
      status: "Delivered",
      date: "Mar 15, 2023",
      time: "12:00 PM",
      completed: false,
      estimated: true,
    },
  ],
  provider: {
    name: "CleanCo Laundry",
    address: "789 Laundry St, Mumbai, MH 400001",
    phone: "+91 98765 43210",
    rating: 4.8,
  },
  items: [
    { name: "T-shirts", quantity: 3, price: "₹300" },
    { name: "Pants", quantity: 2, price: "₹400" },
    { name: "Shirts", quantity: 2, price: "₹200" },
    { name: "Socks (pairs)", quantity: 4, price: "₹100" },
  ],
  address: {
    type: "Home",
    street: "123 Main St, Apt 4B",
    city: "Mumbai, MH 400001",
    phone: "+91 98765 12345",
  },
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("details")
  const printRef = React.useRef<HTMLDivElement>(null)

  // Calculate progress percentage based on completed steps
  const completedSteps = orderData.timeline.filter((step) => step.completed).length
  const totalSteps = orderData.timeline.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  // Get current status
  const currentStatus = orderData.timeline.find((step) => !step.completed)?.status || "Delivered"

  // Handle print functionality
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
      toast({
        title: "Print initiated",
        description: "Your order details have been sent to the printer.",
      })
    }
  }

  // Handle contact support
  const handleContactSupport = () => {
    router.push(`/dashboard/customer/support?order=${params.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/customer/orders">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Order #{params.id}</h2>
            <p className="text-muted-foreground">
              {orderData.date} • {orderData.status}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Link href={`/dashboard/customer/orders/${params.id}/invoice`}>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Invoice
            </Button>
          </Link>
          <Button size="sm" onClick={handleContactSupport}>
            Contact Support
          </Button>
        </div>
      </div>

      <div ref={printRef}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Order Status</CardTitle>
            <CardDescription>
              Current status: <span className="font-medium text-primary">{currentStatus}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>Progress</div>
                  <div className="font-medium">{progressPercentage.toFixed(0)}%</div>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="space-y-6">
                {orderData.timeline.map((step, index) => (
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
                      <p className="text-sm text-muted-foreground">
                        {step.estimated ? "Estimated: " : ""}
                        {step.date}, {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Order Details</TabsTrigger>
            <TabsTrigger value="provider">Service Provider</TabsTrigger>
            <TabsTrigger value="address">Pickup & Delivery</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Service Type</p>
                    <p className="text-sm font-medium">{orderData.service}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Weight</p>
                    <p className="text-sm font-medium">{orderData.weight}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount</p>
                    <p className="text-sm font-medium">{orderData.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                    <div className="flex items-center">
                      {orderData.paymentMethod === "cod" ? (
                        <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
                      ) : (
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <p className="text-sm font-medium">
                        {orderData.paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                    <Badge
                      variant={
                        orderData.paymentStatus === "paid"
                          ? "success"
                          : orderData.paymentStatus === "failed"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {orderData.paymentStatus === "paid"
                        ? "Paid"
                        : orderData.paymentStatus === "failed"
                          ? "Failed"
                          : "Pending"}
                    </Badge>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Special Instructions</p>
                  <p className="text-sm mt-1">{orderData.specialInstructions}</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-2">Items</p>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 p-3 text-sm font-medium">
                      <div>Item</div>
                      <div className="text-center">Quantity</div>
                      <div className="text-right">Price</div>
                    </div>
                    <Separator />
                    {orderData.items.map((item, index) => (
                      <div key={index} className="grid grid-cols-3 p-3 text-sm">
                        <div>{item.name}</div>
                        <div className="text-center">{item.quantity}</div>
                        <div className="text-right">{item.price}</div>
                      </div>
                    ))}
                    <Separator />
                    <div className="grid grid-cols-3 p-3 text-sm font-medium">
                      <div className="col-span-2 text-right">Total:</div>
                      <div className="text-right">{orderData.amount}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="provider" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Service Provider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shirt className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{orderData.provider.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
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
                        className="h-4 w-4 text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="ml-1">{orderData.provider.rating} / 5</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{orderData.provider.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{orderData.provider.phone}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">About Provider</h4>
                  <p className="text-sm text-muted-foreground">
                    CleanCo Laundry is a premium laundry service provider with over 5 years of experience. We specialize
                    in handling all types of fabrics with care and use eco-friendly detergents.
                  </p>
                </div>

                <Button className="w-full" onClick={handleContactSupport}>
                  Contact Provider
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pickup & Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Pickup Address
                    </h3>
                    <div className="rounded-lg border p-4">
                      <div className="font-medium">{orderData.address.type}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {orderData.address.street}
                        <br />
                        {orderData.address.city}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {orderData.address.phone}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Payment Method</h3>
                    <div className="flex items-center">
                      {orderData.paymentMethod === "cod" ? (
                        <>
                          <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>Cash on Delivery</p>
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                          <p>Credit/Debit Card</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Payment Status</h3>
                    <Badge
                      variant={
                        orderData.paymentStatus === "paid"
                          ? "success"
                          : orderData.paymentStatus === "failed"
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {orderData.paymentStatus === "paid"
                        ? "Paid"
                        : orderData.paymentStatus === "failed"
                          ? "Failed"
                          : "Pending"}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Delivery Address
                    </h3>
                    <div className="rounded-lg border p-4">
                      <div className="font-medium">{orderData.address.type}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {orderData.address.street}
                        <br />
                        {orderData.address.city}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        {orderData.address.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="font-medium">Pickup</div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {orderData.timeline[1].date}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {orderData.timeline[1].time}
                      </div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="font-medium">Delivery (Estimated)</div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        {orderData.timeline[4].date}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {orderData.timeline[4].time}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
