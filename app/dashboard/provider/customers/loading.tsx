import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function CustomersLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-[150px] mb-2" />
        <Skeleton className="h-4 w-[250px]" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Skeleton className="h-6 w-[120px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-10 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[70px]" />
              <Skeleton className="h-8 w-[40px]" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-t">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[50px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[70px]" />
                <Skeleton className="h-8 w-[40px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
