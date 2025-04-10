import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ScheduleLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-[150px] mb-2" />
        <Skeleton className="h-4 w-[250px]" />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[200px]" />
          <div className="flex items-center">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-[180px] mx-2" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[150px]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg border p-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[70px] ml-2" />
                  </div>
                  <Skeleton className="h-3 w-[150px]" />
                  <Skeleton className="h-3 w-[250px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
