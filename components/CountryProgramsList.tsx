"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type Program = {
  id: string;
  name: string;
  level?: string;
  duration?: string;
  institution_name?: string;
  institution_id?: string;
  country_code: string;
};

type CountryProgramsListProps = {
  programs: Program[];
  onSelect?: (id: string) => void;
};

export default function CountryProgramsList({ programs, onSelect }: CountryProgramsListProps) {
  if (!programs || programs.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No programs found for this country.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {programs.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect && onSelect(p.id)}
          className="flex items-start gap-3 p-4 border rounded-lg bg-white hover:border-indigo-500 transition"
        >
          <CountryFlag code={p.country_code} size={22} />

          <div className="text-left">
            <p className="font-semibold">{p.name}</p>

            {p.level && (
              <p className="text-xs text-gray-500">{p.level}</p>
            )}

            {p.duration && (
              <p className="text-xs text-gray-400">{p.duration}</p>
            )}

            {p.institution_name && (
              <p className="text-xs text-gray-600 mt-1">
                {p.institution_name}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}



