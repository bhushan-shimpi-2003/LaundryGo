"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, MoreHorizontal, Search } from "lucide-react"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for schedule
const mockSchedule = [
  {
    id: "SCH-001",
    type: "Pickup",
    customer: "Rahul Sharma",
    timeSlot: "10:00 AM - 12:00 PM",
    address: "123 Andheri East, Mumbai 400069",
    orderId: "#1234",
    date: "2023-05-15",
    status: "Pending",
  },
  {
    id: "SCH-002",
    type: "Delivery",
    customer: "Priya Patel",
    timeSlot: "1:00 PM - 3:00 PM",
    address: "456 Bandra West, Mumbai 400050",
    orderId: "#1233",
    date: "2023-05-15",
    status: "Pending",
  },
  {
    id: "SCH-003",
    type: "Pickup",
    customer: "Amit Kumar",
    timeSlot: "3:30 PM - 5:30 PM",
    address: "789 Powai, Mumbai 400076",
    orderId: "#1232",
    date: "2023-05-15",
    status: "Pending",
  },
  {
    id: "SCH-004",
    type: "Delivery",
    customer: "Neha Singh",
    timeSlot: "5:00 PM - 7:00 PM",
    address: "321 Juhu, Mumbai 400049",
    orderId: "#1231",
    date: "2023-05-15",
    status: "Pending",
  },
  {
    id: "SCH-005",
    type: "Pickup",
    customer: "Vikram Mehta",
    timeSlot: "9:00 AM - 11:00 AM",
    address: "654 Dadar, Mumbai 400014",
    orderId: "#1235",
    date: "2023-05-16",
    status: "Pending",
  },
  {
    id: "SCH-006",
    type: "Delivery",
    customer: "Ananya Desai",
    timeSlot: "2:00 PM - 4:00 PM",
    address: "987 Malad, Mumbai 400064",
    orderId: "#1236",
    date: "2023-05-16",
    status: "Pending",
  },
  {
    id: "SCH-007",
    type: "Pickup",
    customer: "Rajesh Gupta",
    timeSlot: "11:00 AM - 1:00 PM",
    address: "246 Goregaon, Mumbai 400063",
    orderId: "#1237",
    date: "2023-05-17",
    status: "Pending",
  },
]

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(mockSchedule)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week">("day")

  // Get days for week view
  const weekStart = startOfWeek(date, { weekStartsOn: 1 }) // Start from Monday
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Filter schedule
  const filteredSchedule = schedule.filter((item) => {
    const matchesSearch =
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || item.type === typeFilter

    const matchesDate =
      view === "day"
        ? isSameDay(new Date(item.date), date)
        : new Date(item.date) >= weekStart && new Date(item.date) <= weekEnd

    return matchesSearch && matchesType && matchesDate
  })

  // Update schedule item status
  const updateStatus = (id: string, status: string) => {
    setSchedule(schedule.map((item) => (item.id === id ? { ...item, status: status } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule</h2>
          <p className="text-muted-foreground">Manage your pickups and deliveries</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week")} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDate(view === "day" ? addDays(date, -1) : addDays(date, -7))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="mx-2 w-[180px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {view === "day"
                    ? format(date, "PPP")
                    : `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDate(view === "day" ? addDays(date, 1) : addDays(date, 7))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schedule..."
            className="pl-8 w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Pickup">Pickups</SelectItem>
            <SelectItem value="Delivery">Deliveries</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {view === "day" ? (
        <Card>
          <CardHeader>
            <CardTitle>{format(date, "EEEE, MMMM d, yyyy")}</CardTitle>
            <CardDescription>
              {filteredSchedule.length} {filteredSchedule.length === 1 ? "task" : "tasks"} scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium">
                          {item.type} - {item.customer}
                        </p>
                        <Badge
                          variant="outline"
                          className={`ml-2 ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : item.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.timeSlot}</p>
                      <p className="text-xs text-muted-foreground">{item.address}</p>
                      <p className="text-xs text-muted-foreground">Order: {item.orderId}</p>
                    </div>
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
                        <DropdownMenuItem>Edit Schedule</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => updateStatus(item.id, "Pending")}>
                          Mark as Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(item.id, "In Progress")}>
                          Mark as In Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(item.id, "Completed")}>
                          Mark as Completed
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No tasks scheduled</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    There are no pickups or deliveries scheduled for this day.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weekDays.map((day) => {
            const daySchedule = schedule.filter((item) => isSameDay(new Date(item.date), day))
            const filteredDaySchedule = daySchedule.filter((item) => {
              const matchesSearch =
                item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.orderId.toLowerCase().includes(searchTerm.toLowerCase())
              const matchesType = typeFilter === "all" || item.type === typeFilter
              return matchesSearch && matchesType
            })

            return (
              <Card key={day.toISOString()} className={isSameDay(day, new Date()) ? "border-primary" : ""}>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm text-center">{format(day, "EEE")}</CardTitle>
                  <CardDescription className="text-center font-medium">{format(day, "d MMM")}</CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  {filteredDaySchedule.length > 0 ? (
                    <div className="space-y-2">
                      {filteredDaySchedule.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-md p-2 text-xs ${item.type === "Pickup" ? "bg-blue-50" : "bg-green-50"}`}
                        >
                          <div className="font-medium">
                            {item.type}: {item.customer}
                          </div>
                          <div className="text-muted-foreground">{item.timeSlot}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-20 text-xs text-muted-foreground">No tasks</div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
