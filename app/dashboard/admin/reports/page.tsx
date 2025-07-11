"use client"

import { useState } from "react"
import { CalendarIcon, Download, FileText } from "lucide-react"
import { format } from "date-fns"
// Remove jsPDF import if causing errors and replace with a simpler implementation
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for orders
const mockOrders = [
  {
    id: "1234",
    customer: "John Doe",
    provider: "CleanCo Laundry",
    service: "Standard Wash",
    date: "2023-03-14",
    status: "Delivered",
    amount: 24.99,
  },
  {
    id: "1235",
    customer: "Jane Smith",
    provider: "Fresh Fold Services",
    service: "Dry Cleaning",
    date: "2023-03-15",
    status: "Delivered",
    amount: 34.99,
  },
  {
    id: "1236",
    customer: "Robert Johnson",
    provider: "Sparkle Wash",
    service: "Premium Wash",
    date: "2023-03-16",
    status: "Delivered",
    amount: 29.99,
  },
  {
    id: "1237",
    customer: "Emily Davis",
    provider: "Laundry Express",
    service: "Ironing",
    date: "2023-03-17",
    status: "Delivered",
    amount: 19.99,
  },
  {
    id: "1238",
    customer: "Michael Wilson",
    provider: "Wash & Fold Co.",
    service: "Standard Wash",
    date: "2023-03-18",
    status: "Delivered",
    amount: 24.99,
  },
  {
    id: "1239",
    customer: "Sarah Johnson",
    provider: "CleanCo Laundry",
    service: "Premium Wash",
    date: "2023-03-19",
    status: "Delivered",
    amount: 29.99,
  },
  {
    id: "1240",
    customer: "David Brown",
    provider: "Fresh Fold Services",
    service: "Dry Cleaning",
    date: "2023-03-20",
    status: "Delivered",
    amount: 34.99,
  },
  {
    id: "1241",
    customer: "Jennifer Lee",
    provider: "CleanCo Laundry",
    service: "Ironing",
    date: "2023-03-21",
    status: "Delivered",
    amount: 19.99,
  },
  {
    id: "1242",
    customer: "Thomas Wilson",
    provider: "Laundry Express",
    service: "Standard Wash",
    date: "2023-03-22",
    status: "Delivered",
    amount: 24.99,
  },
  {
    id: "1243",
    customer: "Amanda Garcia",
    provider: "CleanCo Laundry",
    service: "Premium Wash",
    date: "2023-03-23",
    status: "Delivered",
    amount: 29.99,
  },
]

// Mock data for revenue by provider
const mockRevenueByProvider = [
  { provider: "CleanCo Laundry", orders: 78, revenue: 2145.22, commission: 214.52 },
  { provider: "Fresh Fold Services", orders: 65, revenue: 1950.35, commission: 195.04 },
  { provider: "Sparkle Wash", orders: 42, revenue: 1259.58, commission: 125.96 },
  { provider: "Laundry Express", orders: 53, revenue: 1324.47, commission: 132.45 },
  { provider: "Wash & Fold Co.", orders: 37, revenue: 925.63, commission: 92.56 },
]

// Mock data for revenue by service
const mockRevenueByService = [
  { service: "Standard Wash", count: 112, revenue: 2799.88 },
  { service: "Premium Wash", count: 87, revenue: 2609.13 },
  { service: "Dry Cleaning", count: 95, revenue: 3324.05 },
  { service: "Ironing", count: 68, revenue: 1359.32 },
  { service: "Wash & Iron", count: 43, revenue: 1505.71 },
]

// Mock data for daily revenue
const mockDailyRevenue = [
  { date: "2023-03-14", orders: 15, revenue: 404.85, commission: 40.49 },
  { date: "2023-03-15", orders: 18, revenue: 539.82, commission: 53.98 },
  { date: "2023-03-16", orders: 12, revenue: 359.88, commission: 35.99 },
  { date: "2023-03-17", orders: 16, revenue: 494.84, commission: 49.48 },
  { date: "2023-03-18", orders: 20, revenue: 599.8, commission: 59.98 },
  { date: "2023-03-19", orders: 14, revenue: 404.86, commission: 40.49 },
  { date: "2023-03-20", orders: 22, revenue: 659.78, commission: 65.98 },
  { date: "2023-03-21", orders: 19, revenue: 569.81, commission: 56.98 },
  { date: "2023-03-22", orders: 17, revenue: 494.83, commission: 49.48 },
  { date: "2023-03-23", orders: 21, revenue: 629.79, commission: 62.98 },
]

