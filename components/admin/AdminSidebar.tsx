"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", href: "/admin" },
    { label: "Users", href: "/admin/users" },
    { label: "Institutions", href: "/admin/institutions" },
    { label: "Programs", href: "/admin/programs" },
    { label: "Countries", href: "/admin/countries" },
    { label: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside className="w-64 h-screen border-r bg-white p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">ElimuX Admin</h2>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                \lock px-3 py-2 rounded-lg text-sm transition
                \\
              }
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
