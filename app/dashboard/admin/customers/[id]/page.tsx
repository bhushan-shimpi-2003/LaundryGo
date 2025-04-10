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
  UserIcon,
  UserCheck,
  UserX,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Mock customer data
const customerData = {
  id: "C001",
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "New Delhi, India",
  joinDate: "2023-01-15",
  status: "Active",
  orders: 12,
  totalSpent: "₹3,450.88",
  lastLogin: "2023-05-10 14:32:45",
  verificationStatus: "Verified",
  accountType: "Premium",
  gstNumber: "29AADCB2230M1ZP",
  panNumber: "AADCB2230M",
  addresses: [
    {
      id: "A001",
      type: "Home",
      address: "123 Main Street, Apartment 4B",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110001",
      isDefault: true,
      isVerified: true,
    },
    {
      id: "A002",
      type: "Work",
      address: "456 Corporate Park, Building 3",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110002",
      isDefault: false,
      isVerified: false,
    },
  ],
  activityLog: [
    { date: "2023-05-10 14:32:45", action: "Logged in", ip: "192.168.1.1" },
    { date: "2023-05-08 09:15:22", action: "Updated profile", ip: "192.168.1.1" },
    { date: "2023-05-05 18:45:10", action: "Placed order #ORD-2023-05-001", ip: "192.168.1.1" },
    { date: "2023-05-01 11:20:33", action: "Changed password", ip: "192.168.1.1" },
  ],
}

export default function CustomerDetailsPage() {
  const { id } = useParams()
  const { toast } = useToast()
  const [adminNotes, setAdminNotes] = useState(
    "Customer requested special handling for delicate items. Prefers evening delivery slots.",
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
      description: `Customer status changed to ${newStatus}.`,
    })
  }

  const handleVerifyAddress = (addressId: string) => {
    toast({
      title: "Address Verified",
      description: `Address ${addressId} has been marked as verified.`,
    })
  }

  const handleResetPassword = () => {
    toast({
      title: "Password Reset Email Sent",
      description: "A password reset link has been sent to the customer's email.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <a href="/dashboard/admin/customers">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </a>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customer Details</h2>
          <p className="text-muted-foreground">View and manage customer information</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Profile Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Customer Profile</CardTitle>
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
              <Label>Customer ID</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.id}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Name</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.name}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Email</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.email}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Phone</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.phone}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Location</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.location}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>GST Number</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.gstNumber}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>PAN Number</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.panNumber}</span>
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
                <span>{new Date(customerData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Account Status</Label>
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-2 rounded-md border p-2 ${
                    customerData.status === "Active"
                      ? "border-green-200 bg-green-50 text-green-700"
                      : customerData.status === "Inactive"
                        ? "border-gray-200 bg-gray-50 text-gray-700"
                        : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {customerData.status === "Active" ? (
                    <UserCheck className="h-4 w-4" />
                  ) : customerData.status === "Inactive" ? (
                    <UserIcon className="h-4 w-4" />
                  ) : (
                    <UserX className="h-4 w-4" />
                  )}
                  <span>{customerData.status}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Verification Status</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.verificationStatus}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Account Type</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.accountType}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Last Login</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.lastLogin}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Total Orders</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.orders}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Total Spent</Label>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{customerData.totalSpent}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Administrative Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
            <CardDescription>Manage customer account settings</CardDescription>
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
                  onClick={() => handleStatusChange("Inactive")}
                  variant="outline"
                  className="border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Deactivate Account
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
            <CardDescription>Internal notes about this customer</CardDescription>
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
          <CardTitle>Customer Addresses</CardTitle>
          <CardDescription>Manage customer address information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerData.addresses.map((address) => (
              <div key={address.id} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{address.type}</span>
                    {address.isDefault && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Default
                      </span>
                    )}
                    {address.isVerified ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Verified
                      </span>
                    ) : (
                      <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                        Unverified
                      </span>
                    )}
                  </div>
                  {!address.isVerified && (
                    <Button size="sm" variant="outline" onClick={() => handleVerifyAddress(address.id)}>
                      Verify Address
                    </Button>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{address.address}</p>
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
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
            {customerData.activityLog.map((activity, index) => (
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
