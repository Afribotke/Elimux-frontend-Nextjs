"use client";

import React from "react";

type Stat = {
  label: string;
  value: number | string;
};

type AdminStatsCardsProps = {
  stats: Stat[];
};

export default function AdminStatsCards({ stats }: AdminStatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {stats.map((s, index) => (
        <div
          key={index}
          className="p-4 border rounded-xl bg-white shadow-sm text-center"
        >
          <p className="text-2xl font-bold text-indigo-600">{s.value}</p>
          <p className="text-sm text-gray-600 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}



