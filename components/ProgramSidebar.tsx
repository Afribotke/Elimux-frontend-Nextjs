"use client";

import React from "react";

type ProgramSidebarProps = {
  items: { label: string; value: string }[];
};

export default function ProgramSidebar({ items }: ProgramSidebarProps) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm w-64">
      <h3 className="font-semibold mb-3">Program Info</h3>

      <ul className="space-y-2 text-sm text-gray-700">
        {items.map((i, index) => (
          <li key={index} className="flex justify-between">
            <span className="font-medium">{i.label}</span>
            <span>{i.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}



