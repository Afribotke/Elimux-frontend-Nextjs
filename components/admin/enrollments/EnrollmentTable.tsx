"use client";

import { useMemo } from "react";
import { Enrollment } from "./enrollment-types";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTableEmpty } from "@/components/admin/data-table-empty";
import { DataTableSkeleton } from "@/components/admin/data-table-skeleton";

interface EnrollmentTableProps {
  enrollments: Enrollment[];
  loading?: boolean;
  searchQuery?: string;
}

export function EnrollmentTable({
  enrollments,
  loading = false,
  searchQuery = "",
}: EnrollmentTableProps) {
  const filtered = useMemo(() => {
    if (!searchQuery) return enrollments;
    const q = searchQuery.toLowerCase();
    return enrollments.filter(
      (e) =>
        e.studentName.toLowerCase().includes(q) ||
        e.programName.toLowerCase().includes(q) ||
        e.institutionName.toLowerCase().includes(q) ||
        e.status.toLowerCase().includes(q)
    );
  }, [enrollments, searchQuery]);

  if (loading) {
    return <DataTableSkeleton rows={6} columns={6} />;
  }

  if (filtered.length === 0) {
    return (
      <DataTableEmpty
        title="No enrollments found"
        description="Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full table-auto text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Student</th>
              <th className="px-4 py-3 text-left font-medium">Program</th>
              <th className="px-4 py-3 text-left font-medium">Institution</th>
              <th className="px-4 py-3 text-left font-medium">Start Date</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filtered.map((enrollment) => (
              <tr key={enrollment.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{enrollment.studentName}</td>
                <td className="px-4 py-3">{enrollment.programName}</td>
                <td className="px-4 py-3">{enrollment.institutionName}</td>
                <td className="px-4 py-3">{enrollment.startDate}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={enrollment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((enrollment) => (
          <div key={enrollment.id} className="p-4 space-y-2">

            <p className="font-medium">{enrollment.studentName}</p>

            <p className="text-xs text-slate-500">{enrollment.programName}</p>
            <p className="text-xs text-slate-500">{enrollment.institutionName}</p>

            <p className="text-xs text-slate-500">Start: {enrollment.startDate}</p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs capitalize text-slate-600">
                {enrollment.status}
              </span>
              <StatusBadge status={enrollment.status} />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

