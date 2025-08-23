import { Skeleton } from "@/components/ui/skeleton";

export function AppSkeleton() {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar Skeleton */}
      <aside className="w-64 bg-white border-r flex-col p-4 hidden md:flex">
        <Skeleton className="h-16 w-32 mb-8" />
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="mb-8">
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </main>
    </div>
  );
}
