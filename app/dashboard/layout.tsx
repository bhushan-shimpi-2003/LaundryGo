"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ClipboardList,
  CreditCard,
  FileText,
  Gift,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  User,
  Users,
  Bell,
  Shield,
  Activity,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const customerNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/customer",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/dashboard/customer/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: "Schedule Pickup",
    href: "/dashboard/customer/schedule-pickup",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/dashboard/customer/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: "Support",
    href: "/dashboard/customer/support",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/customer/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

const providerNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/provider",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/dashboard/provider/orders",
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: "Services",
    href: "/dashboard/provider/services",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/dashboard/provider/reports",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Profile",
    href: "/dashboard/provider/profile",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/provider/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Customers",
    href: "/dashboard/admin/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Providers",
    href: "/dashboard/admin/providers",
    icon: <Store className="h-5 w-5" />,
  },
  {
    title: "Orders",
    href: "/dashboard/admin/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: "Schedule Pickup",
    href: "/dashboard/admin/schedule-pickup",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    title: "Payments",
    href: "/dashboard/admin/payments",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Promotions",
    href: "/dashboard/admin/promotions",
    icon: <Gift className="h-5 w-5" />,
  },
  {
    title: "Reports",
    href: "/dashboard/admin/reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: "Activity Logs",
    href: "/dashboard/admin/activity-logs",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    title: "Notifications",
    href: "/dashboard/admin/notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Determine user type based on URL
  const userType = pathname.includes("/dashboard/customer")
    ? "customer"
    : pathname.includes("/dashboard/provider")
      ? "provider"
      : "admin"

  // Select navigation items based on user type
  const navItems =
    userType === "customer" ? customerNavItems : userType === "provider" ? providerNavItems : adminNavItems

  // Get user name based on user type
  const userName = userType === "customer" ? "John Doe" : userType === "provider" ? "CleanCo Laundry" : "Admin User"

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Package className="h-6 w-6" />
                <span className="font-bold">Smart Laundry</span>
              </Link>
              <div className="my-4 h-[1px] w-full bg-border" />
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary",
                    pathname === item.href && "bg-muted font-semibold text-primary",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
              <div className="my-4 h-[1px] w-full bg-border" />
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
                onClick={() => setIsSidebarOpen(false)}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 md:flex">
          <Package className="h-6 w-6" />
          <span className="text-lg font-bold">Smart Laundry</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link href={`/dashboard/${userType}`}>
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
              <span className="sr-only">Home</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="gap-2">
            <User className="h-5 w-5" />
            <span className="hidden md:inline-flex">{userName}</span>
          </Button>
        </div>
      </header>

      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4 text-sm">
            <div className="py-2">
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                {userType.charAt(0).toUpperCase() + userType.slice(1)} Dashboard
              </h2>
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary",
                      pathname === item.href && "bg-muted font-medium text-primary",
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="py-2">
              <div className="space-y-1">
                <Link
                  href="/"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-primary"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
