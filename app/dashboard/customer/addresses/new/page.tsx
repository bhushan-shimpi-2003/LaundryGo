"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function NewAddressPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    addressName: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    isDefault: false,
    specialInstructions: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })
      router.push("/dashboard/customer/profile")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/customer/profile">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Address</h2>
          <p className="text-muted-foreground">Add a new address for pickup and delivery</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
            <CardDescription>Enter the details of your new address</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address-name">Address Name</Label>
              <Input
                id="address-name"
                placeholder="e.g., Home, Work, etc."
                value={formData.addressName}
                onChange={(e) => handleInputChange("addressName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="Street address"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Suite/Unit (Optional)</Label>
              <Input
                id="apartment"
                placeholder="Apt, Suite, Unit, etc."
                value={formData.apartment}
                onChange={(e) => handleInputChange("apartment", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zip-code">Zip Code</Label>
                <Input
                  id="zip-code"
                  placeholder="Zip code"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Country"
                  defaultValue="United States"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Phone number for this address"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="special-instructions">Special Instructions (Optional)</Label>
              <Input
                id="special-instructions"
                placeholder="Delivery instructions, gate codes, etc."
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="default-address"
                checked={formData.isDefault}
                onCheckedChange={(checked) => handleInputChange("isDefault", !!checked)}
              />
              <label
                htmlFor="default-address"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Set as default address
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding Address..." : "Add Address"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
