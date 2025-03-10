"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function SupportPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Get order ID from URL if available
  const orderId = searchParams.get("order")

  const [formData, setFormData] = useState({
    name: "John Doe", // Pre-filled for demo
    email: "john.doe@example.com", // Pre-filled for demo
    subject: orderId ? `Question about Order #${orderId}` : "",
    category: orderId ? "order-issue" : "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
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
        title: "Support request submitted",
        description: "We've received your message and will respond shortly.",
      })
      router.push("/dashboard/customer")
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
          <h2 className="text-2xl font-bold tracking-tight">Contact Support</h2>
          <p className="text-muted-foreground">Get help with your laundry service</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Support Request</CardTitle>
            <CardDescription>Fill out the form below to contact our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="order-issue">Order Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="account">Account Help</SelectItem>
                  <SelectItem value="service-quality">Service Quality</SelectItem>
                  <SelectItem value="feedback">General Feedback</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {orderId && (
              <div className="space-y-2">
                <Label htmlFor="order-id">Order ID</Label>
                <Input id="order-id" value={orderId} readOnly className="bg-muted" />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Please describe your issue or question in detail..."
                className="min-h-[150px]"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Ways to Reach Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground">
                Call us at <span className="font-medium">+1 (555) 123-4567</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">Available Monday-Friday, 9AM-6PM EST</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground">
                Email us at <span className="font-medium">support@laundryconnect.com</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">We typically respond within 24 hours</p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with our support team in real-time</p>
              <Button variant="outline" size="sm" className="mt-2">
                Start Chat
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

