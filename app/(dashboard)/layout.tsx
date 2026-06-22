import React, { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <PageShell>{children}</PageShell>;
}
