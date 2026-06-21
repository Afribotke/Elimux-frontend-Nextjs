"use client";

import React from "react";

type Result = {
  id: string;
  title: string;
  subtitle?: string;
  type: "country" | "institution" | "program";
};

type SearchResultsGridProps = {
  results: Result[];
  onSelect?: (id: string, type: string) => void;
};

export default function SearchResultsGrid({ results, onSelect }: SearchResultsGridProps) {
  if (!results || results.length === 0) {
    return <p className="text-gray-500 text-sm">No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {results.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect && onSelect(r.id, r.type)}
          className="p-4 border rounded-xl bg-white hover:border-indigo-500 transition text-left"
        >
          <p className="font-semibold">{r.title}</p>
          {r.subtitle && <p className="text-xs text-gray-600">{r.subtitle}</p>}
          <p className="text-xs text-indigo-600 mt-1 uppercase">{r.type}</p>
        </button>
      ))}
    </div>
  );
}

