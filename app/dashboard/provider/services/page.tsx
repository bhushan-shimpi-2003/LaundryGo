"use client"

import { useState } from "react"
import { Camera, Save, Shirt } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function ProviderProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [businessHours, setBusinessHours] = useState({
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "10:00", close: "16:00", closed: false },
    sunday: { open: "10:00", close: "16:00", closed: true },
  })

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your business profile has been updated successfully.",
      })
    }, 1500)
  }

  const toggleDayClosed = (day: keyof typeof businessHours) => {
    setBusinessHours({
      ...businessHours,
      [day]: {
        ...businessHours[day],
        closed: !businessHours[day].closed,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Business Profile</h2>
        <p className="text-muted-foreground">Manage your business information and service details</p>
      </div>

      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="business">Business Info</TabsTrigger>
          <TabsTrigger value="hours">Business Hours</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                    <Shirt className="h-12 w-12 text-primary" />
                  </div>
                  <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Upload business logo</span>
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Change Logo
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" defaultValue="CleanCo Laundry" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-email">Business Email</Label>
                <Input id="business-email" type="email" defaultValue="info@cleanco.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-phone">Business Phone</Label>
                <Input id="business-phone" type="tel" defaultValue="+1 (555) 987-6543" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-website">Website</Label>
                <Input id="business-website" type="url" defaultValue="https://cleanco-laundry.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-address">Business Address</Label>
                <Input id="business-address" defaultValue="789 Laundry St" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-city">City</Label>
                  <Input id="business-city" defaultValue="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-state">State</Label>
                  <Input id="business-state" defaultValue="NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-zip">Zip Code</Label>
                  <Input id="business-zip" defaultValue="10003" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business-description">Business Description</Label>
                <Textarea
                  id="business-description"
                  placeholder="Tell customers about your business"
                  className="min-h-[100px]"
                  defaultValue="CleanCo Laundry is a premium laundry service provider with over 5 years of experience. We specialize in handling all types of fabrics with care and use eco-friendly detergents."
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

        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your operating hours for each day of the week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(businessHours).map(([day, hours]) => (
                <div key={day} className="grid grid-cols-[1fr_2fr_2fr_1fr] gap-4 items-center">
                  <div className="font-medium capitalize">{day}</div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${day}-open`} className="w-12">
                      Open
                    </Label>
                    <Input
                      id={`${day}-open`}
                      type="time"
                      value={hours.open}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, open: e.target.value },
                        })
                      }
                      disabled={hours.closed}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${day}-close`} className="w-12">
                      Close
                    </Label>
                    <Input
                      id={`${day}-close`}
                      type="time"
                      value={hours.close}
                      onChange={(e) =>
                        setBusinessHours({
                          ...businessHours,
                          [day]: { ...hours, close: e.target.value },
                        })
                      }
                      disabled={hours.closed}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${day}-closed`}
                      checked={hours.closed}
                      onChange={() => toggleDayClosed(day as keyof typeof businessHours)}
                      className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`${day}-closed`} className="text-sm">
                      Closed
                    </Label>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveProfile} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Hours
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your team members and their roles</CardDescription>
                </div>
                <Button size="sm">Add Team Member</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary">JD</span>
                    </div>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-muted-foreground">Manager</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary">JS</span>
                    </div>
                    <div>
                      <div className="font-medium">Jane Smith</div>
                      <div className="text-sm text-muted-foreground">Laundry Specialist</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium text-primary">RJ</span>
                    </div>
                    <div>
                      <div className="font-medium">Robert Johnson</div>
                      <div className="text-sm text-muted-foreground">Delivery Driver</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

