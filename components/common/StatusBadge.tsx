import React from 'react';

export function StatusBadge({ status }) {
  const base = "px-2 py-1 rounded-full text-xs font-medium";
  let color = "bg-gray-200 text-gray-800";
  if (status === "approved") color = "bg-green-200 text-green-800";
  if (status === "pending") color = "bg-yellow-200 text-yellow-800";
  if (status === "rejected") color = "bg-red-200 text-red-800";
  return <span className={base + " " + color}>{status}</span>;
}



