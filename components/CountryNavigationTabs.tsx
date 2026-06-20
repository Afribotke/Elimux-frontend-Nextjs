"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  label: string;
  href: string;
};

type CountryNavigationTabsProps = {
  countryCode: string;
};

export default function CountryNavigationTabs({ countryCode }: CountryNavigationTabsProps) {
  const pathname = usePathname();

  const tabs: Tab[] = [
    { label: "Overview", href: \/country/\\ },
    { label: "Institutions", href: \/country/\/institutions\ },
    { label: "Programs", href: \/country/\/programs\ },
    { label: "Ask AI", href: \/country/\/ask\ },
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
