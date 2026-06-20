"use client";

import React from "react";

type Program = {
  id: string;
  name: string;
  level?: string;
  institutionName?: string;
  country?: string;
};

type GlobalProgramsGridProps = {
  programs: Program[];
  onSelect?: (id: string) => void;
};

export default function GlobalProgramsGrid({ programs, onSelect }: GlobalProgramsGridProps) {
  if (!programs || programs.length === 0) {
    return <p className="text-gray-500 text-sm">No programs available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {programs.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect && onSelect(p.id)}
          className="p-4 border rounded-xl bg-white hover:border-indigo-500 transition text-left"
        >
          <p className="font-semibold">{p.name}</p>
          {p.level && <p className="text-xs text-gray-600">{p.level}</p>}
          {p.institutionName && (
            <p className="text-xs text-gray-500 mt-1">{p.institutionName} — {p.country}</p>
          )}
        </button>
      ))}
    </div>
  );
}
