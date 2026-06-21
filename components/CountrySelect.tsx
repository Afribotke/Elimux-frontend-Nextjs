"use client";

import React from "react";
import CountryFlag from "./CountryFlag";
import { getFlagEmoji } from "@/lib/getFlagEmoji";

type Country = {
  code: string;
  name: string;
  region: string;
};

type CountrySelectProps = {
  countries: Country[];
  value: string;
  onChange: (code: string) => void;
};

export default function CountrySelect({ countries, value, onChange }: CountrySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2 text-sm bg-white"
    >
      {countries.map((c) => (
        <option key={c.code} value={c.code}>
          {getFlagEmoji(c.code)} {c.name}
        </option>
      ))}
    </select>
  );
}



