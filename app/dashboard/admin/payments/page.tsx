"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, CreditCard, Download, MoreHorizontal, Search } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for payments
const initialPayments = [
  {
    id: "PAY-1234",
    orderId: "ORD-1234",
    customer: "Rahul Sharma",
    provider: "CleanCo Laundry",
    amount: "₹999",
    date: "2023-05-15",
    status: "Completed",
    method: "Credit Card",
    transactionId: "TXN-98765",
  },
  {
    id: "PAY-1235",
    orderId: "ORD-1235",
    customer: "Priya Patel",
    provider: "Fresh Fold Services",
    amount: "₹1,499",
    date: "2023-05-14",
    status: "Failed",
    method: "UPI",
    transactionId: "TXN-98764",
  },
  {
    id: "PAY-1236",
    orderId: "ORD-1236",
    customer: "Amit Kumar",
    provider: "Sparkle Wash",
    amount: "₹1,299",
    date: "2023-05-14",
    status: "Pending",
    method: "Net Banking",
    transactionId: "TXN-98763",
  },
  {
    id: "PAY-1237",
    orderId: "ORD-1237",
    customer: "Neha Singh",
    provider: "Laundry Express",
    amount: "₹799",
    date: "2023-05-13",
    status: "Completed",
    method: "Wallet",
    transactionId: "TXN-98762",
  },
  {
    id: "PAY-1238",
    orderId: "ORD-1238",
    customer: "Vikram Mehta",
    provider: "CleanCo Laundry",
    amount: "₹999",
    date: "2023-05-13",
    status: "Refunded",
    method: "Credit Card",
    transactionId: "TXN-98761",
  },
]

// Mock data for payouts
const initialPayouts = [
  {
    id: "PO-1234",
    provider: "CleanCo Laundry",
    amount: "₹8,500",
    date: "2023-05-15",
    status: "Completed",
    method: "Bank Transfer",
    accountNumber: "XXXX1234",
    orders: 12,
  },
  {
    id: "PO-1235",
    provider: "Fresh Fold Services",
    amount: "₹6,750",
    date: "2023-05-14",
    status: "Processing",
    method: "Bank Transfer",
    accountNumber: "XXXX5678",
    orders: 9,
  },
  {
    id: "PO-1236",
    provider: "Sparkle Wash",
    amount: "₹4,200",
    date: "2023-05-13",
    status: "Completed",
    method: "Bank Transfer",
    accountNumber: "XXXX9012",
    orders: 6,
  },
  {
    id: "PO-1237",
    provider: "Laundry Express",
    amount: "₹3,800",
    date: "2023-05-12",
    status: "Completed",
    method: "Bank Transfer",
    accountNumber: "XXXX3456",
    orders: 5,
  },
  {
    id: "PO-1238",
    provider: "Wash & Fold Co.",
    amount: "₹2,950",
    date: "2023-05-11",
    status: "Failed",
    method: "Bank Transfer",
    accountNumber: "XXXX7890",
    orders: 4,
  },
]

export default function PaymentsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("payments")
  const [payments, setPayments] = useState(initialPayments)
  const [payouts, setPayouts] = useState(initialPayouts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const handleUpdateStatus = (id: string, newStatus: string) => {
    if (activeTab === "payments") {
      setPayments(payments.map((payment) => (payment.id === id ? { ...payment, status: newStatus } : payment)))
    } else {
      setPayouts(payouts.map((payout) => (payout.id === id ? { ...payout, status: newStatus } : payout)))
    }

    toast({
      title: `${activeTab === "payments" ? "Payment" : "Payout"} Status Updated`,
      description: `${activeTab === "payments" ? "Payment" : "Payout"} ${id} status changed to ${newStatus}.`,
    })
  }

  // Filter and sort payments/payouts
  const filteredItems = (activeTab === "payments" ? payments : payouts)
    .filter((item) => {
      const matchesSearch =
        (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.provider && item.provider.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activeTab === "payments" && item.customer && item.customer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (activeTab === "payments" && item.orderId && item.orderId.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || item.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime()
      } else if (sortBy === "amount") {
        const aValue = Number.parseFloat(a.amount.replace("₹", "").replace(",", ""))
        const bValue = Number.parseFloat(b.amount.replace("₹", "").replace(",", ""))
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      } else if (sortBy === "id") {
        return sortOrder === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Management</h2>
          <p className="text-muted-foreground">Manage customer payments and provider payouts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Process Payouts
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payments">Customer Payments</TabsTrigger>
          <TabsTrigger value="payouts">Provider Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Payment Transactions</CardTitle>
                  <CardDescription>View and manage all customer payment transactions</CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payments..."
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
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button className="flex items-center gap-1" onClick={() => toggleSort("id")}>
                        Payment ID
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1" onClick={() => toggleSort("amount")}>
                        Amount
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1" onClick={() => toggleSort("date")}>
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Method</TableHead>
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
                  {filteredItems.length > 0 ? (
                    filteredItems.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.orderId}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{payment.provider}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                              ${payment.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                              ${payment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                              ${payment.status === "Failed" ? "bg-red-100 text-red-800" : ""}
                              ${payment.status === "Refunded" ? "bg-blue-100 text-blue-800" : ""}
                            `}
                            >
                              {payment.status}
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>View Order</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(payment.id, "Completed")}>
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(payment.id, "Pending")}>
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(payment.id, "Failed")}>
                                Mark as Failed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(payment.id, "Refunded")}>
                                Mark as Refunded
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                        No payments found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Provider Payouts</CardTitle>
                  <CardDescription>View and manage all provider payout transactions</CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search payouts..."
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
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button className="flex items-center gap-1" onClick={() => toggleSort("id")}>
                        Payout ID
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1" onClick={() => toggleSort("amount")}>
                        Amount
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button className="flex items-center gap-1" onClick={() => toggleSort("date")}>
                        Date
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Orders</TableHead>
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
                  {filteredItems.length > 0 ? (
                    filteredItems.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.id}</TableCell>
                        <TableCell>{payout.provider}</TableCell>
                        <TableCell>{payout.amount}</TableCell>
                        <TableCell>{new Date(payout.date).toLocaleDateString()}</TableCell>
                        <TableCell>{payout.method}</TableCell>
                        <TableCell>{payout.accountNumber}</TableCell>
                        <TableCell>{payout.orders}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                              ${payout.status === "Completed" ? "bg-green-100 text-green-800" : ""}
                              ${payout.status === "Processing" ? "bg-yellow-100 text-yellow-800" : ""}
                              ${payout.status === "Failed" ? "bg-red-100 text-red-800" : ""}
                            `}
                            >
                              {payout.status}
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
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>View Provider</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(payout.id, "Completed")}>
                                Mark as Completed
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(payout.id, "Processing")}>
                                Mark as Processing
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(payout.id, "Failed")}>
                                Mark as Failed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                        No payouts found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

