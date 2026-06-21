import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingDiscoverPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-10 w-full" />

      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    </div>
  );
}
