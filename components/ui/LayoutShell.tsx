"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/Sidebar";

interface LayoutShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function LayoutShell({
  title,
  subtitle,
  actions,
  children
}: LayoutShellProps) {
  return (
    <div className="flex min-h-screen bg-navy-50">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-navy-100 bg-white px-4 sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-navy">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-xs text-navy/50">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <Link
              href="/"
              className="text-sm font-medium text-navy hover:text-gold-600"
            >
              View public site
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
