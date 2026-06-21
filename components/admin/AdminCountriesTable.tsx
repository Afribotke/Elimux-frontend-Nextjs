"use client";

import React from "react";

type Country = {
  code: string;
  name: string;
  region: string;
};

type AdminCountriesTableProps = {
  countries: Country[];
};

export default function AdminCountriesTable({ countries }: AdminCountriesTableProps) {
  return (
    <table className="w-full border rounded-xl bg-white shadow-sm text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-3 text-left">Code</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Region</th>
        </tr>
      </thead>

      <tbody>
        {countries.map((c) => (
          <tr key={c.code} className="border-t hover:bg-gray-50">
            <td className="p-3">{c.code}</td>
            <td className="p-3">{c.name}</td>
            <td className="p-3">{c.region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

