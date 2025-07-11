"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for orders
const initialOrders = [
  {
    id: "1234",
    customer: "Rahul Sharma",
    service: "Standard Wash",
    date: "2023-03-14",
    time: "10:30 AM",
    status: "Processing",
    amount: "₹999",
    address: "123 Andheri East, Mumbai 400069",
    phone: "+91 98765 12345",
  },
  {
    id: "1233",
    customer: "Priya Patel",
    service: "Dry Cleaning",
    date: "2023-03-10",
    time: "2:15 PM",
    status: "Ready",
    amount: "₹1,499",
    address: "456 Bandra West, Mumbai 400050",
    phone: "+91 98765 23456",
  },
  {
    id: "1232",
    customer: "Amit Kumar",
    service: "Premium Wash",
    date: "2023-03-05",
    time: "9:00 AM",
    status: "Pending",
    amount: "₹1,299",
    address: "789 Powai, Mumbai 400076",
    phone: "+91 98765 34567",
  },
  {
    id: "1231",
    customer: "Neha Singh",
    service: "Standard Wash",
    date: "2023-02-28",
    time: "11:45 AM",
    status: "Delivered",
    amount: "₹799",
    address: "321 Juhu, Mumbai 400049",
    phone: "+91 98765 45678",
  },
  {
    id: "1230",
    customer: "Vikram Mehta",
    service: "Ironing",
    date: "2023-02-22",
    time: "3:30 PM",
    status: "Delivered",
    amount: "₹599",
    address: "654 Dadar, Mumbai 400014",
    phone: "+91 98765 56789",
  },
  // Add more recent orders
  {
    id: "1235",
    customer: "Anjali Desai",
    service: "Premium Wash",
    date: "2023-03-15",
    time: "9:15 AM",
    status: "Pending",
    amount: "₹1,299",
    address: "789 Malad, Mumbai 400064",
    phone: "+91 98765 67890",
  },
  {
    id: "1236",
    customer: "Rajesh Gupta",
    service: "Dry Cleaning",
    date: "2023-03-15",
    time: "11:30 AM",
    status: "Pending",
    amount: "₹1,799",
    address: "123 Goregaon, Mumbai 400063",
    phone: "+91 98765 78901",
  },
  {
    id: "1237",
    customer: "Meera Joshi",
    service: "Wash & Iron",
    date: "2023-03-14",
    time: "2:45 PM",
    status: "Processing",
    amount: "₹1,599",
    address: "456 Kandivali, Mumbai 400067",
    phone: "+91 98765 89012",
  },
  {
    id: "1238",
    customer: "Suresh Patel",
    service: "Standard Wash",
    date: "2023-03-13",
    time: "10:00 AM",
    status: "Ready",
    amount: "₹999",
    address: "789 Borivali, Mumbai 400092",
    phone: "+91 98765 90123",
  },
  {
    id: "1239",
    customer: "Pooja Verma",
    service: "Premium Wash",
    date: "2023-03-12",
    time: "3:15 PM",
    status: "Ready",
    amount: "₹1,399",
    address: "321 Chembur, Mumbai 400071",
    phone: "+91 98765 01234",
  },
  {
    id: "1240",
    customer: "Karan Malhotra",
    service: "Ironing",
    date: "2023-03-11",
    time: "1:30 PM",
    status: "Delivered",
    amount: "₹799",
    address: "654 Ghatkopar, Mumbai 400086",
    phone: "+91 98765 12345",
  },
]

export default function OrdersPage() {
  const { toast } = useToast()
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  // Add state for selected orders
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  // Add pagination
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 10

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order)))

    toast({
      title: "Order Status Updated",
      description: `Order #${id} status changed to ${newStatus}.`,
    })
  }

  // Add function to handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No orders selected",
        description: "Please select at least one order to perform this action.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: `${action} orders`,
      description: `${selectedOrders.length} orders have been ${action.toLowerCase()}.`,
    })

    // Update orders based on the action
    if (action === "Process" || action === "Complete" || action === "Cancel") {
      const newStatus = action === "Process" ? "Processing" : action === "Complete" ? "Delivered" : "Cancelled"

      setOrders(orders.map((order) => (selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order)))

      setSelectedOrders([])
    }
  }

  // Add function to toggle order selection
  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  // Add function to toggle all orders selection
  const toggleAllOrders = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    }
  }

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.includes(searchTerm)
      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "id") {
        return sortOrder === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      } else if (sortBy === "customer") {
        return sortOrder === "asc" ? a.customer.localeCompare(b.customer) : b.customer.localeCompare(a.customer)
      }
      return 0
    })

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">Manage and process customer laundry orders</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and update the status of customer orders</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-8 w-[200px] md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
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
          {selectedOrders.length > 0 && (
            <div className="mt-4 p-2 bg-muted rounded-md flex items-center justify-between">
              <span className="text-sm">{selectedOrders.length} orders selected</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("Process")}>
                  Process Selected
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("Complete")}>
                  Complete Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive"
                  onClick={() => handleBulkAction("Cancel")}
                >
                  Cancel Selected
                </Button>
              </div>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                    onCheckedChange={toggleAllOrders}
                    aria-label="Select all orders"
                  />
                </TableHead>
                <TableHead className="w-[100px]">
                  <button className="flex items-center gap-1" onClick={() => toggleSort("id")}>
                    Order ID
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("customer")}>
                    Customer
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Service</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("date")}>
                    Date
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <TableRow key={order.id} className={selectedOrders.includes(order.id) ? "bg-muted/50" : ""}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => toggleOrderSelection(order.id)}
                        aria-label={`Select order ${order.id}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${order.status === "Pending" ? "bg-orange-100 text-orange-800" : ""}
                        ${order.status === "Processing" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${order.status === "Ready" ? "bg-blue-100 text-blue-800" : ""}
                        ${order.status === "Delivered" ? "bg-green-100 text-green-800" : ""}
                      `}
                        >
                          {order.status}
                        </span>
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
                            <Link href={`/dashboard/provider/orders/${order.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Pending")}>
                            Mark as Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Processing")}>
                            Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Ready")}>
                            Mark as Ready
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Delivered")}>
                            Mark as Delivered
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No orders found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
