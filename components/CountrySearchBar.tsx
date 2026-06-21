"use client";

import React from "react";

type CountrySearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CountrySearchBar({ value, onChange }: CountrySearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search countries..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border rounded-lg bg-white shadow-sm focus:border-indigo-500 outline-none"
    />
  );
}

