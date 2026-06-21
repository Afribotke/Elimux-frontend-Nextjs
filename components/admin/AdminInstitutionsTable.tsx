"use client";

import React from "react";

type Institution = {
  id: string;
  name: string;
  country: string;
  city: string;
};

type AdminInstitutionsTableProps = {
  institutions: Institution[];
};

export default function AdminInstitutionsTable({ institutions }: AdminInstitutionsTableProps) {
  return (
    <table className="w-full border rounded-xl bg-white shadow-sm text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">City</th>
          <th className="p-3 text-left">Country</th>
        </tr>
      </thead>

      <tbody>
        {institutions.map((i) => (
          <tr key={i.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{i.name}</td>
            <td className="p-3">{i.city}</td>
            <td className="p-3">{i.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

