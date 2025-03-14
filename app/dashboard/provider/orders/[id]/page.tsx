"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Download, MapPin, Phone, Printer, Truck, User, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Mock data for the order
const orderData = {
  id: "1234",
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  },
  date: "Mar 14, 2023",
  time: "10:30 AM",
  status: "Processing",
  service: "Standard Wash",
  weight: "5 kg",
  amount: "$24.99",
  paymentMethod: "Visa ending in 4242",
  paymentStatus: "Paid",
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
  items: [
    { name: "T-shirts", quantity: 3, price: "$9.00" },
    { name: "Pants", quantity: 2, price: "$8.00" },
    { name: "Shirts", quantity: 2, price: "$6.00" },
    { name: "Socks (pairs)", quantity: 4, price: "$2.00" },
  ],
  address: {
    type: "Home",
    street: "123 Main St, Apt 4B",
    city: "New York, NY 10001",
    phone: "+1 (555) 123-4567",
  },
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("details")
  const [currentStatus, setCurrentStatus] = useState(orderData.status)

  // Calculate progress percentage based on completed steps
  const statusIndex = orderData.timeline.findIndex((step) => step.status === currentStatus)
  const completedSteps = statusIndex + 1
  const totalSteps = orderData.timeline.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  const handleUpdateStatus = (newStatus: string) => {
    setCurrentStatus(newStatus)

    toast({
      title: "Order Status Updated",
      description: `Order #${params.id} status changed to ${newStatus}.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/provider/orders">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Order #{params.id}</h2>
            <p className="text-muted-foreground">
              {orderData.date} • {currentStatus}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Link href={`/dashboard/provider/orders/${params.id}/invoice`}>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Invoice
            </Button>
          </Link>
          <Button size="sm">Contact Customer</Button>
        </div>
      </div>

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
              {orderData.timeline.map((step, index) => {
                const isCompleted = index <= statusIndex
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                        isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                      }`}
                    >
                      {isCompleted ? (
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
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">{step.status}</p>
                      <p className="text-sm text-muted-foreground">
                        {step.estimated ? "Estimated: " : ""}
                        {step.date}, {step.time}
                      </p>
                    </div>
                    {!isCompleted && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(step.status)}>
                        Mark as {step.status}
                      </Button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="customer">Customer Info</TabsTrigger>
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
                  <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                  <p className="text-sm font-medium">{orderData.paymentStatus}</p>
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

        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{orderData.customer.name}</h3>
                  <div className="text-sm text-muted-foreground">Customer since January 2023</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{orderData.customer.phone}</p>
                </div>
                <div className="flex items-center gap-2">
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
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <p className="text-sm">{orderData.customer.email}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Order History</h4>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-3 text-sm font-medium">
                    <div>Order ID</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-4 p-3 text-sm">
                    <div>#{orderData.id}</div>
                    <div>{orderData.date}</div>
                    <div>{orderData.amount}</div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                        ${currentStatus === "Pending" ? "bg-orange-100 text-orange-800" : ""}
                        ${currentStatus === "Processing" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${currentStatus === "Ready" ? "bg-blue-100 text-blue-800" : ""}
                        ${currentStatus === "Delivered" ? "bg-green-100 text-green-800" : ""}
                      `}
                      >
                        {currentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-sm">
                    <div>#1233</div>
                    <div>Mar 10, 2023</div>
                    <div>$34.99</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Delivered
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 p-3 text-sm">
                    <div>#1232</div>
                    <div>Mar 5, 2023</div>
                    <div>$19.99</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full">Contact Customer</Button>
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

              <div className="flex justify-end gap-2">
                <Button variant="outline">Reschedule Delivery</Button>
                <Button>Assign Driver</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

