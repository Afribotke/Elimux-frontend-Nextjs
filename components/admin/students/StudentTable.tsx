"use client";

import { useMemo } from "react";
import { Student } from "./student-types";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTableEmpty } from "@/components/admin/data-table-empty";
import { DataTableSkeleton } from "@/components/admin/data-table-skeleton";

interface StudentTableProps {
  students: Student[];
  loading?: boolean;
  searchQuery?: string;
}

export function StudentTable({
  students,
  loading = false,
  searchQuery = "",
}: StudentTableProps) {
  const filtered = useMemo(() => {
    if (!searchQuery) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(
      (s) =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        (s.email?.toLowerCase() ?? "").includes(q) ||
        (s.phone?.toLowerCase() ?? "").includes(q) ||
        s.programName.toLowerCase().includes(q) ||
        s.institutionName.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  if (loading) {
    return <DataTableSkeleton rows={6} columns={6} />;
  }

  if (filtered.length === 0) {
    return (
      <DataTableEmpty
        title="No students found"
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
              <th className="px-4 py-3 text-left font-medium">Contact</th>
              <th className="px-4 py-3 text-left font-medium">Program</th>
              <th className="px-4 py-3 text-left font-medium">Institution</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filtered.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {student.firstName} {student.lastName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    {student.email && (
                      <span className="text-xs text-slate-500">{student.email}</span>
                    )}
                    {student.phone && (
                      <span className="text-xs text-slate-500">{student.phone}</span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">{student.programName}</td>
                <td className="px-4 py-3">{student.institutionName}</td>

                <td className="px-4 py-3">
                  <StatusBadge status={student.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((student) => (
          <div key={student.id} className="p-4 space-y-2">

            <p className="font-medium">
              {student.firstName} {student.lastName}
            </p>

            {student.email && (
              <p className="text-xs text-slate-500">{student.email}</p>
            )}

            {student.phone && (
              <p className="text-xs text-slate-500">{student.phone}</p>
            )}

            <p className="text-xs text-slate-500">{student.programName}</p>
            <p className="text-xs text-slate-500">{student.institutionName}</p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs capitalize text-slate-600">
                {student.status}
              </span>
              <StatusBadge status={student.status} />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

