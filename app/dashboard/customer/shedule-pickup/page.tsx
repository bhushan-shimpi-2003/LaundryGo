"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Banknote, CalendarIcon, Clock, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormDescription, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Mock data for service types
const serviceTypes = [
  {
    id: "standard-wash",
    name: "Standard Wash",
    description: "Regular washing and drying service",
    price: 9.99,
    estimatedTime: "48 hours",
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description: "Premium washing with fabric softener and special care",
    price: 14.99,
    estimatedTime: "48 hours",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    description: "Professional dry cleaning for delicate items",
    price: 19.99,
    estimatedTime: "72 hours",
  },
  {
    id: "ironing",
    name: "Ironing Service",
    description: "Professional ironing for your clothes",
    price: 7.99,
    estimatedTime: "24 hours",
  },
  {
    id: "wash-iron",
    name: "Wash & Iron",
    description: "Complete washing and ironing service",
    price: 16.99,
    estimatedTime: "72 hours",
  },
]

// Mock data for time slots
const timeSlots = [
  "8:00 AM - 10:00 AM",
  "10:00 AM - 12:00 PM",
  "12:00 PM - 2:00 PM",
  "2:00 PM - 4:00 PM",
  "4:00 PM - 6:00 PM",
  "6:00 PM - 8:00 PM",
]

// Mock data for saved addresses
const savedAddresses = [
  {
    id: "home",
    name: "Home",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    isDefault: true,
  },
  {
    id: "work",
    name: "Work",
    address: "456 Business Ave, Suite 200, New York, NY 10002",
    isDefault: false,
  },
]

// Add this after the savedAddresses array
const paymentMethods = [
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay in cash when your laundry is delivered",
    icon: "cash",
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Pay securely with your card",
    icon: "credit-card",
  },
]

