"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit,
  FileText,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Store,
  UserCheck,
  UserX,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Mock provider data
const providerData = {
  id: "SP001",
  name: "CleanCo Laundry",
  email: "info@cleanco.com",
  phone: "+91 98765 43210",
  location: "Mumbai, Maharashtra",
  joinDate: "2022-10-15",
  status: "Active",
  orders: 245,
  rating: 4.8,
  revenue: "₹124,507.75",
  lastLogin: "2023-05-09 10:15:30",
  verificationStatus: "Verified",
  accountType: "Premium",
  gstNumber: "27AADCB2230M1ZP",
  panNumber: "AADCB2230M",
  services: [
    { id: "S001", name: "Wash & Fold", price: "₹80/kg" },
    { id: "S002", name: "Dry Cleaning", price: "₹250/item" },
    { id: "S003", name: "Ironing", price: "₹20/item" },
    { id: "S004", name: "Premium Wash", price: "₹120/kg" },
  ],
  address: {
    street: "123 Business Park, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400069",
    isVerified: true,
  },
  activityLog: [
    { date: "2023-05-09 10:15:30", action: "Logged in", ip: "192.168.1.1" },
    { date: "2023-05-07 14:22:10", action: "Updated service prices", ip: "192.168.1.1" },
    { date: "2023-05-05 09:30:45", action: "Completed order #ORD-2023-05-012", ip: "192.168.1.1" },
    { date: "2023-05-01 16:40:22", action: "Added new service", ip: "192.168.1.1" },
  ],
}

export default function ProviderDetailsPage() {
  const { id } = useParams()
  const { toast } = useToast()
  const [adminNotes, setAdminNotes] = useState(
    "Provider has excellent track record. Specializes in premium laundry services. Offers pickup and delivery within 5km radius.",
  )
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  const handleSaveNotes = () => {
    setIsEditingNotes(false)
    toast({
      title: "Notes Updated",
      description: "Administrative notes have been updated successfully.",
    })
  }

  const handleStatusChange = (newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Provider status changed to ${newStatus}.`,
    })
  }

  const handleResetPassword = () => {
    toast({
      title: "Password Reset Email Sent",
      description: "A password reset link has been sent to the provider's email.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <a href="/dashboard/admin/providers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </a>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Provider Details</h2>
          <p className="text-muted-foreground">View and manage service provider information</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Provider Profile Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Provider Profile</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
            </div>
            <CardDescription>Basic information and account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Provider ID</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.id}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Business Name</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.name}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.email}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Phone</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.phone}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Location</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.location}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>GST Number</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.gstNumber}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>PAN Number</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.panNumber}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Account status and administrative details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Join Date</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(providerData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Account Status</Label>
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 rounded-md border p-2 ${
                    providerData.status === "Active"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : providerData.status === "Pending"
                        ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                        : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {providerData.status === "Active" ? (
                    <UserCheck className="h-4 w-4" />
                  ) : providerData.status === "Pending" ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    <UserX className="h-4 w-4" />
                  )}
                  <span>{providerData.status}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Verification Status</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.verificationStatus}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Account Type</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Store className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.accountType}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Last Login</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.lastLogin}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Total Orders</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.orders}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Rating</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{providerData.rating}/5</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Total Revenue</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{providerData.revenue}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Administrative Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
            <CardDescription>Manage provider account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleStatusChange("Active")}
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate Account
                </Button>
                <Button
                  onClick={() => handleStatusChange("Pending")}
                  variant="outline"
                  className="border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Set as Pending
                </Button>
              </div>
              <Button
                onClick={() => handleStatusChange("Suspended")}
                variant="outline"
                className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
              >
                <UserX className="mr-2 h-4 w-4" />
                Suspend Account
              </Button>
              <Button onClick={handleResetPassword} variant="outline">
                <Lock className="mr-2 h-4 w-4" />
                Reset Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Administrative Notes Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Administrative Notes</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(!isEditingNotes)}>
                <Edit className="mr-2 h-4 w-4" />
                {isEditingNotes ? "Cancel" : "Edit Notes"}
              </Button>
            </div>
            <CardDescription>Internal notes about this provider</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditingNotes ? (
              <Textarea value={adminNotes} onChange={(e) => setAdminNotes(e.target.value)} className="min-h-[150px]" />
            ) : (
              <div className="rounded-md border p-3">{adminNotes}</div>
            )}
          </CardContent>
          {isEditingNotes && (
            <CardFooter>
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Address</CardTitle>
          <CardDescription>Provider location information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium">Business Address</span>
                {providerData.address.isVerified && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                    Verified
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{providerData.address.street}</p>
              <p>
                {providerData.address.city}, {providerData.address.state} {providerData.address.postalCode}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services Offered</CardTitle>
          <CardDescription>Services provided by this laundry service provider</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providerData.services.map((service) => (
              <div key={service.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">Service ID: {service.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Activity</CardTitle>
          <CardDescription>Recent account activity and login history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providerData.activityLog.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">IP: {activity.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
