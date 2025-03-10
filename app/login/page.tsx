"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shirt } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("customer")
  const [formData, setFormData] = useState({
    customer: { email: "", password: "" },
    provider: { email: "", password: "" },
    admin: { email: "", password: "" },
  })

  const handleInputChange = (tab: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [tab]: {
        ...formData[tab as keyof typeof formData],
        [field]: value,
      },
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock credentials for demo purposes
    const mockCredentials = {
      customer: { email: "customer@example.com", password: "password" },
      provider: { email: "provider@example.com", password: "password" },
      admin: { email: "admin@example.com", password: "password" },
    }

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false)

      const currentTabData = formData[activeTab as keyof typeof formData]
      const mockData = mockCredentials[activeTab as keyof typeof mockCredentials]

      if (currentTabData.email === mockData.email && currentTabData.password === mockData.password) {
        // Successful login
        toast({
          title: "Login successful",
          description: `Welcome back, ${activeTab} user!`,
        })

        // Redirect based on user role
        if (activeTab === "customer") {
          router.push("/dashboard/customer")
        } else if (activeTab === "provider") {
          router.push("/dashboard/provider")
        } else if (activeTab === "admin") {
          router.push("/dashboard/admin")
        }
      } else {
        // Failed login
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
      }
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Shirt className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">LaundryGo</span>
        </Link>
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <Tabs defaultValue="customer" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="provider">Service Provider</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="customer">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    placeholder="customer@example.com"
                    value={formData.customer.email}
                    onChange={(e) => handleInputChange("customer", "email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="customer-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="customer-password"
                    type="password"
                    value={formData.customer.password}
                    onChange={(e) => handleInputChange("customer", "password", e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  <p>Demo credentials: customer@example.com / password</p>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="provider">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-email">Email</Label>
                  <Input
                    id="provider-email"
                    type="email"
                    placeholder="provider@example.com"
                    value={formData.provider.email}
                    onChange={(e) => handleInputChange("provider", "email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="provider-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="provider-password"
                    type="password"
                    value={formData.provider.password}
                    onChange={(e) => handleInputChange("provider", "password", e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  <p>Demo credentials: provider@example.com / password</p>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="admin">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={formData.admin.email}
                    onChange={(e) => handleInputChange("admin", "email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="admin-password"
                    type="password"
                    value={formData.admin.password}
                    onChange={(e) => handleInputChange("admin", "password", e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="text-sm text-center text-muted-foreground">
                  <p>Demo credentials: admin@example.com / password</p>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