export default function SchedulePickupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const [date, setDate] = useState<Date | undefined>(tomorrow)
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [selectedAddress, setSelectedAddress] = useState<string>("home")
  const [useNewAddress, setUseNewAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // Add this to the component state declarations
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("cod")
  const [showCardForm, setShowCardForm] = useState(false)

  const handleNext = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = () => {
    setIsLoading(true)

    // Validate all required fields
    if (!selectedService) {
      toast({
        title: "Missing information",
        description: "Please select a service type.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!date) {
      toast({
        title: "Missing information",
        description: "Please select a pickup date.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!selectedTimeSlot) {
      toast({
        title: "Missing information",
        description: "Please select a pickup time slot.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!selectedAddress && !useNewAddress) {
      toast({
        title: "Missing information",
        description: "Please select an address.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Missing information",
        description: "Please select a payment method.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Simulate order creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Pickup Scheduled",
        description: "Your laundry pickup has been scheduled successfully.",
      })
      router.push("/dashboard/customer/orders")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/customer">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Schedule Pickup</h2>
          <p className="text-muted-foreground">Create a new laundry service order</p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
            step >= 1
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground text-muted-foreground",
          )}
        >
          1
        </div>
        <div className={cn("h-0.5 w-10", step >= 2 ? "bg-primary" : "bg-muted-foreground")} />
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
            step >= 2
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground text-muted-foreground",
          )}
        >
          2
        </div>
        <div className={cn("h-0.5 w-10", step >= 3 ? "bg-primary" : "bg-muted-foreground")} />
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
            step >= 3
              ? "border-primary bg-primary text-primary-foreground"
              : "border-muted-foreground text-muted-foreground",
          )}
        >
          3
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Service</CardTitle>
            <CardDescription>Choose the type of laundry service you need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedService} onValueChange={setSelectedService}>
              {serviceTypes.map((service) => (
                <div key={service.id} className="flex">
                  <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                    <FormControl>
                      <RadioGroupItem value={service.id} />
                    </FormControl>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base font-medium">{service.name}</FormLabel>
                        <span className="text-base font-medium">${service.price.toFixed(2)}</span>
                      </div>
                      <FormDescription className="text-sm text-muted-foreground">{service.description}</FormDescription>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="mr-1 h-3 w-3" />
                        Estimated turnaround: {service.estimatedTime}
                      </div>
                    </div>
                  </FormItem>
                </div>
              ))}
            </RadioGroup>

            <div className="space-y-2">
              <FormLabel>Special Instructions (Optional)</FormLabel>
              <Textarea placeholder="Any special instructions for handling your laundry..." className="min-h-[100px]" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/dashboard/customer">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleNext} disabled={!selectedService}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule Pickup</CardTitle>
            <CardDescription>Choose when you want your laundry to be picked up</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Pickup Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toLocaleDateString() : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => {
                      // Disable dates in the past
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <FormLabel>Pickup Time</FormLabel>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!date || !selectedTimeSlot}>
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Pickup Address</CardTitle>
            <CardDescription>Where should we pick up your laundry?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="use-new-address"
                  checked={useNewAddress}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setUseNewAddress(true)
                    } else {
                      setUseNewAddress(false)
                    }
                  }}
                />
                <label
                  htmlFor="use-new-address"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use a new address
                </label>
              </div>

              {!useNewAddress ? (
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {savedAddresses.map((address) => (
                    <div key={address.id} className="flex">
                      <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                        <FormControl>
                          <RadioGroupItem value={address.id} />
                        </FormControl>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <FormLabel className="text-base font-medium">{address.name}</FormLabel>
                            {address.isDefault && (
                              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                Default
                              </span>
                            )}
                          </div>
                          <FormDescription className="text-sm text-muted-foreground">{address.address}</FormDescription>
                        </div>
                      </FormItem>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Address Name</FormLabel>
                      <Input placeholder="e.g., Home, Work, etc." />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Phone Number</FormLabel>
                      <Input type="tel" placeholder="Your contact number" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Street Address</FormLabel>
                    <Input placeholder="Street address" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>City</FormLabel>
                      <Input placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>State</FormLabel>
                      <Input placeholder="State" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Zip Code</FormLabel>
                      <Input placeholder="Zip code" />
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Country</FormLabel>
                      <Input placeholder="Country" defaultValue="United States" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-address" />
                    <label
                      htmlFor="save-address"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this address for future orders
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Add this before the Separator and Order Summary in step 3 */}
            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={(value) => {
                  setSelectedPaymentMethod(value)
                  setShowCardForm(value === "card")
                }}
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex">
                    <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                      <FormControl>
                        <RadioGroupItem value={method.id} />
                      </FormControl>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center">
                          <FormLabel className="text-base font-medium">{method.name}</FormLabel>
                          {method.icon === "cash" ? (
                            <Banknote className="ml-2 h-4 w-4 text-muted-foreground" />
                          ) : (
                            <CreditCard className="ml-2 h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <FormDescription className="text-sm text-muted-foreground">
                          {method.description}
                        </FormDescription>
                      </div>
                    </FormItem>
                  </div>
                ))}
              </RadioGroup>

              {showCardForm && (
                <Card className="mt-4">
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Card Number</FormLabel>
                      <Input placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormLabel>Expiration Date</FormLabel>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>CVC</FormLabel>
                        <Input placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Cardholder Name</FormLabel>
                      <Input placeholder="Name as it appears on card" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Order Summary</h3>
              <div className="rounded-md border p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Service:</span>
                  <span>{serviceTypes.find((s) => s.id === selectedService)?.name || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Pickup Date:</span>
                  <span>{date ? date.toLocaleDateString() : "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Pickup Time:</span>
                  <span>{selectedTimeSlot || "Not selected"}</span>
                </div>
                {/* Add this to the order summary, before the Separator */}
                <div className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span>{paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name || "Not selected"}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total:</span>
                  <span>${serviceTypes.find((s) => s.id === selectedService)?.price.toFixed(2) || "0.00"}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Processing..." : "Schedule Pickup"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

