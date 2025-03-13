import Link from "next/link"
import { CalendarClock, Package, ShoppingCart, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, John!</h2>
          <p className="text-muted-foreground">Here&apos;s an overview of your laundry services.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/dashboard/customer/orders/new">
            <Button>Schedule Pickup</Button>
          </Link>
          <Link href="/dashboard/customer/addresses/new">
            <Button variant="outline">Add New Address</Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Pickup</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow</div>
            <p className="text-xs text-muted-foreground">10:00 AM - 12:00 PM</p>
          </CardContent>
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
            <div className="text-2xl font-bold">Standard</div>
            <p className="text-xs text-muted-foreground">Renews in 14 days</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your recent laundry service orders</CardDescription>
              </div>
              <Link href="/dashboard/customer/orders">
                <Button variant="outline" size="sm">
                  View All Orders
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Order #1234</p>
                  <p className="text-sm text-muted-foreground">Mar 14, 2023</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Standard Wash</p>
                  <p className="text-sm text-muted-foreground">5 kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">₹999</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>
                <div className="flex items-center justify-end">
                  <Link href="/dashboard/customer/orders/1234">
                    <Button variant="outline" size="sm">
                      Track Order
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Order #1233</p>
                  <p className="text-sm text-muted-foreground">Mar 10, 2023</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Dry Cleaning</p>
                  <p className="text-sm text-muted-foreground">3 items</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">₹1,499</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>
                <div className="flex items-center justify-end">
                  <Link href="/dashboard/customer/orders/1233">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Order #1232</p>
                  <p className="text-sm text-muted-foreground">Mar 5, 2023</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Standard Wash</p>
                  <p className="text-sm text-muted-foreground">4 kg</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">₹799</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>
                <div className="flex items-center justify-end">
                  <Link href="/dashboard/customer/orders/1232">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
            <CardDescription>Track your active order #1234</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Progress</div>
                <div className="font-medium">60%</div>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground">
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
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Order Placed</p>
                  <p className="text-sm text-muted-foreground">Mar 14, 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground">
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
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Picked Up</p>
                  <p className="text-sm text-muted-foreground">Mar 14, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground">
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
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Processing</p>
                  <p className="text-sm text-muted-foreground">Mar 14, 3:30 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Out for Delivery</p>
                  <p className="text-sm text-muted-foreground">Estimated Mar 15, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-muted">
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Delivered</p>
                  <p className="text-sm text-muted-foreground">Estimated Mar 15, 12:00 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

