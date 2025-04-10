"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Banknote, CalendarIcon, Clock, CreditCard, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Mock data for service types with Indian Rupee prices
const serviceTypes = [
  {
    id: "standard-wash",
    name: "Standard Wash",
    description: "Regular washing and drying service",
    price: 249,
    estimatedTime: "48 hours",
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description: "Premium washing with fabric softener and special care",
    price: 399,
    estimatedTime: "48 hours",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    description: "Professional dry cleaning for delicate items",
    price: 599,
    estimatedTime: "72 hours",
  },
  {
    id: "ironing",
    name: "Ironing Service",
    description: "Professional ironing for your clothes",
    price: 199,
    estimatedTime: "24 hours",
  },
  {
    id: "wash-iron",
    name: "Wash & Iron",
    description: "Complete washing and ironing service",
    price: 449,
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
    address: "456 Business Ave, Suite 200, Bangalore, KA 560001",
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
  {
    id: "upi",
    name: "UPI Payment",
    description: "Pay using UPI apps like Google Pay, PhonePe, or Paytm",
    icon: "credit-card",
  },
]

interface CardDetails {
  cardNumber: string
  expiryDate: string
  cvc: string
  cardholderName: string
}

interface CardFormProps {
  onPaymentSuccess: (paymentMethod: any) => void
  onPaymentError: (errorMessage: string) => void
  amount: number
}

interface FormErrors {
  [key: string]: string
}

// Custom Card Form Component
function CustomCardForm({ onPaymentSuccess, onPaymentError, amount }: CardFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const { toast } = useToast()

  const validateCardDetails = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    if (!cardDetails.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required"
      isValid = false
    } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits"
      isValid = false
    }

    if (!cardDetails.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required"
      isValid = false
    } else if (!/^\d{2}\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format"
      isValid = false
    }

    if (!cardDetails.cvc.trim()) {
      newErrors.cvc = "CVC is required"
      isValid = false
    } else if (!/^\d{3,4}$/.test(cardDetails.cvc)) {
      newErrors.cvc = "CVC must be 3 or 4 digits"
      isValid = false
    }

    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setCardDetails({ ...cardDetails, [name]: formattedValue })
    }
    // Format expiry date with slash
    else if (name === "expiryDate") {
      let formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`
      }
      setCardDetails({ ...cardDetails, [name]: formattedValue })
    } else {
      setCardDetails({ ...cardDetails, [name]: value })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateCardDetails()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // 90% chance of success for demo purposes
      const isSuccess = Math.random() < 0.9

      if (isSuccess) {
        toast({
          title: "Payment successful",
          description: `Payment of ₹${amount.toFixed(2)} processed successfully`,
        })
        onPaymentSuccess({
          id: `pm_${Math.random().toString(36).substring(2, 15)}`,
          last4: cardDetails.cardNumber.slice(-4),
          brand: "visa",
        })
      } else {
        const errorMessage = "Your card was declined. Please try another payment method."
        toast({
          title: "Payment failed",
          description: errorMessage,
          variant: "destructive",
        })
        onPaymentError(errorMessage)
      }

      setIsProcessing(false)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="cardNumber" className="text-sm font-medium">
          Card Number
        </label>
        <Input
          id="cardNumber"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={cardDetails.cardNumber}
          onChange={handleInputChange}
          maxLength={19}
        />
        {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="expiryDate" className="text-sm font-medium">
            Expiry Date
          </label>
          <Input
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/YY"
            value={cardDetails.expiryDate}
            onChange={handleInputChange}
            maxLength={5}
          />
          {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="cvc" className="text-sm font-medium">
            CVC
          </label>
          <Input
            id="cvc"
            name="cvc"
            placeholder="123"
            value={cardDetails.cvc}
            onChange={handleInputChange}
            maxLength={4}
          />
          {errors.cvc && <p className="text-sm text-red-500">{errors.cvc}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="cardholderName" className="text-sm font-medium">
          Cardholder Name
        </label>
        <Input
          id="cardholderName"
          name="cardholderName"
          placeholder="Name as it appears on card"
          value={cardDetails.cardholderName}
          onChange={handleInputChange}
        />
        {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>}
      </div>

      <Button type="submit" disabled={isProcessing} className="w-full">
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Pay ₹${amount.toFixed(2)}`
        )}
      </Button>
    </form>
  )
}

