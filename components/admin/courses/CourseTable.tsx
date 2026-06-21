"use client";

import { useMemo } from "react";
import { Course } from "./course-types";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTableEmpty } from "@/components/admin/data-table-empty";
import { DataTableSkeleton } from "@/components/admin/data-table-skeleton";

interface CourseTableProps {
  courses: Course[];
  loading?: boolean;
  searchQuery?: string;
}

export function CourseTable({
  courses,
  loading = false,
  searchQuery = "",
}: CourseTableProps) {
  const filtered = useMemo(() => {
    if (!searchQuery) return courses;
    const q = searchQuery.toLowerCase();
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.code?.toLowerCase() ?? "").includes(q) ||
        c.level.toLowerCase().includes(q) ||
        c.status.toLowerCase().includes(q) ||
        c.programName.toLowerCase().includes(q) ||
        c.institutionName.toLowerCase().includes(q)
    );
  }, [courses, searchQuery]);

  if (loading) {
    return <DataTableSkeleton rows={6} columns={6} />;
  }

  if (filtered.length === 0) {
    return (
      <DataTableEmpty
        title="No courses found"
        description="Try adjusting your search or filters."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

      <div className="hidden md:block">
        <table className="w-full table-auto text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Course</th>
              <th className="px-4 py-3 text-left font-medium">Program</th>
              <th className="px-4 py-3 text-left font-medium">Institution</th>
              <th className="px-4 py-3 text-left font-medium">Level</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filtered.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{course.name}</span>
                    {course.code && (
                      <span className="text-xs text-slate-500">
                        {course.code}
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">{course.programName}</td>
                <td className="px-4 py-3">{course.institutionName}</td>
                <td className="px-4 py-3 capitalize">{course.level}</td>

                <td className="px-4 py-3">
                  <StatusBadge status={course.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((course) => (
          <div key={course.id} className="p-4 space-y-2">

            <div className="flex items-center justify-between">
              <p className="font-medium">{course.name}</p>
            </div>

            {course.code && (
              <p className="text-xs text-slate-500">
                Code: {course.code}
              </p>
            )}

            <p className="text-xs text-slate-500">{course.programName}</p>
            <p className="text-xs text-slate-500">{course.institutionName}</p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs capitalize text-slate-600">
                {course.level}
              </span>
              <StatusBadge status={course.status} />
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