export default function AdminReportsPage() {
  const { toast } = useToast()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [reportType, setReportType] = useState("platform")
  const [providerFilter, setProviderFilter] = useState("all")

  // Get unique providers for filter
  const providers = [...new Set(mockOrders.map((order) => order.provider))]

  // Replace the simplified generatePDF function with a more complete implementation

  const generatePDF = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Date range required",
        description: "Please select both start and end dates for the report.",
        variant: "destructive",
      })
      return
    }

    try {
      // Create a new PDF document
      const doc = new jsPDF()

      // Add company logo/header
      doc.setFontSize(20)
      doc.setTextColor(255, 153, 51) // Saffron color
      doc.text("LaundryConnect", 105, 20, { align: "center" })

      // Add report title
      doc.setFontSize(16)
      doc.setTextColor(0, 0, 0)
      doc.text("ADMIN REPORT", 105, 30, { align: "center" })

      // Add date range and report type
      doc.setFontSize(10)
      doc.text(
        `Report Period: ${startDate ? format(startDate, "MMM dd, yyyy") : ""} - ${endDate ? format(endDate, "MMM dd, yyyy") : ""}`,
        105,
        40,
        { align: "center" },
      )
      doc.text(`Report Type: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`, 105, 45, { align: "center" })
      doc.text(`Generated on: ${format(new Date(), "MMM dd, yyyy")}`, 105, 50, { align: "center" })

      if (reportType === "platform") {
        // Add platform overview
        doc.setFontSize(14)
        doc.text("Platform Overview", 20, 60)

        // Add daily revenue table
        const tableColumn = ["Date", "Orders", "Revenue", "Platform Commission"]
        const tableRows = mockDailyRevenue
          .slice(0, 5)
          .map((item) => [
            item.date,
            item.orders.toString(),
            `₹${item.revenue.toFixed(2)}`,
            `₹${item.commission.toFixed(2)}`,
          ])

        // Add revenue table
        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 65,
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: { fillColor: [19, 136, 8] }, // Green color
        })

        // Add provider revenue table
        const finalY1 = (doc as any).lastAutoTable.finalY + 15

        doc.setFontSize(14)
        doc.text("Revenue by Provider", 20, finalY1)

        const providerTableColumn = ["Provider", "Orders", "Revenue", "Platform Commission"]
        const providerTableRows = mockRevenueByProvider.map((item) => [
          item.provider,
          item.orders.toString(),
          `₹${item.revenue.toFixed(2)}`,
          `₹${item.commission.toFixed(2)}`,
        ])

        // Add provider table
        autoTable(doc, {
          head: [providerTableColumn],
          body: providerTableRows,
          startY: finalY1 + 5,
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: { fillColor: [19, 136, 8] }, // Green color
        })

        // Add summary
        const finalY2 = (doc as any).lastAutoTable.finalY + 10
        const totalRevenue = mockRevenueByProvider.reduce((sum, item) => sum + item.revenue, 0)
        const totalCommission = mockRevenueByProvider.reduce((sum, item) => sum + item.commission, 0)
        const totalOrders = mockRevenueByProvider.reduce((sum, item) => sum + item.orders, 0)

        doc.setFontSize(12)
        doc.text(`Total Providers: ${mockRevenueByProvider.length}`, 20, finalY2)
        doc.text(`Total Orders: ${totalOrders}`, 20, finalY2 + 6)
        doc.text(`Total Revenue: ₹${totalRevenue.toFixed(2)}`, 20, finalY2 + 12)
        doc.text(`Total Commission: ₹${totalCommission.toFixed(2)}`, 20, finalY2 + 18)
      } else if (reportType === "provider") {
        // Add provider overview
        doc.setFontSize(14)
        doc.text("Provider Performance", 20, 60)

        // Filter by provider if selected
        const filteredProviderRevenue =
          providerFilter === "all"
            ? mockRevenueByProvider
            : mockRevenueByProvider.filter((item) => item.provider === providerFilter)

        // Add provider revenue table
        const providerTableColumn = ["Provider", "Orders", "Revenue", "Platform Commission"]
        const providerTableRows = filteredProviderRevenue.map((item) => [
          item.provider,
          item.orders.toString(),
          `₹${item.revenue.toFixed(2)}`,
          `₹${item.commission.toFixed(2)}`,
        ])

        // Add provider table
        autoTable(doc, {
          head: [providerTableColumn],
          body: providerTableRows,
          startY: 65,
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: { fillColor: [19, 136, 8] }, // Green color
        })

        // Add orders table
        const finalY1 = (doc as any).lastAutoTable.finalY + 15

        doc.setFontSize(14)
        doc.text("Provider Orders", 20, finalY1)

        // Filter orders by provider
        const filteredOrders = mockOrders
          .filter((order) => providerFilter === "all" || order.provider === providerFilter)
          .slice(0, 10)

        const orderTableColumn = ["Order ID", "Customer", "Provider", "Service", "Date", "Amount"]
        const orderTableRows = filteredOrders.map((order) => [
          order.id,
          order.customer,
          order.provider,
          order.service,
          order.date,
          `₹${order.amount.toFixed(2)}`,
        ])

        // Add orders table
        autoTable(doc, {
          head: [orderTableColumn],
          body: orderTableRows,
          startY: finalY1 + 5,
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: { fillColor: [19, 136, 8] }, // Green color
        })

        // Add summary
        const finalY2 = (doc as any).lastAutoTable.finalY + 10
        const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0)

        doc.setFontSize(12)
        doc.text(`Total Orders: ${filteredOrders.length}`, 20, finalY2)
        doc.text(`Total Revenue: ₹${totalAmount.toFixed(2)}`, 20, finalY2 + 6)
      } else if (reportType === "service") {
        // Add service overview
        doc.setFontSize(14)
        doc.text("Service Performance", 20, 60)

        // Add service revenue table
        const serviceTableColumn = ["Service", "Order Count", "Revenue"]
        const serviceTableRows = mockRevenueByService.map((item) => [
          item.service,
          item.count.toString(),
          `₹${item.revenue.toFixed(2)}`,
        ])

        // Add service table
        autoTable(doc, {
          head: [serviceTableColumn],
          body: serviceTableRows,
          startY: 65,
          theme: "grid",
          styles: { fontSize: 10 },
          headStyles: { fillColor: [19, 136, 8] }, // Green color
        })

        // Add summary
        const finalY = (doc as any).lastAutoTable.finalY + 10
        const totalRevenue = mockRevenueByService.reduce((sum, item) => sum + item.revenue, 0)
        const totalOrders = mockRevenueByService.reduce((sum, item) => sum + item.count, 0)

        doc.setFontSize(12)
        doc.text(`Total Services: ${mockRevenueByService.length}`, 20, finalY)
        doc.text(`Total Orders: ${totalOrders}`, 20, finalY + 6)
        doc.text(`Total Revenue: ₹${totalRevenue.toFixed(2)}`, 20, finalY + 12)
      }

      // Add footer
      doc.setFontSize(10)
      doc.text("Thank you for using LaundryConnect!", 105, 280, { align: "center" })
      doc.text("For any questions, please contact support@laundryconnect.com", 105, 285, { align: "center" })

      // Save the PDF
      doc.save(`admin-${reportType}-report-${format(new Date(), "yyyy-MM-dd")}.pdf`)

      toast({
        title: "Report generated",
        description: "Your report has been generated and downloaded successfully.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "There was a problem generating your report. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Platform Reports</h2>
        <p className="text-muted-foreground">Generate and download comprehensive reports for the laundry platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Select a date range and report type to generate a downloadable PDF report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="space-y-2">
                <div className="font-medium">Start Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal sm:w-[240px]",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <div className="font-medium">End Date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal sm:w-[240px]",
                        !endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) => (startDate ? date < startDate : false) || date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <div className="font-medium">Report Type</div>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platform">Platform Overview</SelectItem>
                    <SelectItem value="provider">Provider Performance</SelectItem>
                    <SelectItem value="service">Service Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {reportType === "provider" && (
                <div className="space-y-2">
                  <div className="font-medium">Provider</div>
                  <Select value={providerFilter} onValueChange={setProviderFilter}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Providers</SelectItem>
                      {providers.map((provider) => (
                        <SelectItem key={provider} value={provider}>
                          {provider}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generatePDF}>
            <Download className="mr-2 h-4 w-4" />
            Generate PDF Report
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Report Preview</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>Preview of your report based on selected parameters</CardDescription>
            </CardHeader>
            <CardContent>
              {!startDate || !endDate ? (
                <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                  <div className="flex flex-col items-center gap-1 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">No Preview Available</h3>
                    <p className="text-sm text-muted-foreground">Select a date range to preview your report</p>
                  </div>
                </div>
              ) : reportType === "platform" ? (
                <div className="space-y-6">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Platform Overview</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Date</th>
                            <th className="px-4 py-2 text-left font-medium">Orders</th>
                            <th className="px-4 py-2 text-right font-medium">Revenue</th>
                            <th className="px-4 py-2 text-right font-medium">Platform Commission</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockDailyRevenue.slice(0, 5).map((item) => (
                            <tr key={item.date} className="border-b">
                              <td className="px-4 py-2">{item.date}</td>
                              <td className="px-4 py-2">{item.orders}</td>
                              <td className="px-4 py-2 text-right">₹{item.revenue.toFixed(2)}</td>
                              <td className="px-4 py-2 text-right">₹{item.commission.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="font-medium">
                            <td className="px-4 py-2">Total</td>
                            <td className="px-4 py-2">
                              {mockDailyRevenue.slice(0, 5).reduce((sum, item) => sum + item.orders, 0)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              ₹
                              {mockDailyRevenue
                                .slice(0, 5)
                                .reduce((sum, item) => sum + item.revenue, 0)
                                .toFixed(2)}
                            </td>
                            <td className="px-4 py-2 text-right">
                              ₹
                              {mockDailyRevenue
                                .slice(0, 5)
                                .reduce((sum, item) => sum + item.commission, 0)
                                .toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Revenue by Provider</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Provider</th>
                            <th className="px-4 py-2 text-left font-medium">Orders</th>
                            <th className="px-4 py-2 text-right font-medium">Revenue</th>
                            <th className="px-4 py-2 text-right font-medium">Platform Commission</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockRevenueByProvider.map((item) => (
                            <tr key={item.provider} className="border-b">
                              <td className="px-4 py-2">{item.provider}</td>
                              <td className="px-4 py-2">{item.orders}</td>
                              <td className="px-4 py-2 text-right">₹{item.revenue.toFixed(2)}</td>
                              <td className="px-4 py-2 text-right">₹{item.commission.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : reportType === "provider" ? (
                <div className="space-y-6">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Provider Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                        {providerFilter !== "all" ? ` • ${providerFilter}` : " • All Providers"}
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Provider</th>
                            <th className="px-4 py-2 text-left font-medium">Orders</th>
                            <th className="px-4 py-2 text-right font-medium">Revenue</th>
                            <th className="px-4 py-2 text-right font-medium">Platform Commission</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(providerFilter === "all"
                            ? mockRevenueByProvider
                            : mockRevenueByProvider.filter((p) => p.provider === providerFilter)
                          ).map((item) => (
                            <tr key={item.provider} className="border-b">
                              <td className="px-4 py-2">{item.provider}</td>
                              <td className="px-4 py-2">{item.orders}</td>
                              <td className="px-4 py-2 text-right">₹{item.revenue.toFixed(2)}</td>
                              <td className="px-4 py-2 text-right">₹{item.commission.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Provider Orders</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Order ID</th>
                            <th className="px-4 py-2 text-left font-medium">Customer</th>
                            <th className="px-4 py-2 text-left font-medium">Provider</th>
                            <th className="px-4 py-2 text-left font-medium">Service</th>
                            <th className="px-4 py-2 text-left font-medium">Date</th>
                            <th className="px-4 py-2 text-right font-medium">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockOrders
                            .filter((o) => providerFilter === "all" || o.provider === providerFilter)
                            .slice(0, 5)
                            .map((order) => (
                              <tr key={order.id} className="border-b">
                                <td className="px-4 py-2">{order.id}</td>
                                <td className="px-4 py-2">{order.customer}</td>
                                <td className="px-4 py-2">{order.provider}</td>
                                <td className="px-4 py-2">{order.service}</td>
                                <td className="px-4 py-2">{order.date}</td>
                                <td className="px-4 py-2 text-right">₹{order.amount.toFixed(2)}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-md border">
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">Service Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
                      </p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="px-4 py-2 text-left font-medium">Service</th>
                            <th className="px-4 py-2 text-left font-medium">Order Count</th>
                            <th className="px-4 py-2 text-right font-medium">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockRevenueByService.map((item) => (
                            <tr key={item.service} className="border-b">
                              <td className="px-4 py-2">{item.service}</td>
                              <td className="px-4 py-2">{item.count}</td>
                              <td className="px-4 py-2 text-right">₹{item.revenue.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="font-medium">
                            <td colSpan={2} className="px-4 py-2 text-right">
                              Total:
                            </td>
                            <td className="px-4 py-2 text-right">
                              ₹{mockRevenueByService.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Reports</CardTitle>
              <CardDescription>Access your previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Monthly Platform Report</h3>
                      <p className="text-sm text-muted-foreground">Mar 01, 2023 - Mar 31, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Quarterly Provider Performance</h3>
                      <p className="text-sm text-muted-foreground">Jan 01, 2023 - Mar 31, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Service Analysis Report</h3>
                      <p className="text-sm text-muted-foreground">Feb 01, 2023 - Feb 28, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">CleanCo Laundry Performance</h3>
                      <p className="text-sm text-muted-foreground">Mar 01, 2023 - Mar 31, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
