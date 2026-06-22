"use client";

import { Student } from "./student-types";
import { StatusBadge } from "@/components/admin/status-badge";

interface StudentDetailsProps {
  student: Student;
}

export function StudentDetails({ student }: StudentDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">
            {student.firstName} {student.lastName}
          </h2>

          {student.email && (
            <p className="text-sm text-slate-500">Email: {student.email}</p>
          )}

          {student.phone && (
            <p className="text-sm text-slate-500">Phone: {student.phone}</p>
          )}

          <StatusBadge status={student.status} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Program</h3>
          <p className="text-sm text-slate-600 mt-1">{student.programName}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Institution</h3>
          <p className="text-sm text-slate-600 mt-1">{student.institutionName}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Created At</h3>
          <p className="text-sm text-slate-600 mt-1">{student.createdAt}</p>
        </div>

        {student.updatedAt && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700">Updated At</h3>
            <p className="text-sm text-slate-600 mt-1">{student.updatedAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}



