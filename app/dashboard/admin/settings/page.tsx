"use client"

import { useState } from "react"
import { Bell, Lock, Moon, Save, SettingsIcon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings updated",
        description: "Platform settings have been updated successfully.",
      })
    }, 1500)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // Toggle dark mode class on document element
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Platform Settings</h2>
        <p className="text-muted-foreground">Manage global platform settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Information</CardTitle>
              <CardDescription>Basic information about your laundry platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="LaundryConnect" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-description">Platform Description</Label>
                <Textarea
                  id="platform-description"
                  className="min-h-[100px]"
                  defaultValue="Connect with local laundry services, schedule pickups, and track your orders in real-time."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input id="support-email" type="email" defaultValue="support@laundryconnect.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input id="support-phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="platform-currency">Default Currency</Label>
                <select
                  id="platform-currency"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="eur">Rupee (Rs)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-timezone">Default Timezone</Label>
                <select
                  id="platform-timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="est">Eastern Time (ET)</option>
                  <option value="cst">Central Time (CT)</option>
                  <option value="mst">Mountain Time (MT)</option>
                  <option value="pst">Pacific Time (PT)</option>
                  <option value="utc">Coordinated Universal Time (UTC)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform-language">Default Language</Label>
                <select
                  id="platform-language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Features</CardTitle>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">User Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new users to register on the platform</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Provider Registration</Label>
                  <p className="text-sm text-muted-foreground">Allow new service providers to register</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Reviews & Ratings</Label>
                  <p className="text-sm text-muted-foreground">Enable customer reviews and ratings</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Subscription Plans</Label>
                  <p className="text-sm text-muted-foreground">Enable subscription-based services</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the platform in maintenance mode</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Save Features
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input id="primary-color" type="color" defaultValue="#0284c7" className="w-16 h-10" />
                  <Input defaultValue="#0284c7" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <Input id="secondary-color" type="color" defaultValue="#7c3aed" className="w-16 h-10" />
                  <Input defaultValue="#7c3aed" className="flex-1" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="logo-upload">Platform Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                    <SettingsIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon-upload">Favicon</Label>
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-md border flex items-center justify-center bg-muted">
                    <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Button variant="outline">Upload New Favicon</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Appearance
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure platform-wide notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send SMS notifications to users</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send push notifications to mobile devices</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email-from">Email From Address</Label>
                <Input id="email-from" type="email" defaultValue="notifications@laundryconnect.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-reply-to">Email Reply-To Address</Label>
                <Input id="email-reply-to" type="email" defaultValue="support@laundryconnect.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-footer">Email Footer Text</Label>
                <Textarea
                  id="email-footer"
                  className="min-h-[100px]"
                  defaultValue="© 2023 LaundryConnect. All rights reserved. If you have any questions, please contact our support team."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Save Notification Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure platform security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Password Complexity</Label>
                  <p className="text-sm text-muted-foreground">Require strong passwords for all users</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input id="session-timeout" type="number" defaultValue="60" min="5" max="1440" />
                <p className="text-xs text-muted-foreground">
                  Time in minutes before an inactive session is automatically logged out
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-attempts">Max Login Attempts</Label>
                <Input id="login-attempts" type="number" defaultValue="5" min="1" max="10" />
                <p className="text-xs text-muted-foreground">
                  Number of failed login attempts before account is temporarily locked
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lockout-duration">Account Lockout Duration (minutes)</Label>
                <Input id="lockout-duration" type="number" defaultValue="30" min="5" max="1440" />
                <p className="text-xs text-muted-foreground">
                  Time in minutes before a locked account can attempt to login again
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">GDPR Compliance</Label>
                  <p className="text-sm text-muted-foreground">Enable GDPR compliance features</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Save Security Settings
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

