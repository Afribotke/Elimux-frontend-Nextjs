"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const colorClasses =
    normalized === "active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : normalized === "suspended"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : normalized === "pending"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        colorClasses
      )}
    >
      {status}
    </Badge>
  );
}

