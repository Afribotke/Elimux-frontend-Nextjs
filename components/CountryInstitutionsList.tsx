"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type Institution = {
  id: string;
  name: string;
  logo_url?: string;
  city?: string;
  country_code: string;
  type?: string; // university, college, tvet, etc.
};

type CountryInstitutionsListProps = {
  institutions: Institution[];
  onSelect?: (id: string) => void;
};

export default function CountryInstitutionsList({ institutions, onSelect }: CountryInstitutionsListProps) {
  if (!institutions || institutions.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No institutions found for this country.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {institutions.map((inst) => (
        <button
          key={inst.id}
          onClick={() => onSelect && onSelect(inst.id)}
          className="flex items-center gap-3 p-4 border rounded-lg bg-white hover:border-indigo-500 transition"
        >
          {inst.logo_url ? (
            <img
              src={inst.logo_url}
              alt={inst.name}
              className="w-10 h-10 rounded object-cover"
            />
          ) : (
            <CountryFlag code={inst.country_code} size={24} />
          )}

          <div className="text-left">
            <p className="font-semibold">{inst.name}</p>
            <p className="text-xs text-gray-500">
              {inst.city ? inst.city + ", " : ""}{inst.country_code.toUpperCase()}
            </p>
            {inst.type && (
              <p className="text-xs text-gray-400">{inst.type}</p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
