"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type Country = {
  code: string;
  name: string;
  region?: string;
};

type GlobalCountryGridProps = {
  countries: Country[];
  onSelect?: (code: string) => void;
};

export default function GlobalCountryGrid({ countries, onSelect }: GlobalCountryGridProps) {
  if (!countries || countries.length === 0) {
    return <p className="text-gray-500 text-sm">No countries available.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {countries.map((c) => (
        <button
          key={c.code}
          onClick={() => onSelect && onSelect(c.code)}
          className="p-4 border rounded-xl bg-white hover:border-indigo-500 transition flex items-center gap-3"
        >
          <CountryFlag code={c.code} size={24} />
          <div className="text-left">
            <p className="font-semibold">{c.name}</p>
            {c.region && <p className="text-xs text-gray-500">{c.region}</p>}
          </div>
        </button>
      ))}
    </div>
  );
}



