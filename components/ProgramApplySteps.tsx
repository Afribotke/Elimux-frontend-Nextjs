"use client";

import React from "react";

type ProgramApplyStepsProps = {
  steps: string[];
};

export default function ProgramApplySteps({ steps }: ProgramApplyStepsProps) {
  if (!steps || steps.length === 0) {
    return <p className="text-gray-500 text-sm">No application steps provided.</p>;
  }

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm mt-6">
      <h3 className="text-xl font-semibold mb-3">Application Steps</h3>

      <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
