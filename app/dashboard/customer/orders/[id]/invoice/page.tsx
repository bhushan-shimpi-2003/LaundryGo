"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Mock data for the order (same as in the order details page)
const orderData = {
  id: "1234",
  date: "Mar 14, 2023",
  status: "In Progress",
  service: "Standard Wash",
  weight: "5 kg",
  amount: "₹999",
  paymentMethod: "Visa ending in 4242",
  paymentStatus: "Paid",
  gstNumber: "27AAPFU0939F1ZV",
  panNumber: "AAPFU0939F",
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
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 12345",
  },
  provider: {
    name: "CleanCo Laundry",
    address: "789 Laundry St, Mumbai, MH 400001",
    phone: "+91 98765 43210",
    gstNumber: "27AABCC1234D1Z5",
    panNumber: "AABCC1234D",
    rating: 4.8,
  },
  items: [
    { name: "T-shirts", quantity: 3, price: "₹300", rate: "₹100" },
    { name: "Pants", quantity: 2, price: "₹400", rate: "₹200" },
    { name: "Shirts", quantity: 2, price: "₹200", rate: "₹100" },
    { name: "Socks (pairs)", quantity: 4, price: "₹100", rate: "₹25" },
  ],
  address: {
    type: "Home",
    street: "123 Main St, Apt 4B",
    city: "Mumbai, MH 400001",
    phone: "+91 98765 12345",
  },
  taxes: {
    cgst: "₹89.91",
    sgst: "₹89.91",
    total: "₹179.82",
  },
  subtotal: "₹819.18",
  total: "₹999",
}

