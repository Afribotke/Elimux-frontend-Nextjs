"use client";

import React from "react";

type Requirement = string;

type ProgramRequirementsCardProps = {
  requirements: Requirement[];
};

export default function ProgramRequirementsCard({ requirements }: ProgramRequirementsCardProps) {
  if (!requirements || requirements.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        No requirements listed for this program.
      </p>
    );
  }

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm mt-6">
      <h3 className="text-xl font-semibold mb-3">Program Requirements</h3>

      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
        {requirements.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
    </div>
  );
}



