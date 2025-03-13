"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Package, Truck, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Form validation schema
const pickupFormSchema = z.object({
  customerId: z.string().min(1, { message: "Please select a customer." }),
  customerName: z.string().min(1, { message: "Customer name is required." }),
  customerPhone: z.string().min(10, { message: "Please enter a valid phone number." }),
  providerId: z.string().min(1, { message: "Please select a service provider." }),
  pickupDate: z.date({
    required_error: "Please select a pickup date.",
  }),
  pickupTime: z.string().min(1, { message: "Please select a pickup time." }),
  pickupAddress: z.string().min(5, { message: "Pickup address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  pinCode: z.string().min(6, { message: "PIN code is required." }),
  serviceType: z.string().min(1, { message: "Please select a service type." }),
  itemDescription: z.string().optional(),
  specialInstructions: z.string().optional(),
})

export default function SchedulePickupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof pickupFormSchema>>({
    resolver: zodResolver(pickupFormSchema),
    defaultValues: {
      customerId: "",
      customerName: "",
      customerPhone: "",
      providerId: "",
      pickupDate: undefined,
      pickupTime: "",
      pickupAddress: "",
      city: "",
      state: "",
      pinCode: "",
      serviceType: "",
      itemDescription: "",
      specialInstructions: "",
    },
  })

  // Handle customer selection
  const handleCustomerChange = (customerId: string) => {
    const selectedCustomer = customers.find((customer) => customer.id === customerId)
    if (selectedCustomer) {
      form.setValue("customerId", customerId)
      form.setValue("customerName", selectedCustomer.name)
      form.setValue("customerPhone", selectedCustomer.phone)
    }
  }

  // Form submission handler
  function onSubmit(values: z.infer<typeof pickupFormSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)

      toast({
        title: "Pickup scheduled successfully",
        description: `Pickup scheduled for ${format(values.pickupDate, "PPP")} between ${values.pickupTime}`,
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-orange-700">Customer Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Customer</FormLabel>
                          <Select onValueChange={handleCustomerChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a customer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {customers.map((customer) => (
                                <SelectItem key={customer.id} value={customer.id}>
                                  {customer.name} ({customer.id})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="Customer name" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Customer phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="providerId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Provider</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a service provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {providers.map((provider) => (
                                <SelectItem key={provider.id} value={provider.id}>
                                  {provider.name} ({provider.location})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-blue-700">Pickup Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="pickupDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Pickup Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, "PPP") : <span>Select date</span>}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date > new Date(new Date().setDate(new Date().getDate() + 14))
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>Select a date within the next 14 days</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pickupTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <Clock className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select time slot" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {pickupTimes.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pickupAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pickup Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" placeholder="Enter pickup address" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                              <SelectItem value="Delhi">Delhi</SelectItem>
                              <SelectItem value="Gujarat">Gujarat</SelectItem>
                              <SelectItem value="Karnataka">Karnataka</SelectItem>
                              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                              <SelectItem value="Telangana">Telangana</SelectItem>
                              <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                              <SelectItem value="West Bengal">West Bengal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pinCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter PIN code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-green-700">Service Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <Package className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Select service type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {serviceTypes.map((service) => (
                                <SelectItem key={service} value={service}>
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="itemDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the items to be picked up"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Optional description of the laundry items</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialInstructions"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Special Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any special instructions for pickup or service"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>Optional special instructions for the pickup or service</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-between px-0">
                <Button variant="outline" type="button" onClick={() => router.push("/dashboard/admin/orders")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Truck className="mr-2 h-4 w-4" /> Schedule Pickup
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

