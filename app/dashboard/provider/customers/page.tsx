"use client"

import { useState } from "react"
import { ArrowUpDown, Download, MoreHorizontal, Search, UserPlus } from "lucide-react"

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

// Mock data for customers
const initialCustomers = [
  {
    id: "CUST-1001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123 Andheri East, Mumbai 400069",
    orders: 12,
    totalSpent: "₹5,400",
    lastOrder: "2023-05-15",
    status: "Active",
  },
  {
    id: "CUST-1002",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    address: "456 Bandra West, Mumbai 400050",
    orders: 8,
    totalSpent: "₹3,750",
    lastOrder: "2023-05-14",
    status: "Active",
  },
  {
    id: "CUST-1003",
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    address: "789 Powai, Mumbai 400076",
    orders: 5,
    totalSpent: "₹2,250",
    lastOrder: "2023-05-14",
    status: "Active",
  },
  {
    id: "CUST-1004",
    name: "Neha Singh",
    email: "neha.singh@example.com",
    phone: "+91 65432 10987",
    address: "321 Juhu, Mumbai 400049",
    orders: 3,
    totalSpent: "₹1,350",
    lastOrder: "2023-05-13",
    status: "Active",
  },
  {
    id: "CUST-1005",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 54321 09876",
    address: "654 Dadar, Mumbai 400014",
    orders: 2,
    totalSpent: "₹900",
    lastOrder: "2023-05-13",
    status: "Inactive",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("lastOrder")
  const [sortOrder, setSortOrder] = useState("desc")

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      return (
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "orders") {
        return sortOrder === "asc" ? a.orders - b.orders : b.orders - a.orders
      } else if (sortBy === "totalSpent") {
        const aValue = Number.parseFloat(a.totalSpent.replace("₹", "").replace(",", ""))
        const bValue = Number.parseFloat(b.totalSpent.replace("₹", "").replace(",", ""))
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      } else if (sortBy === "lastOrder") {
        return sortOrder === "asc"
          ? new Date(a.lastOrder).getTime() - new Date(b.lastOrder).getTime()
          : new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime()
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
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>View and manage all your customers</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("name")}>
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("orders")}>
                    Orders
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("totalSpent")}>
                    Total Spent
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("lastOrder")}>
                    Last Order
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs">{customer.email}</span>
                        <span className="text-xs text-muted-foreground">{customer.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
                    <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          customer.status === "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {customer.status}
                      </Badge>
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
                          <DropdownMenuItem>View Orders</DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete Customer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No customers found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