export default function InvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const invoiceRef = useRef<HTMLDivElement>(null)
  const [invoiceNumber] = useState(`INV-${params.id}-${Date.now().toString().slice(-6)}`)

  const handlePrint = () => {
    window.print()
    toast({
      title: "Print initiated",
      description: "Your invoice has been sent to the printer.",
    })
  }

  const handleDownload = () => {
    generatePDF()
  }

  const generatePDF = () => {
    try {
      // Create a new PDF document
      const doc = new jsPDF()

      // Add company logo/header
      doc.setFontSize(20)
      doc.setTextColor(255, 153, 51) // Saffron color
      doc.text("LaundryConnect", 105, 20, { align: "center" })

      // Add invoice title
      doc.setFontSize(16)
      doc.setTextColor(0, 0, 0)
      doc.text(`TAX INVOICE #${invoiceNumber}`, 105, 30, { align: "center" })

      // Add date and status
      doc.setFontSize(10)
      doc.text(`Date: ${orderData.date}`, 20, 40)
      doc.text(`Order ID: #${params.id}`, 20, 45)
      doc.text(`Status: ${orderData.paymentStatus}`, 20, 50)

      // Add provider information
      doc.setFontSize(12)
      doc.text("Service Provider", 20, 60)
      doc.setFontSize(10)
      doc.text(`${orderData.provider.name}`, 20, 67)
      doc.text(`${orderData.provider.address}`, 20, 72)
      doc.text(`Phone: ${orderData.provider.phone}`, 20, 77)
      doc.text(`GSTIN: ${orderData.provider.gstNumber}`, 20, 82)
      doc.text(`PAN: ${orderData.provider.panNumber}`, 20, 87)

      // Add customer information
      doc.setFontSize(12)
      doc.text("Bill To", 120, 60)
      doc.setFontSize(10)
      doc.text(`${orderData.customer.name}`, 120, 67)
      doc.text(`${orderData.address.street}`, 120, 72)
      doc.text(`${orderData.address.city}`, 120, 77)
      doc.text(`Phone: ${orderData.address.phone}`, 120, 82)
      doc.text(`Email: ${orderData.customer.email}`, 120, 87)

      // Create table for items
      const tableColumn = ["Item", "Rate", "Quantity", "Amount"]
      const tableRows = orderData.items.map((item) => [item.name, item.rate, item.quantity.toString(), item.price])

      // Add items table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 95,
        theme: "grid",
        styles: { fontSize: 10 },
        headStyles: { fillColor: [19, 136, 8] }, // Green color
      })

      // Add total
      const finalY = (doc as any).lastAutoTable.finalY + 10

      doc.text("Subtotal:", 140, finalY)
      doc.text(orderData.subtotal, 170, finalY, { align: "right" })

      doc.text("CGST (9%):", 140, finalY + 5)
      doc.text(orderData.taxes.cgst, 170, finalY + 5, { align: "right" })

      doc.text("SGST (9%):", 140, finalY + 10)
      doc.text(orderData.taxes.sgst, 170, finalY + 10, { align: "right" })

      doc.setLineWidth(0.5)
      doc.line(140, finalY + 12, 170, finalY + 12)

      doc.setFont("helvetica", "bold")
      doc.text("Total Amount:", 140, finalY + 17)
      doc.text(orderData.total, 170, finalY + 17, { align: "right" })

      // Add footer
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      doc.text("Thank you for using LaundryConnect!", 105, finalY + 30, { align: "center" })
      doc.text("For any questions, please contact support@laundryconnect.com", 105, finalY + 35, { align: "center" })

      // Add terms and conditions
      doc.setFontSize(8)
      doc.text("Terms & Conditions:", 20, finalY + 45)
      doc.text("1. All disputes are subject to Mumbai jurisdiction.", 20, finalY + 50)
      doc.text("2. This is a computer-generated invoice and does not require a signature.", 20, finalY + 55)

      // Save the PDF
      doc.save(`LaundryConnect_Invoice_${params.id}.pdf`)

      // Show success toast
      toast({
        title: "Invoice Downloaded",
        description: "Your invoice has been downloaded successfully.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "There was a problem generating your invoice. Please try again.",
        variant: "destructive",
      })
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
            <h2 className="text-2xl font-bold tracking-tight">Invoice #{invoiceNumber}</h2>
            <p className="text-muted-foreground">
              Order #{params.id} • {orderData.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div ref={invoiceRef} className="bg-white p-8 rounded-lg border shadow-sm print:shadow-none print:border-none">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col items-center justify-center border-b pb-6">
            <h1 className="text-3xl font-bold text-[#FF9933]">LaundryConnect</h1>
            <p className="text-xl font-semibold mt-2">TAX INVOICE</p>
            <p className="text-muted-foreground">Invoice #{invoiceNumber}</p>
          </div>

          {/* Provider and Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-[#FF9933]">Service Provider:</h3>
              <p className="font-medium">{orderData.provider.name}</p>
              <p className="text-sm text-muted-foreground">{orderData.provider.address}</p>
              <p className="text-sm text-muted-foreground">Phone: {orderData.provider.phone}</p>
              <p className="text-sm text-muted-foreground">GSTIN: {orderData.provider.gstNumber}</p>
              <p className="text-sm text-muted-foreground">PAN: {orderData.provider.panNumber}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#FF9933]">Bill To:</h3>
              <p className="font-medium">{orderData.customer.name}</p>
              <p className="text-sm text-muted-foreground">{orderData.address.street}</p>
              <p className="text-sm text-muted-foreground">{orderData.address.city}</p>
              <p className="text-sm text-muted-foreground">Phone: {orderData.address.phone}</p>
              <p className="text-sm text-muted-foreground">Email: {orderData.customer.email}</p>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invoice Date</p>
                <p className="text-sm font-medium">{orderData.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                <p className="text-sm font-medium">#{params.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
                <p className="text-sm font-medium">{orderData.paymentStatus}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                <p className="text-sm font-medium">{orderData.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="border rounded-md">
            <div className="grid grid-cols-4 p-3 text-sm font-medium bg-[#138808]/10">
              <div>Item</div>
              <div className="text-center">Rate</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Amount</div>
            </div>
            <Separator />
            {orderData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-4 p-3 text-sm">
                <div>{item.name}</div>
                <div className="text-center">{item.rate}</div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-right">{item.price}</div>
              </div>
            ))}
            <Separator />
            <div className="grid grid-cols-4 p-3 text-sm">
              <div className="col-span-3 text-right font-medium">Subtotal:</div>
              <div className="text-right">{orderData.subtotal}</div>
            </div>
            <div className="grid grid-cols-4 p-3 text-sm">
              <div className="col-span-3 text-right font-medium">CGST (9%):</div>
              <div className="text-right">{orderData.taxes.cgst}</div>
            </div>
            <div className="grid grid-cols-4 p-3 text-sm">
              <div className="col-span-3 text-right font-medium">SGST (9%):</div>
              <div className="text-right">{orderData.taxes.sgst}</div>
            </div>
            <Separator />
            <div className="grid grid-cols-4 p-3 text-sm font-bold">
              <div className="col-span-3 text-right">Total:</div>
              <div className="text-right">{orderData.total}</div>
            </div>
          </div>

          {/* Terms and Notes */}
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-[#FF9933]">Notes:</h4>
              <p className="text-muted-foreground">{orderData.specialInstructions}</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#FF9933]">Terms & Conditions:</h4>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1 pl-2">
                <li>All disputes are subject to Mumbai jurisdiction.</li>
                <li>This is a computer-generated invoice and does not require a signature.</li>
              </ol>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground border-t pt-6">
            <p>Thank you for using LaundryConnect!</p>
            <p>For any questions, please contact support@laundryconnect.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
