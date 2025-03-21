import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProviderDashboardLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-[300px] mb-2" />
        <Skeleton className="h-4 w-[250px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-1" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <Skeleton className="h-5 w-[100px]" />
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[120px]" />
                    <Skeleton className="h-5 w-[80px]" />
                    <Skeleton className="h-8 w-[70px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-[140px]" />
                      <Skeleton className="h-3 w-[100px]" />
                      <Skeleton className="h-3 w-[180px]" />
                    </div>
                    <Skeleton className="h-8 w-[70px]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

