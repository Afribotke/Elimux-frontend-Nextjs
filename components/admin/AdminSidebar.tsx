"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  GraduationCap,
  Globe2,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
  { label: "Invoices", href: "/admin/invoices", icon: FileText },
  { label: "Exams", href: "/admin/exams", icon: GraduationCap },
  { label: "Countries", href: "/admin/countries", icon: Globe2 },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">ElimuX Admin</h2>

      <nav className="space-y-1 flex-1">
        {adminLinks.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <p className="mt-4 text-xs text-slate-400">
        Powered by ElimuX · Supabase · Afribot
      </p>
    </aside>
  );
}
