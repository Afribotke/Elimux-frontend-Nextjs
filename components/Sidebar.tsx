=== app/institution/components/Sidebar.tsx ===
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/institution" },
    { name: "Programs", href: "/institution/programs" },
    { name: "Courses", href: "/institution/courses" },
    { name: "Students", href: "/institution/students" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-4 space-y-4">
      <h2 className="text-xl font-bold">ElimuX</h2>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block p-2 rounded ${
                active ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
