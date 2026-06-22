"use client";

import React from "react";

type Institution = {
  id: string;
  name: string;
  logoUrl?: string;
  country?: string;
  city?: string;
};

type GlobalInstitutionsGridProps = {
  institutions: Institution[];
  onSelect?: (id: string) => void;
};

export default function GlobalInstitutionsGrid({ institutions, onSelect }: GlobalInstitutionsGridProps) {
  if (!institutions || institutions.length === 0) {
    return <p className="text-gray-500 text-sm">No institutions available.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {institutions.map((i) => (
        <button
          key={i.id}
          onClick={() => onSelect && onSelect(i.id)}
          className="p-4 border rounded-xl bg-white hover:border-indigo-500 transition flex flex-col items-center"
        >
          {i.logoUrl ? (
            <img src={i.logoUrl} className="w-14 h-14 rounded object-cover mb-2" />
          ) : (
            <div className="w-14 h-14 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs mb-2">
              No Logo
            </div>
          )}

          <p className="font-semibold text-center">{i.name}</p>
          {i.country && <p className="text-xs text-gray-500">{i.city}, {i.country}</p>}
        </button>
      ))}
    </div>
  );
}



