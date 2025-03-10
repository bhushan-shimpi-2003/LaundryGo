"use client"

import { DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/customers")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/providers")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Providers</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/orders")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-xs text-muted-foreground">+456 from last month</p>
          </CardContent>
        </Card>
        <Card className="cursor-pointer" onClick={() => router.push("/dashboard/admin/analytics")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,325.50</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Service Providers</CardTitle>
              <CardDescription>Manage laundry service providers on the platform</CardDescription>
            </div>
            <Button size="sm" onClick={() => router.push("/dashboard/admin/providers/new")}>
              Add Provider
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">#SP001</TableCell>
                  <TableCell>CleanCo Laundry</TableCell>
                  <TableCell>New York, NY</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/providers/SP001")}>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#SP002</TableCell>
                  <TableCell>Fresh Fold Services</TableCell>
                  <TableCell>Los Angeles, CA</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/providers/SP002")}>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#SP003</TableCell>
                  <TableCell>Sparkle Wash</TableCell>
                  <TableCell>Chicago, IL</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Pending
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/providers/SP003")}>
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#SP004</TableCell>
                  <TableCell>Laundry Express</TableCell>
                  <TableCell>Miami, FL</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/providers/SP004")}>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">#SP005</TableCell>
                  <TableCell>Wash & Fold Co.</TableCell>
                  <TableCell>Seattle, WA</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Suspended
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/providers/SP005")}>
                      Manage
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Customer Signups</CardTitle>
            <CardDescription>New customers in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">New York, NY</p>
                  <p className="text-xs text-muted-foreground">Joined: Mar 15, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/customers/C001")}>
                  View
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Michael Brown</p>
                  <p className="text-xs text-muted-foreground">Los Angeles, CA</p>
                  <p className="text-xs text-muted-foreground">Joined: Mar 14, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/customers/C002")}>
                  View
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Emily Davis</p>
                  <p className="text-xs text-muted-foreground">Chicago, IL</p>
                  <p className="text-xs text-muted-foreground">Joined: Mar 13, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/customers/C003")}>
                  View
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">David Wilson</p>
                  <p className="text-xs text-muted-foreground">Houston, TX</p>
                  <p className="text-xs text-muted-foreground">Joined: Mar 12, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/customers/C004")}>
                  View
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Jessica Martinez</p>
                  <p className="text-xs text-muted-foreground">Phoenix, AZ</p>
                  <p className="text-xs text-muted-foreground">Joined: Mar 10, 2023</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/dashboard/admin/customers/C005")}>
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

