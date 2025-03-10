"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Edit, Mail, MapPin, Phone, ShoppingCart, Star, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock data for the provider
const providerData = {
  id: "SP001",
  name: "CleanCo Laundry",
  email: "info@cleanco.com",
  phone: "+1 (555) 987-6543",
  location: "New York, NY",
  address: "789 Laundry St, New York, NY 10003",
  joinDate: "2022-10-15",
  status: "Active",
  orders: 245,
  rating: 4.8,
  revenue: "$12,450.75",
  description:
    "CleanCo Laundry is a premium laundry service provider with over 5 years of experience. We specialize in handling all types of fabrics with care and use eco-friendly detergents.",
  services: [
    {
      id: "service1",
      name: "Standard Wash",
      price: "$9.99",
      turnaround: "48 hours",
    },
    {
      id: "service2",
      name: "Premium Wash",
      price: "$14.99",
      turnaround: "48 hours",
    },
    {
      id: "service3",
      name: "Dry Cleaning",
      price: "$19.99",
      turnaround: "72 hours",
    },
    {
      id: "service4",
      name: "Ironing",
      price: "$7.99",
      turnaround: "24 hours",
    },
    {
      id: "service5",
      name: "Wash & Iron",
      price: "$16.99",
      turnaround: "72 hours",
    },
  ],
  recentOrders: [
    {
      id: "1234",
      customer: "John Doe",
      date: "Mar 14, 2023",
      service: "Standard Wash",
      amount: "$24.99",
      status: "Processing",
    },
    {
      id: "1237",
      customer: "Jennifer Lee",
      date: "Mar 14, 2023",
      service: "Wash & Iron",
      amount: "$38.75",
      status: "Processing",
    },
    {
      id: "1235",
      customer: "Sarah Johnson",
      date: "Mar 15, 2023",
      service: "Premium Wash",
      amount: "$29.99",
      status: "Pending",
    },
    {
      id: "1239",
      customer: "Amanda Garcia",
      date: "Mar 12, 2023",
      service: "Premium Wash",
      amount: "$32.50",
      status: "Ready",
    },
    {
      id: "1225",
      customer: "Michael Brown",
      date: "Mar 10, 2023",
      service: "Dry Cleaning",
      amount: "$45.50",
      status: "Delivered",
    },
  ],
}

export default function ProviderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [providerStatus, setProviderStatus] = useState(providerData.status)

  const handleStatusChange = (newStatus: string) => {
    setProviderStatus(newStatus)
    toast({
      title: "Provider Status Updated",
      description: `${providerData.name}'s status has been updated to ${newStatus}.`,
    })
  }

  const handleSaveChanges = () => {
    setIsEditDialogOpen(false)
    toast({
      title: "Provider Updated",
      description: "Provider information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin/providers">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{providerData.name}</h2>
            <p className="text-muted-foreground">
              Provider since {new Date(providerData.joinDate).toLocaleDateString()} • {providerStatus}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Provider
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Provider</DialogTitle>
                <DialogDescription>Make changes to the provider's information here.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue={providerData.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" defaultValue={providerData.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" defaultValue={providerData.phone} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input id="address" defaultValue={providerData.address} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue={providerStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger id="status" className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" defaultValue={providerData.description} className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Select value={providerStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerData.orders}</div>
            <p className="text-xs text-muted-foreground">+32 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerData.revenue}</div>
            <p className="text-xs text-muted-foreground">+$1,245.50 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerData.rating}/5</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerStatus}</div>
            <p className="text-xs text-muted-foreground">
              Since {new Date(providerData.joinDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Provider Information</CardTitle>
              <CardDescription>View and manage provider details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{providerData.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    Provider since {new Date(providerData.joinDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(providerData.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm">{providerData.rating}/5</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{providerData.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{providerData.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{providerData.address}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Description</h4>
                <p className="text-sm">{providerData.description}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Account Status</h4>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${providerStatus === "Active" ? "bg-green-100 text-green-800" : ""}
                    ${providerStatus === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${providerStatus === "Suspended" ? "bg-red-100 text-red-800" : ""}
                  `}
                  >
                    {providerStatus}
                  </span>
                  <p className="text-sm text-muted-foreground">Last updated: Today</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>View and manage services offered by this provider</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-3 text-sm font-medium">
                  <div>Service</div>
                  <div>Price</div>
                  <div>Turnaround Time</div>
                  <div className="text-right">Actions</div>
                </div>
                <Separator />
                {providerData.services.map((service) => (
                  <div key={service.id} className="grid grid-cols-4 p-3 text-sm items-center">
                    <div className="font-medium">{service.name}</div>
                    <div>{service.price}</div>
                    <div>{service.turnaround}</div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add New Service
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>View recent orders processed by this provider</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 p-3 text-sm font-medium">
                  <div>Order ID</div>
                  <div>Customer</div>
                  <div>Date</div>
                  <div>Service</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <Separator />
                {providerData.recentOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-6 p-3 text-sm items-center">
                    <div className="font-medium">#{order.id}</div>
                    <div>{order.customer}</div>
                    <div>{order.date}</div>
                    <div>{order.service}</div>
                    <div>{order.amount}</div>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${order.status === "Pending" ? "bg-orange-100 text-orange-800" : ""}
                        ${order.status === "Processing" ? "bg-yellow-100 text-yellow-800" : ""}
                        ${order.status === "Ready" ? "bg-blue-100 text-blue-800" : ""}
                        ${order.status === "Delivered" ? "bg-green-100 text-green-800" : ""}
                      `}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(`/dashboard/admin/orders?provider=${providerData.id}`)}
              >
                View All Orders
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

