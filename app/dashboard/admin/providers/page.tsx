"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, Store } from "lucide-react"

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

// Mock data for service providers
const initialProviders = [
  {
    id: "SP001",
    name: "CleanCo Laundry",
    email: "info@cleanco.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    joinDate: "2022-10-15",
    status: "Active",
    orders: 245,
    rating: 4.8,
    revenue: "₹12,450.75",
  },
  {
    id: "SP002",
    name: "Fresh Fold Services",
    email: "contact@freshfold.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    joinDate: "2022-11-03",
    status: "Active",
    orders: 187,
    rating: 4.6,
    revenue: "₹9,875.50",
  },
  {
    id: "SP003",
    name: "Sparkle Wash",
    email: "info@sparklewash.com",
    phone: "+1 (555) 234-5678",
    location: "Chicago, IL",
    joinDate: "2023-01-18",
    status: "Pending",
    orders: 0,
    rating: 0,
    revenue: "₹0.00",
  },
  {
    id: "SP004",
    name: "Laundry Express",
    email: "support@laundryexpress.com",
    phone: "+1 (555) 876-5432",
    location: "Miami, FL",
    joinDate: "2022-12-05",
    status: "Active",
    orders: 156,
    rating: 4.5,
    revenue: "₹7,890.25",
  },
  {
    id: "SP005",
    name: "Wash & Fold Co.",
    email: "info@washandfold.com",
    phone: "+1 (555) 345-6789",
    location: "Seattle, WA",
    joinDate: "2022-09-12",
    status: "Suspended",
    orders: 98,
    rating: 3.2,
    revenue: "₹4,567.80",
  },
  {
    id: "SP006",
    name: "Premium Cleaners",
    email: "hello@premiumcleaners.com",
    phone: "+1 (555) 654-3210",
    location: "Boston, MA",
    joinDate: "2023-02-20",
    status: "Active",
    orders: 67,
    rating: 4.7,
    revenue: "₹3,450.60",
  },
  {
    id: "SP007",
    name: "City Laundromat",
    email: "service@citylaundromat.com",
    phone: "+1 (555) 789-0123",
    location: "San Francisco, CA",
    joinDate: "2023-03-02",
    status: "Active",
    orders: 42,
    rating: 4.4,
    revenue: "₹2,156.30",
  },
  {
    id: "SP008",
    name: "Quick Clean Services",
    email: "info@quickclean.com",
    phone: "+1 (555) 321-0987",
    location: "Denver, CO",
    joinDate: "2023-03-15",
    status: "Pending",
    orders: 0,
    rating: 0,
    revenue: "₹0.00",
  },
]

export default function ProvidersPage() {
  const { toast } = useToast()
  const [providers, setProviders] = useState(initialProviders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("joinDate")
  const [sortOrder, setSortOrder] = useState("desc")

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setProviders(providers.map((provider) => (provider.id === id ? { ...provider, status: newStatus } : provider)))

    toast({
      title: "Provider Status Updated",
      description: `Provider ${id} status changed to ${newStatus}.`,
    })
  }

  // Filter and sort providers
  const filteredProviders = providers
    .filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || provider.status === statusFilter

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
      } else if (sortBy === "rating") {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
      } else if (sortBy === "revenue") {
        const aValue = Number.parseFloat(a.revenue.replace("$", "").replace(",", ""))
        const bValue = Number.parseFloat(b.revenue.replace("$", "").replace(",", ""))
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
          <h2 className="text-2xl font-bold tracking-tight">Service Providers</h2>
          <p className="text-muted-foreground">Manage laundry service providers on the platform</p>
        </div>
        <Button>
          <Store className="mr-2 h-4 w-4" />
          Add Provider
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Provider Management</CardTitle>
              <CardDescription>View and manage all service providers on the platform</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search providers..."
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
                  <SelectItem value="Pending">Pending</SelectItem>
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
                  <button className="flex items-center gap-1" onClick={() => toggleSort("rating")}>
                    Rating
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("revenue")}>
                    Revenue
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
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.id}</TableCell>
                    <TableCell>{provider.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{provider.email}</div>
                        <div className="text-muted-foreground">{provider.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{provider.location}</TableCell>
                    <TableCell>{new Date(provider.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{provider.orders}</TableCell>
                    <TableCell>
                      {provider.rating > 0 ? (
                        <div className="flex items-center">
                          <span>{provider.rating}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-1 h-4 w-4 text-yellow-500 fill-yellow-500"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>{provider.revenue}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${provider.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          ${provider.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                          ${provider.status === "Suspended" ? "bg-red-100 text-red-800" : ""}
                        `}
                        >
                          {provider.status}
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
                            <Link href={`/dashboard/admin/providers/${provider.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Provider</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(provider.id, "Active")}>
                            Mark as Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(provider.id, "Pending")}>
                            Mark as Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(provider.id, "Suspended")}>
                            Mark as Suspended
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
                    No providers found matching your criteria
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

