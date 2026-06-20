"use client";

import React from "react";

type Program = {
  id: string;
  name: string;
  level: string;
  institutionName: string;
};

type AdminProgramsTableProps = {
  programs: Program[];
};

export default function AdminProgramsTable({ programs }: AdminProgramsTableProps) {
  return (
    <table className="w-full border rounded-xl bg-white shadow-sm text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-3 text-left">Program</th>
          <th className="p-3 text-left">Level</th>
          <th className="p-3 text-left">Institution</th>
        </tr>
      </thead>

      <tbody>
        {programs.map((p) => (
          <tr key={p.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{p.name}</td>
            <td className="p-3">{p.level}</td>
            <td className="p-3">{p.institutionName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
