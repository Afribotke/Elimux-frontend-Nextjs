"use client";

import React, { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminPageLayoutProps {
  children: ReactNode;
}

export default function AdminPageLayout({ children }: AdminPageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />
      <main className="flex-1 px-6 py-6 lg:px-8">{children}</main>
    </div>
  );
}
