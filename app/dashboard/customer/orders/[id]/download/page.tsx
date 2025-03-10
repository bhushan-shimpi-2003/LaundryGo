"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

// Mock data for the order (same as in the order details page)
const orderData = {
  id: "1234",
  date: "Mar 14, 2023",
  status: "In Progress",
  service: "Standard Wash",
  weight: "5 kg",
  amount: "$24.99",
  paymentMethod: "Visa ending in 4242",
  specialInstructions: "Please handle with care. There are some delicate items.",
  timeline: [
    {
      status: "Order Placed",
      date: "Mar 14, 2023",
      time: "10:30 AM",
      completed: true,
    },
    {
      status: "Picked Up",
      date: "Mar 14, 2023",
      time: "2:00 PM",
      completed: true,
    },
    {
      status: "Processing",
      date: "Mar 14, 2023",
      time: "3:30 PM",
      completed: true,
    },
    {
      status: "Out for Delivery",
      date: "Mar 15, 2023",
      time: "10:00 AM",
      completed: false,
      estimated: true,
    },
    {
      status: "Delivered",
      date: "Mar 15, 2023",
      time: "12:00 PM",
      completed: false,
      estimated: true,
    },
  ],
  provider: {
    name: "CleanCo Laundry",
    address: "789 Laundry St, New York, NY 10003",
    phone: "+1 (555) 987-6543",
    rating: 4.8,
  },
  items: [
    { name: "T-shirts", quantity: 3, price: "$9.00" },
    { name: "Pants", quantity: 2, price: "$8.00" },
    { name: "Shirts", quantity: 2, price: "$6.00" },
    { name: "Socks (pairs)", quantity: 4, price: "$2.00" },
  ],
  address: {
    type: "Home",
    street: "123 Main St, Apt 4B",
    city: "New York, NY 10001",
    phone: "+1 (555) 123-4567",
  },
}

export default function DownloadOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(true)

  useEffect(() => {
    // Generate PDF on component mount
    generatePDF()
  }, [])

  const generatePDF = () => {
    try {
      setIsGenerating(true)

      // Create a new PDF document
      const doc = new jsPDF()

      // Add company logo/header
      doc.setFontSize(20)
      doc.setTextColor(41, 98, 255) // Primary color
      doc.text("LaundryConnect", 105, 20, { align: "center" })

      // Add invoice title
      doc.setFontSize(16)
      doc.setTextColor(0, 0, 0)
      doc.text(`ORDER RECEIPT #${params.id}`, 105, 30, { align: "center" })

      // Add date and status
      doc.setFontSize(10)
      doc.text(`Date: ${orderData.date}`, 20, 40)
      doc.text(`Status: ${orderData.status}`, 20, 45)

      // Add customer information
      doc.setFontSize(12)
      doc.text("Customer Information", 20, 55)
      doc.setFontSize(10)
      doc.text(`Address: ${orderData.address.street}, ${orderData.address.city}`, 20, 62)
      doc.text(`Phone: ${orderData.address.phone}`, 20, 67)

      // Add service provider information
      doc.setFontSize(12)
      doc.text("Service Provider", 120, 55)
      doc.setFontSize(10)
      doc.text(`${orderData.provider.name}`, 120, 62)
      doc.text(`${orderData.provider.phone}`, 120, 67)

      // Add order details
      doc.setFontSize(12)
      doc.text("Order Details", 20, 80)

      // Create table for items
      const tableColumn = ["Item", "Quantity", "Price"]
      const tableRows = orderData.items.map((item) => [item.name, item.quantity.toString(), item.price])

      // Add items table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 85,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 98, 255] },
      })

      // Add total
      const finalY = (doc as any).lastAutoTable.finalY + 10
      doc.text("Service Type:", 20, finalY)
      doc.text(orderData.service, 70, finalY)

      doc.text("Weight:", 20, finalY + 5)
      doc.text(orderData.weight, 70, finalY + 5)

      doc.text("Payment Method:", 20, finalY + 10)
      doc.text(orderData.paymentMethod, 70, finalY + 10)

      doc.setFontSize(12)
      doc.text("Total Amount:", 20, finalY + 20)
      doc.setFont("helvetica", "bold")
      doc.text(orderData.amount, 70, finalY + 20)

      // Add footer
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.text("Thank you for using LaundryConnect!", 105, finalY + 35, { align: "center" })
      doc.text("For any questions, please contact support@laundryconnect.com", 105, finalY + 40, { align: "center" })

      // Save the PDF
      doc.save(`LaundryConnect_Order_${params.id}.pdf`)

      // Show success toast
      toast({
        title: "PDF Generated",
        description: "Your order receipt has been downloaded.",
      })

      // Redirect back to order page after a short delay
      setTimeout(() => {
        setIsGenerating(false)
        router.push(`/dashboard/customer/orders/${params.id}`)
      }, 1000)
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      })
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/customer/orders/${params.id}`}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Downloading Order #{params.id}</h2>
            <p className="text-muted-foreground">Your PDF is being generated...</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>PDF Download</CardTitle>
          <CardDescription>
            {isGenerating
              ? "Your order receipt is being prepared for download."
              : "Your order receipt has been downloaded."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center py-8">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-pulse">
                <Download className="h-16 w-16 text-primary" />
              </div>
              <p>Generating PDF...</p>
              <Progress value={100} className="h-2 w-64 animate-progress" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Download className="h-16 w-16 text-primary" />
              <p>Download complete!</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={generatePDF}>
                  Download Again
                </Button>
                <Button onClick={() => router.push(`/dashboard/customer/orders/${params.id}`)}>Return to Order</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

