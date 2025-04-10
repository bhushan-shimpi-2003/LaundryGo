"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, MapPin, Phone, Store, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function NewProviderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pinCode: "",
    country: "India",
    description: "",
    serviceArea: "",
    serviceTypes: "",
    commissionRate: "10",
    status: "Pending",
    featured: false,
    gstNumber: "",
    panNumber: "",
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle switch changes
  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  // Form submission handler
  function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(formData)
      setIsSubmitting(false)

      toast({
        title: "Provider added successfully",
        description: `${formData.name} has been added to the platform.`,
      })

      router.push("/dashboard/admin/providers")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/admin/providers">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Provider</h2>
          <p className="text-muted-foreground">Add a new laundry service provider to the platform</p>
        </div>
      </div>

      <Card className="border-green-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 rounded-t-lg">
          <CardTitle>Provider Information</CardTitle>
          <CardDescription>Enter the details of the new service provider</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-orange-700">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Provider Name</Label>
                    <div className="relative mt-1">
                      <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        className="pl-9"
                        placeholder="Enter business name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        className="pl-9"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        className="pl-9"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description of the business"
                      className="resize-none mt-1"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      A short description that will be displayed to customers
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Location Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        className="pl-9"
                        placeholder="Enter street address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter city"
                      className="mt-1"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
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
                  </div>
                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      name="pinCode"
                      placeholder="Enter PIN code"
                      className="mt-1"
                      value={formData.pinCode}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      placeholder="Enter country"
                      className="mt-1"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="serviceArea">Service Area</Label>
                    <Input
                      id="serviceArea"
                      name="serviceArea"
                      placeholder="e.g., 5 km radius, South Mumbai area"
                      className="mt-1"
                      value={formData.serviceArea}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-muted-foreground mt-1">The area where this provider offers services</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-orange-700">Service Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="serviceTypes">Service Types</Label>
                    <Input
                      id="serviceTypes"
                      name="serviceTypes"
                      placeholder="e.g., Wash & Fold, Dry Cleaning, Ironing"
                      className="mt-1"
                      value={formData.serviceTypes}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Comma-separated list of services offered</p>
                  </div>
                  <div>
                    <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      name="commissionRate"
                      type="number"
                      min="0"
                      max="100"
                      className="mt-1"
                      value={formData.commissionRate}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Platform commission percentage on each order</p>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">Provider's status on the platform</p>
                  </div>
                  <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Featured Provider</Label>
                      <p className="text-sm text-muted-foreground">
                        Feature this provider on the homepage and in search results
                      </p>
                    </div>
                    <Switch
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-blue-700">Tax Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input
                      id="gstNumber"
                      name="gstNumber"
                      placeholder="Enter GST number"
                      className="mt-1"
                      value={formData.gstNumber}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Provider's GST registration number</p>
                  </div>
                  <div>
                    <Label htmlFor="panNumber">PAN Number</Label>
                    <Input
                      id="panNumber"
                      name="panNumber"
                      placeholder="Enter PAN number"
                      className="mt-1"
                      value={formData.panNumber}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Provider's PAN card number</p>
                  </div>
                </div>
              </div>
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button variant="outline" type="button" onClick={() => router.push("/dashboard/admin/providers")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Add Provider
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
