"use client";

import React from "react";
import CountryFlag from "./CountryFlag";

type Country = {
  code: string;
  name: string;
  region: string;
};

type CountryListProps = {
  countries: Country[];
  onSelect?: (code: string) => void;
};

export default function CountryList({ countries, onSelect }: CountryListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {countries.map((c) => (
        <button
          key={c.code}
          onClick={() => onSelect && onSelect(c.code)}
          className="flex items-center gap-2 p-3 border rounded-lg bg-white hover:border-indigo-500 transition"
        >
          <CountryFlag code={c.code} size={20} />
          <div className="text-left">
            <p className="font-medium">{c.name}</p>
            <p className="text-xs text-gray-500">{c.region}</p>
          </div>
        </button>
      ))}
    </div>
  );
}



