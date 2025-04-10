"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search, Shield, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Label } from "@/components/ui/label"

// Mock data for admin users
const initialUsers = [
  {
    id: "A001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@laundryconnect.com",
    phone: "+91 98765 43210",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2023-05-15 10:30:45",
  },
  {
    id: "A002",
    name: "Priya Sharma",
    email: "priya.sharma@laundryconnect.com",
    phone: "+91 87654 32109",
    role: "Admin",
    status: "Active",
    lastLogin: "2023-05-14 15:22:10",
  },
  {
    id: "A003",
    name: "Vikram Singh",
    email: "vikram.singh@laundryconnect.com",
    phone: "+91 76543 21098",
    role: "Support",
    status: "Active",
    lastLogin: "2023-05-13 09:15:30",
  },
  {
    id: "A004",
    name: "Neha Patel",
    email: "neha.patel@laundryconnect.com",
    phone: "+91 65432 10987",
    role: "Finance",
    status: "Inactive",
    lastLogin: "2023-05-10 14:45:20",
  },
  {
    id: "A005",
    name: "Amit Verma",
    email: "amit.verma@laundryconnect.com",
    phone: "+91 54321 09876",
    role: "Support",
    status: "Active",
    lastLogin: "2023-05-12 11:30:15",
  },
]

export default function AdminUsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("id")
  const [sortOrder, setSortOrder] = useState("asc")
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Admin",
    password: "",
    confirmPassword: "",
  })

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)))

    toast({
      title: "User Status Updated",
      description: `User ${id} status changed to ${newStatus}.`,
    })
  }

  const handleAddUser = () => {
    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would make an API call to create the user
    const newId = `A00${users.length + 1}`
    const createdUser = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: "Active",
      lastLogin: "Never",
    }

    setUsers([...users, createdUser])
    setIsAddUserDialogOpen(false)
    setNewUser({
      name: "",
      email: "",
      phone: "",
      role: "Admin",
      password: "",
      confirmPassword: "",
    })

    toast({
      title: "User Added Successfully",
      description: `${newUser.name} has been added as a ${newUser.role}.`,
    })
  }

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || user.status === statusFilter
      const matchesRole = roleFilter === "all" || user.role === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })
    .sort((a, b) => {
      if (sortBy === "id") {
        return sortOrder === "asc" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
      } else if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortBy === "role") {
        return sortOrder === "asc" ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role)
      } else if (sortBy === "lastLogin") {
        return sortOrder === "asc" ? a.lastLogin.localeCompare(b.lastLogin) : b.lastLogin.localeCompare(a.lastLogin)
      }
      return 0
    })

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage admin users and their permissions</p>
        </div>
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Admin User</DialogTitle>
              <DialogDescription>Create a new user with administrative access to the platform.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger id="role" className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>View and manage all administrative users on the platform</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 w-[200px] md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <button className="flex items-center gap-1" onClick={() => toggleSort("id")}>
                    ID
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("name")}>
                    Name
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("role")}>
                    Role
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center gap-1" onClick={() => toggleSort("lastLogin")}>
                    Last Login
                    <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown className="h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{user.email}</div>
                        <div className="text-muted-foreground">{user.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-primary" />
                        <span>{user.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${user.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          ${user.status === "Inactive" ? "bg-gray-100 text-gray-800" : ""}
                        `}
                        >
                          {user.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>Change Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(user.id, "Active")}>
                            Mark as Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(user.id, "Inactive")}>
                            Mark as Inactive
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No users found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
