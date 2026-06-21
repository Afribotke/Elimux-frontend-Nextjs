"use client";

import React from "react";

type ProgramDetailsCardProps = {
  name: string;
  level?: string;        // diploma, degree, masters, etc.
  duration?: string;     // 2 years, 4 years, etc.
  mode?: string;         // online, onsite, blended
  fees?: string;         // KES 120,000 per year
  institutionName?: string;
  description?: string;
};

export default function ProgramDetailsCard({
  name,
  level,
  duration,
  mode,
  fees,
  institutionName,
  description
}: ProgramDetailsCardProps) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm space-y-4">
      <h2 className="text-2xl font-bold">{name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        {level && (
          <p>
            <span className="font-semibold">Level:</span> {level}
          </p>
        )}

        {duration && (
          <p>
            <span className="font-semibold">Duration:</span> {duration}
          </p>
        )}

        {mode && (
          <p>
            <span className="font-semibold">Mode:</span> {mode}
          </p>
        )}

        {fees && (
          <p>
            <span className="font-semibold">Fees:</span> {fees}
          </p>
        )}

        {institutionName && (
          <p>
            <span className="font-semibold">Institution:</span> {institutionName}
          </p>
        )}
      </div>

      {description && (
        <p className="text-gray-700 text-sm leading-relaxed pt-2">
          {description}
        </p>
      )}
    </div>
  );
}

