  "use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, ChevronDown, MoreHorizontal, Plus, Search, Tag } from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock data for promotions
const initialPromotions = [
  {
    id: "PROMO-001",
    name: "Welcome Discount",
    code: "WELCOME20",
    type: "Percentage",
    value: "20%",
    minOrderValue: "₹500",
    maxDiscount: "₹200",
    startDate: "2023-05-01",
    endDate: "2023-06-30",
    status: "Active",
    usageLimit: 1000,
    usageCount: 345,
    description: "20% off on your first order",
  },
  {
    id: "PROMO-002",
    name: "Summer Sale",
    code: "SUMMER15",
    type: "Percentage",
    value: "15%",
    minOrderValue: "₹300",
    maxDiscount: "₹150",
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    status: "Active",
    usageLimit: 2000,
    usageCount: 567,
    description: "15% off on all services during summer",
  },
  {
    id: "PROMO-003",
    name: "Flat Discount",
    code: "FLAT100",
    type: "Fixed",
    value: "₹100",
    minOrderValue: "₹500",
    maxDiscount: "₹100",
    startDate: "2023-05-10",
    endDate: "2023-05-20",
    status: "Expired",
    usageLimit: 500,
    usageCount: 432,
    description: "Flat ₹100 off on orders above ₹500",
  },
  {
    id: "PROMO-004",
    name: "Premium Service Discount",
    code: "PREMIUM10",
    type: "Percentage",
    value: "10%",
    minOrderValue: "₹1000",
    maxDiscount: "₹300",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "Scheduled",
    usageLimit: 1000,
    usageCount: 0,
    description: "10% off on premium laundry services",
  },
  {
    id: "PROMO-005",
    name: "Weekend Special",
    code: "WEEKEND25",
    type: "Percentage",
    value: "25%",
    minOrderValue: "₹700",
    maxDiscount: "₹250",
    startDate: "2023-05-05",
    endDate: "2023-07-30",
    status: "Active",
    usageLimit: 1500,
    usageCount: 289,
    description: "25% off on weekend orders",
  },
]

