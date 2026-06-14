"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: "\u25E7" },
  { label: "Students", href: "/dashboard/students", icon: "\u25CD" },
  { label: "Programs", href: "/dashboard/programs", icon: "\u25A4" },
  { label: "Institutions", href: "/dashboard/institutions", icon: "\u25C8" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "\u25D4" },
  { label: "Settings", href: "/dashboard/settings", icon: "\u2699" }
];

function cx(...classes: Array<string | false | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-navy-100 bg-navy md:block">
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-sm font-bold text-navy">
          E
        </span>
        <span className="text-lg font-bold text-white">Elimux</span>
      </div>

      <nav className="flex flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold text-navy"
                  : "text-navy-100 hover:bg-navy-600 hover:text-white"
              )}
            >
              <span aria-hidden className="text-base">
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-5 py-4 text-xs text-navy-100">
        <p className="font-medium text-white">AfriBot AI</p>
        <p>Afribot Ventures Limited</p>
      </div>
    </aside>
  );
}