"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { ArrowLeft, Banknote, CalendarIcon, Clock, CreditCard, Loader2 } from "lucide-react"

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
import { Badge } from "@/components/ui/badge"

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

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

// Payment methods
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

// Stripe Card Element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
}

// CheckoutForm component for Stripe integration
function CheckoutForm({ amount, onPaymentSuccess, onPaymentError }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState(null)
  const { toast } = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    try {
      // Create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      })

      if (error) {
        setPaymentError(error.message)
        toast({
          title: "Payment failed",
          description: error.message,
          variant: "destructive",
        })
        onPaymentError(error.message)
      } else {
        // In a real app, you would send the payment method ID to your server
        // and create a payment intent. For this demo, we'll simulate success.
        toast({
          title: "Payment successful",
          description: `Payment of $${amount.toFixed(2)} processed successfully`,
        })
        onPaymentSuccess(paymentMethod)
      }
    } catch (err) {
      setPaymentError(err.message)
      toast({
        title: "Payment failed",
        description: err.message,
        variant: "destructive",
      })
      onPaymentError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Card Details</FormLabel>
          <div className="border rounded-md p-3">
            <CardElement options={cardElementOptions} />
          </div>
          {paymentError && <p className="text-sm text-red-500 mt-2">{paymentError}</p>}
        </div>
        <Button type="submit" disabled={!stripe || isProcessing} className="w-full">
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  )
}

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("cod")
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed">("pending")
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [saveAddress, setSaveAddress] = useState(false)
  const [errors, setErrors] = useState({})

  // Get the price of the selected service
  const selectedServicePrice = serviceTypes.find((s) => s.id === selectedService)?.price || 0

  const validateStep = (currentStep) => {
    const stepErrors = {}
    let isValid = true

    if (currentStep === 1) {
      if (!selectedService) {
        stepErrors.service = "Please select a service type"
        isValid = false
      }
    } else if (currentStep === 2) {
      if (!date) {
        stepErrors.date = "Please select a pickup date"
        isValid = false
      }
      if (!selectedTimeSlot) {
        stepErrors.timeSlot = "Please select a pickup time slot"
        isValid = false
      }
    } else if (currentStep === 3) {
      if (useNewAddress) {
        if (!newAddress.name) {
          stepErrors.addressName = "Address name is required"
          isValid = false
        }
        if (!newAddress.phone) {
          stepErrors.phone = "Phone number is required"
          isValid = false
        }
        if (!newAddress.street) {
          stepErrors.street = "Street address is required"
          isValid = false
        }
        if (!newAddress.city) {
          stepErrors.city = "City is required"
          isValid = false
        }
        if (!newAddress.state) {
          stepErrors.state = "State is required"
          isValid = false
        }
        if (!newAddress.zipCode) {
          stepErrors.zipCode = "Zip code is required"
          isValid = false
        }
      } else if (!selectedAddress) {
        stepErrors.address = "Please select an address"
        isValid = false
      }

      if (!selectedPaymentMethod) {
        stepErrors.paymentMethod = "Please select a payment method"
        isValid = false
      }
    }

    setErrors(stepErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
    }
  }

  const handleBack = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handlePaymentSuccess = (paymentMethod) => {
    setPaymentStatus("success")
    handleSubmit()
  }

  const handlePaymentError = (errorMessage) => {
    setPaymentStatus("failed")
    setIsLoading(false)
  }

  const handleSubmit = () => {
    if (!validateStep(3)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // If payment method is card and payment hasn't been processed yet
    if (selectedPaymentMethod === "card" && paymentStatus === "pending") {
      // The payment form will handle this case
      return
    }

    // For COD or after successful card payment
    // Simulate order creation with a delay
    setTimeout(() => {
      setIsLoading(false)

      // Create a new order object
      const newOrder = {
        id: `ORD-${Math.floor(Math.random() * 10000)}`,
        service: serviceTypes.find((s) => s.id === selectedService)?.name,
        date: date?.toISOString().split("T")[0],
        timeSlot: selectedTimeSlot,
        address: useNewAddress
          ? `${newAddress.street}, ${newAddress.city}, ${newAddress.state} ${newAddress.zipCode}`
          : savedAddresses.find((a) => a.id === selectedAddress)?.address,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: selectedPaymentMethod === "cod" ? "pending" : paymentStatus,
        amount: selectedServicePrice,
        specialInstructions,
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      // In a real app, you would save this to your database
      console.log("New order created:", newOrder)

      toast({
        title: "Pickup Scheduled",
        description: "Your laundry pickup has been scheduled successfully.",
      })

      // Redirect to orders page
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
            {errors.service && <p className="text-sm text-red-500">{errors.service}</p>}

            <div className="space-y-2">
              <FormLabel>Special Instructions (Optional)</FormLabel>
              <Textarea
                placeholder="Any special instructions for handling your laundry..."
                className="min-h-[100px]"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/dashboard/customer">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handleNext}>Next</Button>
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
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
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
              {errors.timeSlot && <p className="text-sm text-red-500">{errors.timeSlot}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext}>Next</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Pickup Address & Payment</CardTitle>
            <CardDescription>Where should we pick up your laundry and how would you like to pay?</CardDescription>
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
                              <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
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
                      <Input
                        placeholder="e.g., Home, Work, etc."
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      />
                      {errors.addressName && <p className="text-sm text-red-500">{errors.addressName}</p>}
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        type="tel"
                        placeholder="Your contact number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      />
                      {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <FormLabel>Street Address</FormLabel>
                    <Input
                      placeholder="Street address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    />
                    {errors.street && <p className="text-sm text-red-500">{errors.street}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>City</FormLabel>
                      <Input
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      />
                      {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <FormLabel>State</FormLabel>
                      <Input
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      />
                      {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Zip Code</FormLabel>
                      <Input
                        placeholder="Zip code"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      />
                      {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <FormLabel>Country</FormLabel>
                      <Input
                        placeholder="Country"
                        defaultValue="United States"
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="save-address"
                      checked={saveAddress}
                      onCheckedChange={(checked) => setSaveAddress(!!checked)}
                    />
                    <label
                      htmlFor="save-address"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save this address for future orders
                    </label>
                  </div>
                </div>
              )}
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">Payment Method</h3>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={(value) => {
                  setSelectedPaymentMethod(value)
                  // Reset payment status when changing payment method
                  setPaymentStatus("pending")
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
              {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}

              {selectedPaymentMethod === "card" && (
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        amount={selectedServicePrice}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={handlePaymentError}
                      />
                    </Elements>
                  </CardContent>
                </Card>
              )}

              {paymentStatus === "success" && (
                <div className="rounded-md bg-green-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Payment successful! Your card has been charged ${selectedServicePrice.toFixed(2)}.
                      </p>
                    </div>
                  </div>
                </div>
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
                <div className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span>{paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name || "Not selected"}</span>
                </div>
                {selectedPaymentMethod === "card" && (
                  <div className="flex justify-between">
                    <span className="font-medium">Payment Status:</span>
                    <Badge
                      variant={
                        paymentStatus === "success" ? "success" : paymentStatus === "failed" ? "destructive" : "outline"
                      }
                    >
                      {paymentStatus === "success" ? "Paid" : paymentStatus === "failed" ? "Failed" : "Pending"}
                    </Badge>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-medium">
                  <span>Total:</span>
                  <span>${selectedServicePrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading || (selectedPaymentMethod === "card" && paymentStatus === "pending")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
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

