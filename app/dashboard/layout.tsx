"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, Home, LogOut, Menu, Package, Settings, Shirt, ShoppingCart, User, Users, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  // Determine user type from URL
  const userType = pathname.includes("/customer") ? "customer" : pathname.includes("/provider") ? "provider" : "admin"

  // Navigation items based on user type
  const navItems = {
    customer: [
      { name: "Dashboard", href: "/dashboard/customer", icon: Home },
      { name: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingCart },
      { name: "Profile", href: "/dashboard/customer/profile", icon: User },
      { name: "Settings", href: "/dashboard/customer/settings", icon: Settings },
    ],
    provider: [
      { name: "Dashboard", href: "/dashboard/provider", icon: Home },
      { name: "Orders", href: "/dashboard/provider/orders", icon: ShoppingCart },
      { name: "Services", href: "/dashboard/provider/services", icon: Package },
      { name: "Settings", href: "/dashboard/provider/settings", icon: Settings },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: Home },
      { name: "Customers", href: "/dashboard/admin/customers", icon: Users },
      { name: "Providers", href: "/dashboard/admin/providers", icon: Package },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
  }

  const currentNavItems = navItems[userType as keyof typeof navItems]

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Order #1234 Update",
      message: "Your order has been processed and is ready for delivery.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Special Offer",
      message: "Get 20% off on your next order with code LAUNDRY20.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Subscription Renewal",
      message: "Your subscription will renew in 3 days. Please update payment if needed.",
      time: "1 day ago",
      read: true,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <Link href="/" className="flex items-center gap-2 pb-4 pt-2">
                  <Shirt className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">LaundryConnect</span>
                </Link>
                <nav className="grid gap-2 py-4">
                  {currentNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-start gap-2 text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Shirt className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold hidden md:inline-block">LaundryConnect</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {notifications.filter((n) => !n.read).length}
                </span>
                <span className="sr-only">Notifications</span>
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-md border bg-background shadow-lg z-50">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b ${notification.read ? "" : "bg-muted/50"}`}>
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">No notifications</div>
                    )}
                  </div>
                  <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full">
                      Mark all as read
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${userType}/profile`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/${userType}/settings`}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4">
            {currentNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-start gap-2 text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}

