"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, DollarSign, Edit, Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Mock data for services
const initialServices = [
  {
    id: "standard-wash",
    name: "Standard Wash",
    description: "Regular washing and drying service",
    price: 9.99,
    estimatedTime: "48 hours",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
    category: "wash",
  },
  {
    id: "premium-wash",
    name: "Premium Wash",
    description: "Premium washing with fabric softener and special care",
    price: 14.99,
    estimatedTime: "48 hours",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
    category: "wash",
  },
  {
    id: "dry-cleaning",
    name: "Dry Cleaning",
    description: "Professional dry cleaning for delicate items",
    price: 19.99,
    estimatedTime: "72 hours",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
    category: "dry-clean",
  },
  {
    id: "ironing",
    name: "Ironing Service",
    description: "Professional ironing for your clothes",
    price: 7.99,
    estimatedTime: "24 hours",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
    category: "iron",
  },
  {
    id: "wash-iron",
    name: "Wash & Iron",
    description: "Complete washing and ironing service",
    price: 16.99,
    estimatedTime: "72 hours",
    image: "/placeholder.svg?height=100&width=100",
    active: true,
    category: "wash",
  },
]

export default function ServicesPage() {
  const { toast } = useToast()
  const [services, setServices] = useState(initialServices)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<any>(null)
  const [isNewService, setIsNewService] = useState(false)

  const handleAddService = () => {
    setCurrentService({
      id: "",
      name: "",
      description: "",
      price: 0,
      estimatedTime: "",
      image: "/placeholder.svg?height=100&width=100",
      active: true,
      category: "wash",
    })
    setIsNewService(true)
    setIsDialogOpen(true)
  }

  const handleEditService = (service: any) => {
    setCurrentService(service)
    setIsNewService(false)
    setIsDialogOpen(true)
  }

  const handleToggleActive = (id: string) => {
    setServices(services.map((service) => (service.id === id ? { ...service, active: !service.active } : service)))

    const service = services.find((s) => s.id === id)
    toast({
      title: `Service ${service?.active ? "Deactivated" : "Activated"}`,
      description: `${service?.name} has been ${service?.active ? "deactivated" : "activated"}.`,
    })
  }

  const handleDeleteService = (id: string) => {
    const service = services.find((s) => s.id === id)
    setServices(services.filter((service) => service.id !== id))

    toast({
      title: "Service Deleted",
      description: `${service?.name} has been deleted.`,
      variant: "destructive",
    })
  }

  const handleSaveService = () => {
    if (isNewService) {
      // Generate a new ID based on the name
      const newId = currentService.name.toLowerCase().replace(/\s+/g, "-")
      const newService = { ...currentService, id: newId }
      setServices([...services, newService])

      toast({
        title: "Service Added",
        description: `${newService.name} has been added to your services.`,
      })
    } else {
      setServices(services.map((service) => (service.id === currentService.id ? currentService : service)))

      toast({
        title: "Service Updated",
        description: `${currentService.name} has been updated.`,
      })
    }

    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground">Manage the laundry services you offer to customers</p>
        </div>
        <Button onClick={handleAddService}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="wash">Wash</TabsTrigger>
          <TabsTrigger value="dry-clean">Dry Clean</TabsTrigger>
          <TabsTrigger value="iron">Iron</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className={!service.active ? "opacity-70" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      
                      <span className="font-medium">₹{service.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{service.estimatedTime}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={service.active}
                      onCheckedChange={() => handleToggleActive(service.id)}
                      id={`active-${service.id}`}
                    />
                    <Label htmlFor={`active-${service.id}`}>{service.active ? "Active" : "Inactive"}</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wash" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((service) => service.category === "wash")
              .map((service) => (
                <Card key={service.id} className={!service.active ? "opacity-70" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        
                        <span className="font-medium">${service.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{service.estimatedTime}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={service.active}
                        onCheckedChange={() => handleToggleActive(service.id)}
                        id={`active-${service.id}`}
                      />
                      <Label htmlFor={`active-${service.id}`}>{service.active ? "Active" : "Inactive"}</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="dry-clean" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((service) => service.category === "dry-clean")
              .map((service) => (
                <Card key={service.id} className={!service.active ? "opacity-70" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        
                        <span className="font-medium">${service.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{service.estimatedTime}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={service.active}
                        onCheckedChange={() => handleToggleActive(service.id)}
                        id={`active-${service.id}`}
                      />
                      <Label htmlFor={`active-${service.id}`}>{service.active ? "Active" : "Inactive"}</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="iron" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((service) => service.category === "iron")
              .map((service) => (
                <Card key={service.id} className={!service.active ? "opacity-70" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle>{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        
                        <span className="font-medium">${service.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{service.estimatedTime}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={service.active}
                        onCheckedChange={() => handleToggleActive(service.id)}
                        id={`active-${service.id}`}
                      />
                      <Label htmlFor={`active-${service.id}`}>{service.active ? "Active" : "Inactive"}</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isNewService ? "Add New Service" : "Edit Service"}</DialogTitle>
            <DialogDescription>
              {isNewService ? "Add a new service to your offerings." : "Make changes to your existing service."}
            </DialogDescription>
          </DialogHeader>
          {currentService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="service-name"
                  value={currentService.name}
                  onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service-price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="service-price"
                  type="number"
                  step="0.01"
                  value={currentService.price}
                  onChange={(e) => setCurrentService({ ...currentService, price: Number.parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service-time" className="text-right">
                  Est. Time
                </Label>
                <Input
                  id="service-time"
                  value={currentService.estimatedTime}
                  onChange={(e) => setCurrentService({ ...currentService, estimatedTime: e.target.value })}
                  className="col-span-3"
                  placeholder="e.g., 24 hours"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="service-category" className="text-right">
                  Category
                </Label>
                <select
                  id="service-category"
                  value={currentService.category}
                  onChange={(e) => setCurrentService({ ...currentService, category: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="wash">Wash</option>
                  <option value="dry-clean">Dry Clean</option>
                  <option value="iron">Iron</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="service-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="service-description"
                  value={currentService.description}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Active</Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    checked={currentService.active}
                    onCheckedChange={(checked) => setCurrentService({ ...currentService, active: checked })}
                    id="service-active"
                  />
                  <Label htmlFor="service-active">{currentService.active ? "Active" : "Inactive"}</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService}>{isNewService ? "Add Service" : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
