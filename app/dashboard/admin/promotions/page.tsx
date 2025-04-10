"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Search } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

// Mock data for promotions
const initialPromotions = [
  {
    id: "PROMO-1234",
    code: "WELCOME20",
    description: "20% off for new customers",
    type: "Percentage",
    value: "20%",
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    status: "Active",
    usageLimit: 1000,
    usageCount: 450,
    minOrderValue: "₹500",
    maxDiscount: "₹200",
  },
  {
    id: "PROMO-1235",
    code: "SUMMER10",
    description: "₹100 off on summer collection",
    type: "Fixed Amount",
    value: "₹100",
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    status: "Active",
    usageLimit: 500,
    usageCount: 120,
    minOrderValue: "₹800",
    maxDiscount: "₹100",
  },
  {
    id: "PROMO-1236",
    code: "FREESHIP",
    description: "Free shipping on all orders",
    type: "Free Shipping",
    value: "₹0",
    startDate: "2023-05-10",
    endDate: "2023-05-20",
    status: "Expired",
    usageLimit: 2000,
    usageCount: 1800,
    minOrderValue: "₹1000",
    maxDiscount: "₹150",
  },
  {
    id: "PROMO-1237",
    code: "FLASH25",
    description: "25% off flash sale",
    type: "Percentage",
    value: "25%",
    startDate: "2023-06-01",
    endDate: "2023-06-02",
    status: "Scheduled",
    usageLimit: 300,
    usageCount: 0,
    minOrderValue: "₹600",
    maxDiscount: "₹250",
  },
  {
    id: "PROMO-1238",
    code: "LOYALTY15",
    description: "15% off for loyal customers",
    type: "Percentage",
    value: "15%",
    startDate: "2023-04-01",
    endDate: "2023-05-10",
    status: "Expired",
    usageLimit: 1000,
    usageCount: 950,
    minOrderValue: "₹0",
    maxDiscount: "₹300",
  },
]

export default function PromotionsPage() {
  const { toast } = useToast()
  const [promotions, setPromotions] = useState(initialPromotions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("startDate")
  const [sortOrder, setSortOrder] = useState("desc")

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setPromotions(promotions.map((promo) => (promo.id === id ? { ...promo, status: newStatus } : promo)))

    toast({
      title: "Promotion Status Updated",
      description: `Promotion ${id} status changed to ${newStatus}.`,
    })
  }

  // Filter and sort promotions
  const filteredPromotions = promotions
    .filter((promo) => {
      const matchesSearch =
        promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || promo.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "startDate") {
        return sortOrder === "asc"
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      } else if (sortBy === "endDate") {
        return sortOrder === "asc"
          ? new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          : new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      } else if (sortBy === "code") {
        return sortOrder === "asc" ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code)
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

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "success"
      case "Scheduled":
        return "warning"
      case "Expired":
        return "danger"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Promotions Management</h2>
          <p className="text-muted-foreground">Create and manage promotional offers and discounts</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Promotions</CardTitle>
              <CardDescription>Manage your promotional campaigns and discount codes</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search promotions..."
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
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
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
                  <button className="flex items-center gap-1" onClick={() => toggleSort("code")}>
                    Promo Code
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("startDate")}>
                    Start Date
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("endDate")}>
                    End Date
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Usage</TableHead>
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
              {filteredPromotions.length > 0 ? (
                filteredPromotions.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.code}</TableCell>
                    <TableCell>{promo.description}</TableCell>
                    <TableCell>{promo.type}</TableCell>
                    <TableCell>{promo.value}</TableCell>
                    <TableCell>{new Date(promo.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(promo.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {promo.usageCount}/{promo.usageLimit}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(promo.status)}>{promo.status}</Badge>
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
                          <DropdownMenuItem>Edit Promotion</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(promo.id, "Active")}>
                            Mark as Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(promo.id, "Scheduled")}>
                            Mark as Scheduled
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(promo.id, "Expired")}>
                            Mark as Expired
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                    No promotions found matching your criteria
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
