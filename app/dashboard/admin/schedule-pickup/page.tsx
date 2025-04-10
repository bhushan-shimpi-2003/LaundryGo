"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Package, Truck, User } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock data for customers
const customers = [
  { id: "CUST001", name: "Rahul Sharma", phone: "9876543210" },
  { id: "CUST002", name: "Priya Patel", phone: "9876543211" },
  { id: "CUST003", name: "Amit Kumar", phone: "9876543212" },
  { id: "CUST004", name: "Neha Singh", phone: "9876543213" },
  { id: "CUST005", name: "Vikram Mehta", phone: "9876543214" },
]

// Mock data for providers
const providers = [
  { id: "SP001", name: "CleanCo Laundry", location: "Mumbai, MH" },
  { id: "SP002", name: "Fresh Fold Services", location: "Delhi, DL" },
  { id: "SP003", name: "Sparkle Wash", location: "Bangalore, KA" },
  { id: "SP004", name: "Laundry Express", location: "Chennai, TN" },
  { id: "SP005", name: "Wash & Fold Co.", location: "Hyderabad, TS" },
]

// Mock data for service types
const serviceTypes = ["Standard Wash", "Premium Wash", "Dry Cleaning", "Ironing", "Wash & Iron", "Express Service"]

// Mock data for pickup times
const pickupTimes = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
]

// Mock data for states
const indianStates = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
]

export default function SchedulePickupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerPhone: "",
    providerId: "",
    pickupDate: undefined as Date | undefined,
    pickupTime: "",
    pickupAddress: "",
    city: "",
    state: "",
    pinCode: "",
    serviceType: "",
    itemDescription: "",
    specialInstructions: "",
  })

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, pickupDate: date }))

    // Clear error when field is edited
    if (errors.pickupDate) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.pickupDate
        return newErrors
      })
    }
  }

  // Handle customer selection
  const handleCustomerChange = (customerId: string) => {
    const selectedCustomer = customers.find((customer) => customer.id === customerId)
    if (selectedCustomer) {
      setFormData((prev) => ({
        ...prev,
        customerId,
        customerName: selectedCustomer.name,
        customerPhone: selectedCustomer.phone,
      }))

      // Clear errors
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.customerId
        delete newErrors.customerName
        delete newErrors.customerPhone
        return newErrors
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.customerId) newErrors.customerId = "Please select a customer."
    if (!formData.customerName) newErrors.customerName = "Customer name is required."
    if (!formData.customerPhone || formData.customerPhone.length < 10)
      newErrors.customerPhone = "Please enter a valid phone number."
    if (!formData.providerId) newErrors.providerId = "Please select a service provider."
    if (!formData.pickupDate) newErrors.pickupDate = "Please select a pickup date."
    if (!formData.pickupTime) newErrors.pickupTime = "Please select a pickup time."
    if (!formData.pickupAddress || formData.pickupAddress.length < 5)
      newErrors.pickupAddress = "Pickup address is required."
    if (!formData.city) newErrors.city = "City is required."
    if (!formData.state) newErrors.state = "State is required."
    if (!formData.pinCode) newErrors.pinCode = "PIN code is required."
    if (!formData.serviceType) newErrors.serviceType = "Please select a service type."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(formData)
      setIsSubmitting(false)

      toast({
        title: "Pickup scheduled successfully",
        description: `Pickup scheduled for ${formData.pickupDate ? format(formData.pickupDate, "PPP") : ""} between ${formData.pickupTime}`,
      })

      router.push("/dashboard/admin/orders")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/admin/orders">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule Pickup</h2>
          <p className="text-muted-foreground">Schedule a laundry pickup for a customer</p>
        </div>
      </div>

      <Card className="border-orange-200">
        <CardHeader className="bg-orange-50 rounded-t-lg">
          <CardTitle>Pickup Details</CardTitle>
          <CardDescription>Enter the details for the laundry pickup</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-orange-700">Customer Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Customer</label>
                    <Select onValueChange={(value) => handleCustomerChange(value)} value={formData.customerId}>
                      <SelectTrigger className={cn(errors.customerId && "border-red-500")}>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name} ({customer.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.customerId && <p className="text-sm text-red-500">{errors.customerId}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Customer Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className={cn("pl-9", errors.customerName && "border-red-500")}
                        placeholder="Customer name"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.customerName && <p className="text-sm text-red-500">{errors.customerName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input
                      placeholder="Customer phone number"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      className={cn(errors.customerPhone && "border-red-500")}
                    />
                    {errors.customerPhone && <p className="text-sm text-red-500">{errors.customerPhone}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Provider</label>
                    <Select
                      onValueChange={(value) => handleSelectChange("providerId", value)}
                      value={formData.providerId}
                    >
                      <SelectTrigger className={cn(errors.providerId && "border-red-500")}>
                        <SelectValue placeholder="Select a service provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {providers.map((provider) => (
                          <SelectItem key={provider.id} value={provider.id}>
                            {provider.name} ({provider.location})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.providerId && <p className="text-sm text-red-500">{errors.providerId}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Pickup Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !formData.pickupDate && "text-muted-foreground",
                            errors.pickupDate && "border-red-500",
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.pickupDate ? format(formData.pickupDate, "PPP") : <span>Select date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.pickupDate}
                          onSelect={handleDateChange}
                          disabled={(date) =>
                            date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <p className="text-xs text-muted-foreground">Select a date within the next 14 days</p>
                    {errors.pickupDate && <p className="text-sm text-red-500">{errors.pickupDate}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup Time</label>
                    <Select
                      onValueChange={(value) => handleSelectChange("pickupTime", value)}
                      value={formData.pickupTime}
                    >
                      <SelectTrigger className={cn(errors.pickupTime && "border-red-500")}>
                        <Clock className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {pickupTimes.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.pickupTime && <p className="text-sm text-red-500">{errors.pickupTime}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        className={cn("pl-9", errors.pickupAddress && "border-red-500")}
                        placeholder="Enter pickup address"
                        name="pickupAddress"
                        value={formData.pickupAddress}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.pickupAddress && <p className="text-sm text-red-500">{errors.pickupAddress}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input
                      placeholder="Enter city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={cn(errors.city && "border-red-500")}
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Select onValueChange={(value) => handleSelectChange("state", value)} value={formData.state}>
                      <SelectTrigger className={cn(errors.state && "border-red-500")}>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PIN Code</label>
                    <Input
                      placeholder="Enter PIN code"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className={cn(errors.pinCode && "border-red-500")}
                    />
                    {errors.pinCode && <p className="text-sm text-red-500">{errors.pinCode}</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-green-700">Service Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Type</label>
                    <Select
                      onValueChange={(value) => handleSelectChange("serviceType", value)}
                      value={formData.serviceType}
                    >
                      <SelectTrigger className={cn(errors.serviceType && "border-red-500")}>
                        <Package className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.serviceType && <p className="text-sm text-red-500">{errors.serviceType}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Item Description</label>
                    <Textarea
                      placeholder="Describe the items to be picked up"
                      className="resize-none"
                      name="itemDescription"
                      value={formData.itemDescription}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">Optional description of the laundry items</p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Special Instructions</label>
                    <Textarea
                      placeholder="Any special instructions for pickup or service"
                      className="resize-none"
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleInputChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional special instructions for the pickup or service
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard/admin/orders")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Truck className="mr-2 h-4 w-4" /> Schedule Pickup
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
