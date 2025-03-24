import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react"

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

type Order = {
  id: string
  service: string
  status: "pending" | "confirmed" | "picked_up" | "processing" | "completed" | "delivered" | "cancelled"
  date: string
  time: string
  total: number
  address: string
  paymentMethod: "cod" | "card"
  paymentStatus: "pending" | "paid" | "failed"
}

const orders: Order[] = [
  {
    id: "ORD-001",
    service: "Standard Wash",
    status: "delivered",
    date: "2023-06-15",
    time: "10:00 AM - 12:00 PM",
    total: 24.99,
    address: "123 Main St, Apt 4B",
    paymentMethod: "card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-002",
    service: "Dry Cleaning",
    status: "processing",
    date: "2023-06-18",
    time: "2:00 PM - 4:00 PM",
    total: 39.99,
    address: "123 Main St, Apt 4B",
    paymentMethod: "card",
    paymentStatus: "paid",
  },
  {
    id: "ORD-003",
    service: "Wash & Iron",
    status: "pending",
    date: "2023-06-20",
    time: "8:00 AM - 10:00 AM",
    total: 29.99,
    address: "456 Business Ave, Suite 200",
    paymentMethod: "cod",
    paymentStatus: "pending",
  },
  {
    id: "ORD-004",
    service: "Premium Wash",
    status: "confirmed",
    date: "2023-06-22",
    time: "4:00 PM - 6:00 PM",
    total: 34.99,
    address: "123 Main St, Apt 4B",
    paymentMethod: "cod",
    paymentStatus: "pending",
  },
  {
    id: "ORD-005",
    service: "Ironing Service",
    status: "picked_up",
    date: "2023-06-25",
    time: "10:00 AM - 12:00 PM",
    total: 19.99,
    address: "123 Main St, Apt 4B",
    paymentMethod: "card",
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
        <Link href="/dashboard/customer/orders/new">
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
                <TableHead className="hidden md:table-cell">Payment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "pending"
                          ? "bg-gray-100 text-gray-800"
                          : order.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "picked_up"
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : order.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "delivered"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status
                        .replace(/_/g, " ")
                        .split(" ")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {order.paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}
                      </span>
                      <Badge
                        variant={
                          order.paymentStatus === "paid"
                            ? "success"
                            : order.paymentStatus === "failed"
                              ? "destructive"
                              : "outline"
                        }
                        className="w-fit mt-1"
                      >
                        {order.paymentStatus === "paid"
                          ? "Paid"
                          : order.paymentStatus === "failed"
                            ? "Failed"
                            : "Pending"}
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
                          {order.status === "delivered" || order.status === "completed"
                            ? "Leave Review"
                            : "Track Order"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          {order.status === "delivered" || order.status === "completed" ? "Reorder" : "Contact Support"}
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

