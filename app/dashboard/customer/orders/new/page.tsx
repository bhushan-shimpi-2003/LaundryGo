"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Mock data for service types
const serviceTypes = [
  {
    id: "standard-wash",
    name: "Standard Wash",
    description: "Regular washing and drying service",
    price: 799,
    estimatedTime: "48 hours",
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description: "Premium washing with fabric softener and special care",
    price: 1199,
    estimatedTime: "48 hours",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    description: "Professional dry cleaning for delicate items",
    price: 1599,
    estimatedTime: "72 hours",
  },
  {
    id: "ironing",
    name: "Ironing Service",
    description: "Professional ironing for your clothes",
    price: 599,
    estimatedTime: "24 hours",
  },
  {
    id: "wash-iron",
    name: "Wash & Iron",
    description: "Complete washing and ironing service",
    price: 1299,
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
    address: "123 Main St, Apt 4B, Mumbai, MH 400001",
    isDefault: true,
  },
  {
    id: "work",
    name: "Work",
    address: "456 Business Ave, Suite 200, Mumbai, MH 400002",
    isDefault: false,
  },
]

export default function NewOrderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [selectedAddress, setSelectedAddress] = useState<string>("home")
  const [useNewAddress, setUseNewAddress] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string>("cash")
  const [specialInstructions, setSpecialInstructions] = useState("")

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

    // Simulate order creation
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard/customer/orders")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Schedule Pickup</h2>
        <p className="text-muted-foreground">Create a new laundry service order</p>
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
        <Card className="border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-lg">
            <CardTitle className="text-orange-800">Select Service</CardTitle>
            <CardDescription>Choose the type of laundry service you need</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <RadioGroup value={selectedService} onValueChange={setSelectedService}>
              {serviceTypes.map((service) => (
                <div key={service.id} className="flex">
                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full hover:border-orange-300 hover:bg-orange-50 transition-all duration-200">
                    <RadioGroupItem value={service.id} id={service.id} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={service.id} className="text-base font-medium">
                          {service.name}
                        </Label>
                        <span className="text-base font-medium">₹{service.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Clock className="mr-1 h-3 w-3" />
                        Estimated turnaround: {service.estimatedTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="special-instructions">Special Instructions (Optional)</Label>
              <Textarea
                id="special-instructions"
                placeholder="Any special instructions for handling your laundry..."
                className="min-h-[100px] focus:border-orange-300 focus:ring-orange-200"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-b-lg">
            <Link href="/dashboard/customer/orders">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                Cancel
              </Button>
            </Link>
            <Button
              onClick={handleNext}
              disabled={!selectedService}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card className="border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
            <CardTitle className="text-green-800">Schedule Pickup</CardTitle>
            <CardDescription>Choose when you want your laundry to be picked up</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="pickup-date">Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="pickup-date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-green-200 hover:border-green-300 hover:bg-green-50",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
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
                    className="rounded-md border-green-200"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickup-time">Pickup Time</Label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger
                  id="pickup-time"
                  className="border-green-200 focus:ring-green-200 hover:border-green-300"
                >
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot} className="hover:bg-green-50">
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-b-lg">
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!date || !selectedTimeSlot}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300"
            >
              Next
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
            <CardTitle className="text-blue-800">Pickup Address & Payment</CardTitle>
            <CardDescription>Where should we pick up your laundry and how would you like to pay?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
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
                  className="border-blue-300 text-blue-600 focus:ring-blue-200"
                />
                <Label
                  htmlFor="use-new-address"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use a new address
                </Label>
              </div>

              {!useNewAddress ? (
                <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                  {savedAddresses.map((address) => (
                    <div key={address.id} className="flex">
                      <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                        <RadioGroupItem value={address.id} id={address.id} className="border-blue-300 text-blue-600" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <Label htmlFor={address.id} className="text-base font-medium">
                              {address.name}
                            </Label>
                            {address.isDefault && (
                              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{address.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-4 p-4 border rounded-md border-blue-200 bg-blue-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address-name">Address Name</Label>
                      <Input
                        id="address-name"
                        placeholder="e.g., Home, Work, etc."
                        className="border-blue-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input
                        id="phone-number"
                        type="tel"
                        placeholder="Your contact number"
                        className="border-blue-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="street-address">Street Address</Label>
                    <Input
                      id="street-address"
                      placeholder="Street address"
                      className="border-blue-200 focus:border-blue-300 focus:ring-blue-200"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        className="border-blue-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="State"
                        className="border-blue-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip-code">Zip Code</Label>
                      <Input
                        id="zip-code"
                        placeholder="Zip code"
                        className="border-blue-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Country"
                        defaultValue="India"
                        className="border-blue-200 focus:border-blue-300 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="save-address" className="border-blue-300 text-blue-600 focus:ring-blue-200" />
                    <Label
                      htmlFor="save-address"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this address for future orders
                    </Label>
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-blue-800">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                  <RadioGroupItem value="cash" id="cash" className="border-blue-300 text-blue-600" />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="cash" className="text-base font-medium">
                      Cash on Delivery
                    </Label>
                    <p className="text-sm text-muted-foreground">Pay with cash when your laundry is picked up</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                  <RadioGroupItem value="online" id="online" className="border-blue-300 text-blue-600" />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="online" className="text-base font-medium">
                      Online Payment
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Pay now using UPI, credit/debit card, or net banking
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-blue-800">Order Summary</h3>
              <div className="rounded-md border p-4 space-y-4 bg-gradient-to-r from-blue-50 to-blue-100">
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
                <Separator className="bg-blue-200" />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total:</span>
                  <span>₹{serviceTypes.find((s) => s.id === selectedService)?.price.toFixed(2) || "0.00"}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-b-lg">
            <Button variant="outline" onClick={handleBack} className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center">
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
                </span>
              ) : (
                "Schedule Pickup"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
