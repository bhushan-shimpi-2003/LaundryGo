"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Download, MapPin, Package, Truck, Banknote, CreditCard } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock order data
const order = {
  id: "ORD-12345",
  status: "in-progress",
  paymentStatus: "paid",
  paymentMethod: "card",
  service: "Premium Wash",
  items: [
    {
      id: "item-1",
      name: "T-shirts",
      quantity: 5,
      price: 2.5,
    },
    {
      id: "item-2",
      name: "Pants",
      quantity: 3,
      price: 4.0,
    },
    {
      id: "item-3",
      name: "Dresses",
      quantity: 2,
      price: 6.0,
    },
  ],
  subtotal: 29.5,
  tax: 2.36,
  total: 31.86,
  pickupDate: "2023-12-15",
  pickupTime: "10:00 AM - 12:00 PM",
  deliveryDate: "2023-12-17",
  deliveryTime: "2:00 PM - 4:00 PM",
  address: "123 Main St, Apt 4B, New York, NY 10001",
  trackingEvents: [
    {
      id: "event-1",
      status: "Order Placed",
      date: "2023-12-14",
      time: "3:45 PM",
      description: "Your order has been received and is being processed.",
    },
    {
      id: "event-2",
      status: "Pickup Scheduled",
      date: "2023-12-14",
      time: "4:00 PM",
      description: "Your pickup has been scheduled for Dec 15, between 10:00 AM - 12:00 PM.",
    },
    {
      id: "event-3",
      status: "Picked Up",
      date: "2023-12-15",
      time: "11:30 AM",
      description: "Your laundry has been picked up and is on its way to our facility.",
    },
    {
      id: "event-4",
      status: "Processing",
      date: "2023-12-15",
      time: "2:00 PM",
      description: "Your laundry is being processed at our facility.",
    },
  ],
}

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

export default function OrderDetailsPage({ params }) {
  const orderId = params.id

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/customer/orders">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order #{orderId}</h2>
          <p className="text-muted-foreground">View and track your order details</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
            <CardDescription>Current status of your order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Status:</span>
              <Badge variant={getStatusBadgeVariant(order.status)}>
                {order.status === "in-progress" ? "In Progress" : order.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Payment Status:</span>
              <Badge variant={getPaymentStatusBadgeVariant(order.paymentStatus)}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Payment Method:</span>
              <div className="flex items-center">
                {order.paymentMethod === "card" ? (
                  <CreditCard className="mr-2 h-4 w-4" />
                ) : (
                  <Banknote className="mr-2 h-4 w-4" />
                )}
                {order.paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Service:</span>
              <span>{order.service}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Order Date:</span>
              <span>{order.trackingEvents[0].date}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pickup & Delivery</CardTitle>
            <CardDescription>Scheduled times for your order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Pickup:</span>
                <span className="ml-auto">{order.pickupDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Time:</span>
                <span className="ml-auto">{order.pickupTime}</span>
              </div>
            </div>

            <div className="rounded-md border p-4 space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Delivery:</span>
                <span className="ml-auto">{order.deliveryDate}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Time:</span>
                <span className="ml-auto">{order.deliveryTime}</span>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex items-start">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium block">Address:</span>
                  <span className="text-sm text-muted-foreground">{order.address}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Items included in your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left text-sm font-medium">Item</th>
                      <th className="px-4 py-3 text-center text-sm font-medium">Quantity</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Price</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-b last:border-0">
                        <td className="px-4 py-3 text-left text-sm">{item.name}</td>
                        <td className="px-4 py-3 text-center text-sm">{item.quantity}</td>
                        <td className="px-4 py-3 text-right text-sm">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right text-sm">${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                        Subtotal
                      </td>
                      <td className="px-4 py-3 text-right text-sm">${order.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                        Tax
                      </td>
                      <td className="px-4 py-3 text-right text-sm">${order.tax.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                        Total
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-bold">${order.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/customer/orders/${orderId}/invoice`}>
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Track the progress of your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.trackingEvents.map((event, index) => (
                <div key={event.id} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="rounded-full h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                      {event.status === "Order Placed" ? (
                        <Package className="h-4 w-4" />
                      ) : event.status === "Pickup Scheduled" ? (
                        <Calendar className="h-4 w-4" />
                      ) : event.status === "Picked Up" ? (
                        <Truck className="h-4 w-4" />
                      ) : (
                        <Package className="h-4 w-4" />
                      )}
                    </div>
                    {index < order.trackingEvents.length - 1 && <div className="w-0.5 bg-border flex-1 my-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center">
                      <h4 className="font-medium">{event.status}</h4>
                      <div className="ml-auto text-sm text-muted-foreground">
                        {event.date}, {event.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

