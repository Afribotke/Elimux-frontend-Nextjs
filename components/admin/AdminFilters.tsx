"use client";

import React from "react";

type AdminFiltersProps = {
  filters: Record<string, string[]>;
  selected: Record<string, string>;
  onChange: (key: string, value: string) => void;
};

export default function AdminFilters({ filters, selected, onChange }: AdminFiltersProps) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm w-64">
      <h3 className="font-semibold mb-3">Filters</h3>

      {Object.keys(filters).map((key) => (
        <div key={key} className="mb-4">
          <p className="text-sm font-medium mb-1">{key}</p>

          <select
            value={selected[key] || ""}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-full p-2            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">All</option>
            {filters[key].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}



