"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  href: string;
};

type InstitutionNavigationTabsProps = {
  institutionId: string;
};

export default function InstitutionNavigationTabs({ institutionId }: InstitutionNavigationTabsProps) {
  const pathname = usePathname();

  const tabs: Tab[] = [
    { label: "Overview", href: \/institution/\\ },
    { label: "Programs", href: \/institution/\/programs\ },
    { label: "Students", href: \/institution/\/students\ },
    { label: "Ask AI", href: \/institution/\/ask\ },
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



