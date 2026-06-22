"use client";

import { Enrollment } from "./enrollment-types";
import { StatusBadge } from "@/components/admin/status-badge";

interface EnrollmentDetailsProps {
  enrollment: Enrollment;
}

export function EnrollmentDetails({ enrollment }: EnrollmentDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {enrollment.studentName}
          </h2>

          <p className="text-sm text-slate-500">
            Program: {enrollment.programName}
          </p>

          <p className="text-sm text-slate-500">
            Institution: {enrollment.institutionName}
          </p>

          <StatusBadge status={enrollment.status} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Start Date</h3>
          <p className="text-sm text-slate-600 mt-1">{enrollment.startDate}</p>
        </div>

        {enrollment.endDate && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700">End Date</h3>
            <p className="text-sm text-slate-600 mt-1">{enrollment.endDate}</p>
          </div>
        )}

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Created At</h3>
          <p className="text-sm text-slate-600 mt-1">{enrollment.createdAt}</p>
        </div>

        {enrollment.updatedAt && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700">Updated At</h3>
            <p className="text-sm text-slate-600 mt-1">{enrollment.updatedAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}