export default function PromotionsPage() {
  const { toast } = useToast()
  const [promotions, setPromotions] = useState(initialPromotions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("startDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [isAddPromoDialogOpen, setIsAddPromoDialogOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [newPromo, setNewPromo] = useState({
    name: "",
    code: "",
    type: "Percentage",
    value: "",
    minOrderValue: "",
    maxDiscount: "",
    usageLimit: "",
    description: "",
    isActive: true,
  })

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setPromotions(promotions.map((promo) => (promo.id === id ? { ...promo, status: newStatus } : promo)))

    toast({
      title: "Promotion Status Updated",
      description: `Promotion ${id} status changed to ${newStatus}.`,
    })
  }

  const handleAddPromotion = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Date range required",
        description: "Please select both start and end dates for the promotion.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would make an API call to create the promotion
    const newId = `PROMO-00${promotions.length + 1}`
    const createdPromo = {
      id: newId,
      name: newPromo.name,
      code: newPromo.code,
      type: newPromo.type,
      value: newPromo.type === "Percentage" ? `${newPromo.value}%` : `₹${newPromo.value}`,
      minOrderValue: `₹${newPromo.minOrderValue}`,
      maxDiscount: `₹${newPromo.maxDiscount}`,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      status: newPromo.isActive ? "Active" : "Inactive",
      usageLimit: Number.parseInt(newPromo.usageLimit),
      usageCount: 0,
      description: newPromo.description,
    }

    setPromotions([...promotions, createdPromo])
    setIsAddPromoDialogOpen(false)
    setNewPromo({
      name: "",
      code: "",
      type: "Percentage",
      value: "",
      minOrderValue: "",
      maxDiscount: "",
      usageLimit: "",
      description: "",
      isActive: true,
    })
    setStartDate(undefined)
    setEndDate(undefined)

    toast({
      title: "Promotion Added Successfully",
      description: `${newPromo.name} has been added with code ${newPromo.code}.`,
    })
  }

  // Filter and sort promotions
  const filteredPromotions = promotions
    .filter((promo) => {
      const matchesSearch =
        promo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      } else if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Promotions & Discounts</h2>
          <p className="text-muted-foreground">Manage promotional offers and discount codes</p>
        </div>
        <Dialog open={isAddPromoDialogOpen} onOpenChange={setIsAddPromoDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Promotion</DialogTitle>
              <DialogDescription>Create a new promotional offer or discount code.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Promotion Name</Label>
                  <Input
                    id="name"
                    value={newPromo.name}
                    onChange={(e) => setNewPromo({ ...newPromo, name: e.target.value })}
                    placeholder="e.g., Summer Sale"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Promo Code</Label>
                  <Input
                    id="code"
                    value={newPromo.code}
                    onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., SUMMER20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select value={newPromo.type} onValueChange={(value) => setNewPromo({ ...newPromo, type: value })}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage (%)</SelectItem>
                      <SelectItem value="Fixed">Fixed Amount (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Discount Value</Label>
                  <div className="relative">
                    <Input
                      id="value"
                      value={newPromo.value}
                      onChange={(e) => setNewPromo({ ...newPromo, value: e.target.value })}
                      placeholder={newPromo.type === "Percentage" ? "e.g., 20" : "e.g., 100"}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {newPromo.type === "Percentage" ? "%" : "₹"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minOrderValue">Minimum Order Value (₹)</Label>
                  <Input
                    id="minOrderValue"
                    value={newPromo.minOrderValue}
                    onChange={(e) => setNewPromo({ ...newPromo, minOrderValue: e.target.value })}
                    placeholder="e.g., 500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                  <Input
                    id="maxDiscount"
                    value={newPromo.maxDiscount}
                    onChange={(e) => setNewPromo({ ...newPromo, maxDiscount: e.target.value })}
                    placeholder="e.g., 200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => (startDate ? date < startDate : false)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  value={newPromo.usageLimit}
                  onChange={(e) => setNewPromo({ ...newPromo, usageLimit: e.target.value })}
                  placeholder="e.g., 1000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPromo.description}
                  onChange={(e) => setNewPromo({ ...newPromo, description: e.target.value })}
                  placeholder="Describe the promotion"
                  className="min-h-[80px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newPromo.isActive}
                  onCheckedChange={(checked) => setNewPromo({ ...newPromo, isActive: checked })}
                />
                <Label htmlFor="isActive">Activate promotion immediately</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPromoDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPromotion}>Add Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Active Promotions</CardTitle>
              <CardDescription>View and manage all promotional offers and discount codes</CardDescription>
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
                  <SelectItem value="Inactive">Inactive</SelectItem>
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
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("name")}>
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("code")}>
                    Code
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Min. Order</TableHead>
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
                    <TableCell className="font-medium">{promo.id}</TableCell>
                    <TableCell>{promo.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4 text-primary" />
                        <span className="font-mono">{promo.code}</span>
                      </div>
                    </TableCell>
                    <TableCell>{promo.value}</TableCell>
                    <TableCell>{promo.minOrderValue}</TableCell>
                    <TableCell>{new Date(promo.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(promo.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {promo.usageCount}/{promo.usageLimit}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${promo.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          ${promo.status === "Inactive" ? "bg-gray-100 text-gray-800" : ""}
                          ${promo.status === "Scheduled" ? "bg-blue-100 text-blue-800" : ""}
                          ${promo.status === "Expired" ? "bg-red-100 text-red-800" : ""}
                        `}
                        >
                          {promo.status}
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
                          <DropdownMenuItem>Edit Promotion</DropdownMenuItem>
                          <DropdownMenuItem>View Usage</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(promo.id, "Active")}>
                            Mark as Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(promo.id, "Inactive")}>
                            Mark as Inactive
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
                  <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
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

