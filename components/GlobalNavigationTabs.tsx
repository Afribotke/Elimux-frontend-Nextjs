"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalNavigationTabs() {
  const pathname = usePathname();

  const tabs = [
    { label: "Overview", href: "/global" },
    { label: "Countries", href: "/global/countries" },
    { label: "Institutions", href: "/global/institutions" },
    { label: "Programs", href: "/global/programs" },
    { label: "Ask AI", href: "/global/ask" },
  ];

  return (
    <div className="flex gap-4 border-b mb-6 overflow-x-auto">
      {tabs.map((tab) => {
        const active = pathname === tab.href;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              \pb-2 text-sm font-medium border-b-2 transition
              \\
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}



