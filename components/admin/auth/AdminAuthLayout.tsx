"use client";

import React from "react";

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}
