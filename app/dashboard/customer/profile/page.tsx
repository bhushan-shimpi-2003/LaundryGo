"use client"

import { useState } from "react"
import { Camera, Save, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload profile picture</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us a little about yourself"
                  className="min-h-[100px]"
                  defaultValue="I'm a busy professional who appreciates quality laundry services."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Saved Addresses</CardTitle>
                  <CardDescription>Manage your saved addresses for pickup and delivery</CardDescription>
                </div>
                <Button size="sm">Add New Address</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 relative">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                  Default
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Home</div>
                  <div className="text-sm text-muted-foreground">
                    123 Main St, Apt 4B
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </div>
                  <div className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="font-medium">Work</div>
                  <div className="text-sm text-muted-foreground">
                    456 Business Ave, Suite 200
                    <br />
                    New York, NY 10002
                    <br />
                    United States
                  </div>
                  <div className="text-sm text-muted-foreground">Phone: +1 (555) 987-6543</div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Set as Default
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods for laundry services</CardDescription>
                </div>
                <Button size="sm">Add Payment Method</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 relative">
                <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                  Default
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Visa ending in 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 12/2025</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-16 bg-muted rounded flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Mastercard ending in 8888</div>
                    <div className="text-sm text-muted-foreground">Expires 08/2024</div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Set as Default
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive">
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
