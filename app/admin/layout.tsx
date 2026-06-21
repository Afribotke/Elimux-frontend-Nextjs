import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/institutions", label: "Institutions" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/invoices", label: "Invoices" },
  { href: "/admin/analytics", label: "Analytics" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className="w-64 border-r bg-white">
        <div className="px-6 py-4 border-b">
          <div className="font-bold text-lg">ElimuX Admin</div>
          <div className="text-xs text-slate-500">Multi-institution console</div>
        </div>
        <nav className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <header className="h-14 border-b bg-white flex items-center px-6 justify-between">
          <div className="font-semibold text-sm text-slate-700">
            ElimuX Admin Dashboard
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
