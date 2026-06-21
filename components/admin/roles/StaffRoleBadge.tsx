import { UserRole } from "./role-types";
import { cn } from "@/lib/utils";

interface StaffRoleBadgeProps {
  role: UserRole;
  className?: string;
}

const roleStyles: Record<UserRole, string> = {
  owner: "bg-purple-100 text-purple-700 border-purple-300",
  admin: "bg-red-100 text-red-700 border-red-300",
  manager: "bg-blue-100 text-blue-700 border-blue-300",
  editor: "bg-green-100 text-green-700 border-green-300",
  viewer: "bg-slate-100 text-slate-700 border-slate-300",
};

export function StaffRoleBadge({ role, className }: StaffRoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
        roleStyles[role],
        className
      )}
    >
      {role}
    </span>
  );
}

