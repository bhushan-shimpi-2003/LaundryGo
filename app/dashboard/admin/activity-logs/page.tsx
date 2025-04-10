"use client"

import { useState } from "react"
import { ArrowUpDown, Calendar, Download, Search, User, Store, ShoppingCart, Settings, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock data for activity logs
const initialLogs = [
  {
    id: "LOG-001",
    timestamp: "2023-05-15T10:30:45",
    user: "Rajesh Kumar",
    userType: "Admin",
    action: "Updated provider status",
    details: "Changed status of provider SP001 from Pending to Active",
    ipAddress: "192.168.1.1",
    module: "Providers",
  },
  {
    id: "LOG-002",
    timestamp: "2023-05-15T09:45:20",
    user: "System",
    userType: "System",
    action: "Scheduled maintenance",
    details: "System maintenance scheduled for 2023-05-16 02:00:00",
    ipAddress: "System",
    module: "System",
  },
  {
    id: "LOG-003",
    timestamp: "2023-05-14T15:22:10",
    user: "Priya Sharma",
    userType: "Admin",
    action: "Created promotion",
    details: "Created new promotion SUMMER15 with 15% discount",
    ipAddress: "192.168.1.2",
    module: "Promotions",
  },
  {
    id: "LOG-004",
    timestamp: "2023-05-14T14:10:05",
    user: "Vikram Singh",
    userType: "Support",
    action: "Updated order status",
    details: "Changed status of order ORD-1234 from Processing to Completed",
    ipAddress: "192.168.1.3",
    module: "Orders",
  },
  {
    id: "LOG-005",
    timestamp: "2023-05-14T11:05:30",
    user: "Neha Patel",
    userType: "Finance",
    action: "Processed payout",
    details: "Processed payout PO-1234 of ₹8,500 to CleanCo Laundry",
    ipAddress: "192.168.1.4",
    module: "Payments",
  },
  {
    id: "LOG-006",
    timestamp: "2023-05-13T16:40:15",
    user: "Amit Verma",
    userType: "Support",
    action: "Updated customer details",
    details: "Updated contact information for customer C001",
    ipAddress: "192.168.1.5",
    module: "Customers",
  },
  {
    id: "LOG-007",
    timestamp: "2023-05-13T14:25:50",
    user: "System",
    userType: "System",
    action: "Backup completed",
    details: "Daily database backup completed successfully",
    ipAddress: "System",
    module: "System",
  },
  {
    id: "LOG-008",
    timestamp: "2023-05-13T10:15:30",
    user: "Rajesh Kumar",
    userType: "Admin",
    action: "Changed system settings",
    details: "Updated platform notification settings",
    ipAddress: "192.168.1.1",
    module: "Settings",
  },
  {
    id: "LOG-009",
    timestamp: "2023-05-12T17:30:20",
    user: "Priya Sharma",
    userType: "Admin",
    action: "Added admin user",
    details: "Added new admin user Amit Verma",
    ipAddress: "192.168.1.2",
    module: "Users",
  },
  {
    id: "LOG-010",
    timestamp: "2023-05-12T13:45:10",
    user: "System",
    userType: "System",
    action: "Payment gateway error",
    details: "Failed to process payment for order ORD-1235",
    ipAddress: "System",
    module: "Payments",
  },
]

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState(initialLogs)
  const [searchTerm, setSearchTerm] = useState("")
  const [moduleFilter, setModuleFilter] = useState("all")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [sortBy, setSortBy] = useState("timestamp")
  const [sortOrder, setSortOrder] = useState("desc")

  // Filter and sort logs
  const filteredLogs = logs
    .filter((log) => {
      const matchesSearch =
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesModule = moduleFilter === "all" || log.module === moduleFilter
      const matchesUserType = userTypeFilter === "all" || log.userType === userTypeFilter

      const logDate = new Date(log.timestamp)
      const matchesDateRange =
        (!startDate || logDate >= startDate) && (!endDate || logDate <= new Date(endDate.setHours(23, 59, 59, 999)))

      return matchesSearch && matchesModule && matchesUserType && matchesDateRange
    })
    .sort((a, b) => {
      if (sortBy === "timestamp") {
        return sortOrder === "asc"
          ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      } else if (sortBy === "user") {
        return sortOrder === "asc" ? a.user.localeCompare(b.user) : b.user.localeCompare(a.user)
      } else if (sortBy === "action") {
        return sortOrder === "asc" ? a.action.localeCompare(b.action) : b.action.localeCompare(a.action)
      } else if (sortBy === "module") {
        return sortOrder === "asc" ? a.module.localeCompare(b.module) : b.module.localeCompare(a.module)
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

  // Get unique modules for filter
  const modules = ["System", "Users", "Customers", "Providers", "Orders", "Payments", "Promotions", "Settings"]

  // Get unique user types for filter
  const userTypes = ["Admin", "Support", "Finance", "System"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Activity Logs</h2>
          <p className="text-muted-foreground">Track and monitor all system and user activities</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>System Activity</CardTitle>
              <CardDescription>Comprehensive audit trail of all platform activities</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
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
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
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
              <div className="space-y-2">
                <label className="text-sm font-medium">Module</label>
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Modules</SelectItem>
                    {modules.map((module) => (
                      <SelectItem key={module} value={module}>
                        {module}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">User Type</label>
                <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by user type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All User Types</SelectItem>
                    {userTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setModuleFilter("all")
                setUserTypeFilter("all")
                setStartDate(undefined)
                setEndDate(undefined)
              }}
            >
              Reset Filters
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Log ID</TableHead>
                  <TableHead>
                    <button className="flex items-center gap-1" onClick={() => toggleSort("timestamp")}>
                      Timestamp
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center gap-1" onClick={() => toggleSort("user")}>
                      User
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center gap-1" onClick={() => toggleSort("action")}>
                      Action
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>
                    <button className="flex items-center gap-1" onClick={() => toggleSort("module")}>
                      Module
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.id}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.userType === "Admin" ? (
                            <Shield className="h-4 w-4 text-primary" />
                          ) : log.userType === "Support" ? (
                            <User className="h-4 w-4 text-blue-500" />
                          ) : log.userType === "Finance" ? (
                            <User className="h-4 w-4 text-green-500" />
                          ) : (
                            <Settings className="h-4 w-4 text-gray-500" />
                          )}
                          <span>{log.user}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="max-w-xs truncate" title={log.details}>
                        {log.details}
                      </TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.module === "System" ? (
                            <Settings className="h-4 w-4 text-gray-500" />
                          ) : log.module === "Users" ? (
                            <User className="h-4 w-4 text-primary" />
                          ) : log.module === "Customers" ? (
                            <User className="h-4 w-4 text-orange-500" />
                          ) : log.module === "Providers" ? (
                            <Store className="h-4 w-4 text-green-500" />
                          ) : log.module === "Orders" ? (
                            <ShoppingCart className="h-4 w-4 text-blue-500" />
                          ) : log.module === "Payments" ? (
                            <div className="h-4 w-4 text-purple-500">₹</div>
                          ) : log.module === "Promotions" ? (
                            <div className="h-4 w-4 text-pink-500">%</div>
                          ) : (
                            <Settings className="h-4 w-4 text-gray-500" />
                          )}
                          <span>{log.module}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No logs found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
