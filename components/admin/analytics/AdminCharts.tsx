"use client";

import React from "react";

export default function AdminCharts({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm space-y-6">
      {children}
    </div>
  );
}



