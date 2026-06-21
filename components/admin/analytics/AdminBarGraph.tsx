"use client";

import React from "react";

type BarGraphProps = {
  title: string;
  labels: string[];
  values: number[];
};

export default function AdminBarGraph({ title, labels, values }: BarGraphProps) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm">
      <h3 className="font-semibold mb-3">{title}</h3>

      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        Bar Graph Placeholder
      </div>

      <p className="text-xs text-gray-500 mt-2">
        (Integrate Chart.js, Recharts, or any chart library here)
      </p>
    </div>
  );
}

