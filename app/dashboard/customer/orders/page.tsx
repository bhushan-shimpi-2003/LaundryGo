"use client"

import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Banknote, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Define types for the order data
interface Order {
  id: string
  date: string
  service: string
  amount: number
  status: string
  paymentMethod: "cod" | "card"
  paymentStatus: "pending" | "paid" | "failed"
}

// Mock data for orders
const orders: Order[] = [
  {
    id: "ORD-1234",
    date: "Mar 14, 2023",
    service: "Standard Wash",
    amount: 999,
    status: "in_progress",
    paymentMethod: "card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1233",
    date: "Mar 10, 2023",
    service: "Dry Cleaning",
    amount: 1499,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1232",
    date: "Mar 5, 2023",
    service: "Standard Wash",
    amount: 799,
    status: "delivered",
    paymentMethod: "cod",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1231",
    date: "Feb 28, 2023",
    service: "Premium Wash",
    amount: 1299,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-1230",
    date: "Feb 22, 2023",
    service: "Ironing",
    amount: 599,
    status: "delivered",
    paymentMethod: "cod",
    paymentStatus: "paid",
  },
]

export default function CustomerOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Orders</h2>
          <p className="text-muted-foreground">View and manage your laundry service orders</p>
        </div>
        <Link href="/dashboard/customer/schedule-pickup">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Pickup
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View all your past and current orders</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Search orders..." className="max-w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center gap-1">
                    Order ID
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>₹{order.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "success"
                          : order.status === "in_progress"
                            ? "warning"
                            : order.status === "cancelled"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {order.status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-muted-foreground">
                        {order.paymentMethod === "cod" ? (
                          <div className="flex items-center">
                            <Banknote className="mr-1 h-3 w-3" />
                            <span>Cash on Delivery</span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <CreditCard className="mr-1 h-3 w-3" />
                            <span>Card</span>
                          </div>
                        )}
                      </span>
                      <Badge
                        variant={
                          order.paymentStatus === "paid"
                            ? "success"
                            : order.paymentStatus === "failed"
                              ? "destructive"
                              : "outline"
                        }
                        className="w-fit"
                      >
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/customer/orders/${order.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {order.status === "delivered" ? "Leave Review" : "Track Order"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {order.status === "delivered" ? "Reorder" : "Contact Support"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
