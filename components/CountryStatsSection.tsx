"use client";

import React from "react";

type StatItem = {
  label: string;
  value: number | string;
};

type CountryStatsSectionProps = {
  stats: StatItem[];
};

export default function CountryStatsSection({ stats }: CountryStatsSectionProps) {
  if (!stats || stats.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No statistics available for this country.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
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



