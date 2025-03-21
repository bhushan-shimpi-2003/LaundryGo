"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, UserPlus } from "lucide-react"

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

// Mock data for customers
const initialCustomers = [
  {
    id: "C001",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2023-01-15",
    status: "Active",
    orders: 12,
    totalSpent: "₹345.88",
  },
  {
    id: "C002",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 987-6543",
    location: "Los Angeles, CA",
    joinDate: "2023-02-03",
    status: "Active",
    orders: 8,
    totalSpent: "₹210.45",
  },
  {
    id: "C003",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    location: "Chicago, IL",
    joinDate: "2023-02-18",
    status: "Active",
    orders: 5,
    totalSpent: "₹145.99",
  },
  {
    id: "C004",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 876-5432",
    location: "Houston, TX",
    joinDate: "2023-03-05",
    status: "Inactive",
    orders: 3,
    totalSpent: "₹89.97",
  },
  {
    id: "C005",
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    phone: "+1 (555) 345-6789",
    location: "Phoenix, AZ",
    joinDate: "2023-03-12",
    status: "Active",
    orders: 7,
    totalSpent: "₹178.50",
  },
  {
    id: "C006",
    name: "Robert Taylor",
    email: "robert.taylor@example.com",
    phone: "+1 (555) 654-3210",
    location: "Philadelphia, PA",
    joinDate: "2023-03-20",
    status: "Active",
    orders: 4,
    totalSpent: "₹112.75",
  },
  {
    id: "C007",
    name: "Jennifer Anderson",
    email: "jennifer.anderson@example.com",
    phone: "+1 (555) 789-0123",
    location: "San Antonio, TX",
    joinDate: "2023-04-02",
    status: "Active",
    orders: 6,
    totalSpent: "₹156.30",
  },
  {
    id: "C008",
    name: "Thomas Jackson",
    email: "thomas.jackson@example.com",
    phone: "+1 (555) 321-0987",
    location: "San Diego, CA",
    joinDate: "2023-04-15",
    status: "Suspended",
    orders: 2,
    totalSpent: "₹65.99",
  },
]

export default function CustomersPage() {
  const { toast } = useToast()
  const [customers, setCustomers] = useState(initialCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("joinDate")
  const [sortOrder, setSortOrder] = useState("desc")

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setCustomers(customers.map((customer) => (customer.id === id ? { ...customer, status: newStatus } : customer)))

    toast({
      title: "Customer Status Updated",
      description: `Customer ${id} status changed to ${newStatus}.`,
    })
  }

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || customer.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "joinDate") {
        return sortOrder === "asc"
          ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
          : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      } else if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "orders") {
        return sortOrder === "asc" ? a.orders - b.orders : b.orders - a.orders
      } else if (sortBy === "totalSpent") {
        const aValue = Number.parseFloat(a.totalSpent.replace("$", ""))
        const bValue = Number.parseFloat(b.totalSpent.replace("$", ""))
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
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
          <p className="text-muted-foreground">Manage customer accounts and view their activity</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Customer Management</CardTitle>
              <CardDescription>View and manage all customers on the platform</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
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
                <TableHead>Location</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("joinDate")}>
                    Join Date
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
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
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </TableHead>
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
                      <div className="text-sm">
                        <div>{customer.email}</div>
                        <div className="text-muted-foreground">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell>{customer.totalSpent}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${customer.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          ${customer.status === "Inactive" ? "bg-gray-100 text-gray-800" : ""}
                          ${customer.status === "Suspended" ? "bg-red-100 text-red-800" : ""}
                        `}
                        >
                          {customer.status}
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
                            <Link href={`/dashboard/admin/customers/${customer.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(customer.id, "Active")}>
                            Mark as Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(customer.id, "Inactive")}>
                            Mark as Inactive
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(customer.id, "Suspended")}>
                            Mark as Suspended
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
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

