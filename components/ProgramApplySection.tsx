"use client";

import React from "react";
import Link from "next/link";

type ProgramApplySectionProps = {
  programId: string;
};

export default function ProgramApplySection({ programId }: ProgramApplySectionProps) {
  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm mt-8">
      <h3 className="text-xl font-semibold mb-3">Ready to Apply?</h3>
      <p className="text-sm text-gray-600 mb-4">
        Start your application process for this program.
      </p>

      <Link
        href={`/program/${programId}/apply`}
        className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Apply Now
      </Link>
    </div>
  );
}