interface NewAddress {
  name: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface PaymentInfo {
  id: string
  last4: string
  brand: string
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
  const [newAddress, setNewAddress] = useState<NewAddress>({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  })
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [saveAddress, setSaveAddress] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)

  // Get the price of the selected service
  const selectedServicePrice = serviceTypes.find((s) => s.id === selectedService)?.price || 0

  const validateStep = (currentStep: number): boolean => {
    const stepErrors: FormErrors = {}
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

  const handlePaymentSuccess = (paymentMethod: PaymentInfo) => {
    setPaymentStatus("success")
    setPaymentInfo(paymentMethod)
    handleSubmit()
  }

  const handlePaymentError = (errorMessage: string) => {
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
      setIsLoading(false)
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
        paymentInfo: paymentInfo,
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
            <div className="space-y-4">
              {serviceTypes.map((service) => (
                <div key={service.id} className="flex">
                  <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                    <input
                      type="radio"
                      id={service.id}
                      name="service"
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={() => setSelectedService(service.id)}
                      className="h-4 w-4 mt-1 border-gray-300 text-primary focus:ring-primary"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor={service.id} className="text-base font-medium cursor-pointer">
                          {service.name}
                        </label>
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
            </div>
            {errors.service && <p className="text-sm text-red-500">{errors.service}</p>}

            <div className="space-y-2">
              <label htmlFor="specialInstructions" className="text-sm font-medium">
                Special Instructions (Optional)
              </label>
              <Textarea
                id="specialInstructions"
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
              <label htmlFor="pickupDate" className="text-sm font-medium">
                Pickup Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="pickupDate"
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
              <label htmlFor="timeSlot" className="text-sm font-medium">
                Pickup Time
              </label>
              <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                <SelectTrigger id="timeSlot">
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
                <input
                  type="checkbox"
                  id="use-new-address"
                  checked={useNewAddress}
                  onChange={(e) => setUseNewAddress(e.target.checked)}
                  className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
                />
                <label
                  htmlFor="use-new-address"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use a new address
                </label>
              </div>

              {!useNewAddress ? (
                <div className="space-y-4">
                  {savedAddresses.map((address) => (
                    <div key={address.id} className="flex">
                      <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                        <input
                          type="radio"
                          id={address.id}
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                          className="h-4 w-4 mt-1 border-gray-300 text-primary focus:ring-primary"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center">
                            <label htmlFor={address.id} className="text-base font-medium cursor-pointer">
                              {address.name}
                            </label>
                            {address.isDefault && (
                              <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{address.address}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="addressName" className="text-sm font-medium">
                        Address Name
                      </label>
                      <Input
                        id="addressName"
                        placeholder="e.g., Home, Work, etc."
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      />
                      {errors.addressName && <p className="text-sm text-red-500">{errors.addressName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your contact number"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      />
                      {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="street" className="text-sm font-medium">
                      Street Address
                    </label>
                    <Input
                      id="street"
                      placeholder="Street address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    />
                    {errors.street && <p className="text-sm text-red-500">{errors.street}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-medium">
                        City
                      </label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      />
                      {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="state" className="text-sm font-medium">
                        State
                      </label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      />
                      {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="zipCode" className="text-sm font-medium">
                        PIN Code
                      </label>
                      <Input
                        id="zipCode"
                        placeholder="PIN code"
                        value={newAddress.zipCode}
                        onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      />
                      {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode}</p>}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium">
                        Country
                      </label>
                      <Input
                        id="country"
                        placeholder="Country"
                        defaultValue="India"
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="save-address"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="h-4 w-4 border-gray-300 rounded text-primary focus:ring-primary"
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
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex">
                    <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 w-full">
                      <input
                        type="radio"
                        id={method.id}
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={() => {
                          setSelectedPaymentMethod(method.id)
                          setPaymentStatus("pending")
                        }}
                        className="h-4 w-4 mt-1 border-gray-300 text-primary focus:ring-primary"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center">
                          <label htmlFor={method.id} className="text-base font-medium cursor-pointer">
                            {method.name}
                          </label>
                          {method.icon === "cash" ? (
                            <Banknote className="ml-2 h-4 w-4 text-muted-foreground" />
                          ) : (
                            <CreditCard className="ml-2 h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod}</p>}

              {selectedPaymentMethod === "card" && (
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <CustomCardForm
                      amount={selectedServicePrice}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                    />
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
                        Payment successful! Your card has been charged ₹{selectedServicePrice.toFixed(2)}.
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
                  <span>₹{selectedServicePrice.toFixed(2)}</span>
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
