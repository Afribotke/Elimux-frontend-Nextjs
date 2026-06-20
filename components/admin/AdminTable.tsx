"use client";

import React from "react";

type Column = {
  key: string;
  label: string;
};

type AdminTableProps = {
  columns: Column[];
  data: Record<string, any>[];
};

export default function AdminTable({ columns, data }: AdminTableProps) {
  return (
    <table className="w-full border rounded-xl bg-white shadow-sm text-sm">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="p-3 text-left font-medium text-gray-600">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col.key} className="p-3">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
