"use client";

import React from "react";

type AdminKPICardProps = {
  label: string;
  value: number | string;
  trend?: string;
};

export default function AdminKPICard({ label, value, trend }: AdminKPICardProps) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm text-center">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-indigo-600 mt-1">{value}</p>
      {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
    </div>
  );
}

