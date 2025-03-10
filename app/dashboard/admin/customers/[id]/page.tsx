"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Edit, Mail, MapPin, Phone, ShoppingCart, User } from "lucide-react"

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

// Mock data for the customer
const customerData = {
  id: "C001",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  joinDate: "2023-01-15",
  status: "Active",
  orders: 12,
  totalSpent: "$345.88",
  addresses: [
    {
      id: "addr1",
      type: "Home",
      street: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      isDefault: true,
    },
    {
      id: "addr2",
      type: "Work",
      street: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      isDefault: false,
    },
  ],
  recentOrders: [
    {
      id: "1234",
      date: "Mar 14, 2023",
      service: "Standard Wash",
      amount: "$24.99",
      status: "Processing",
    },
    {
      id: "1233",
      date: "Mar 10, 2023",
      service: "Dry Cleaning",
      amount: "$34.99",
      status: "Delivered",
    },
    {
      id: "1232",
      date: "Mar 5, 2023",
      service: "Standard Wash",
      amount: "$19.99",
      status: "Delivered",
    },
    {
      id: "1231",
      date: "Feb 28, 2023",
      service: "Premium Wash",
      amount: "$29.99",
      status: "Delivered",
    },
    {
      id: "1230",
      date: "Feb 22, 2023",
      service: "Ironing",
      amount: "$15.99",
      status: "Delivered",
    },
  ],
}

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [customerStatus, setCustomerStatus] = useState(customerData.status)

  const handleStatusChange = (newStatus: string) => {
    setCustomerStatus(newStatus)
    toast({
      title: "Customer Status Updated",
      description: `${customerData.name}'s status has been updated to ${newStatus}.`,
    })
  }

  const handleSaveChanges = () => {
    setIsEditDialogOpen(false)
    toast({
      title: "Customer Updated",
      description: "Customer information has been updated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin/customers">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{customerData.name}</h2>
            <p className="text-muted-foreground">
              Customer since {new Date(customerData.joinDate).toLocaleDateString()} • {customerStatus}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogDescription>Make changes to the customer's information here.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue={customerData.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" defaultValue={customerData.email} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" defaultValue={customerData.phone} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input id="location" defaultValue={customerData.location} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue={customerStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger id="status" className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
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
          <Select value={customerStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
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
            <div className="text-2xl font-bold">{customerData.orders}</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
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
            <div className="text-2xl font-bold">{customerData.totalSpent}</div>
            <p className="text-xs text-muted-foreground">+$45.88 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Order</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerData.recentOrders[0].date}</div>
            <p className="text-xs text-muted-foreground">{customerData.recentOrders[0].service}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerStatus}</div>
            <p className="text-xs text-muted-foreground">
              Since {new Date(customerData.joinDate).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>View and manage customer details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{customerData.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    Member since {new Date(customerData.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{customerData.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{customerData.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{customerData.location}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Account Status</h4>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${customerStatus === "Active" ? "bg-green-100 text-green-800" : ""}
                    ${customerStatus === "Inactive" ? "bg-gray-100 text-gray-800" : ""}
                    ${customerStatus === "Suspended" ? "bg-red-100 text-red-800" : ""}
                  `}
                  >
                    {customerStatus}
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

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View all orders placed by this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-3 text-sm font-medium">
                  <div>Order ID</div>
                  <div>Date</div>
                  <div>Service</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <Separator />
                {customerData.recentOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-5 p-3 text-sm items-center">
                    <div className="font-medium">#{order.id}</div>
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
                onClick={() => router.push(`/dashboard/admin/orders?customer=${customerData.id}`)}
              >
                View All Orders
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Addresses</CardTitle>
              <CardDescription>Manage customer's saved addresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {customerData.addresses.map((address) => (
                <div key={address.id} className="rounded-lg border p-4 relative">
                  {address.isDefault && (
                    <div className="absolute top-4 right-4 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                      Default
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="font-medium">{address.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {address.street}
                      <br />
                      {address.city}, {address.state} {address.zipCode}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="text-destructive">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add New Address
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

