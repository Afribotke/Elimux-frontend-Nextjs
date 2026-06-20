"use client";

import React from "react";

type Program = {
  id: string;
  name: string;
  level?: string;        // diploma, degree, masters, etc.
  duration?: string;     // 2 years, 4 years, etc.
  category?: string;     // engineering, business, health sciences, etc.
  country_code: string;
  institution_id: string;
};

type InstitutionProgramsListProps = {
  programs: Program[];
  onSelect?: (id: string) => void;
};

export default function InstitutionProgramsList({ programs, onSelect }: InstitutionProgramsListProps) {
  if (!programs || programs.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No programs available for this institution.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {programs.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect && onSelect(p.id)}
          className="p-4 border rounded-lg bg-white hover:border-indigo-500 transition text-left"
        >
          <p className="font-semibold text-gray-900">{p.name}</p>

          {p.level && (
            <p className="text-xs text-gray-600 mt-1">{p.level}</p>
          )}

          {p.duration && (
            <p className="text-xs text-gray-500">{p.duration}</p>
          )}

          {p.category && (
            <p className="text-xs text-gray-400 mt-1">{p.category}</p>
          )}
        </button>
      ))}
    </div>
  );
}
