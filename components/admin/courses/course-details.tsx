"use client";

import { Course } from "./course-types";
import { StatusBadge } from "@/components/admin/status-badge";

interface CourseDetailsProps {
  course: Course;
}

export function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">{course.name}</h2>

          {course.code && (
            <p className="text-sm text-slate-500">Code: {course.code}</p>
          )}

          <StatusBadge status={course.status} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Program</h3>
          <p className="text-sm text-slate-600 mt-1">{course.programName}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Institution</h3>
          <p className="text-sm text-slate-600 mt-1">{course.institutionName}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Level</h3>
          <p className="text-sm text-slate-600 mt-1 capitalize">{course.level}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Created At</h3>
          <p className="text-sm text-slate-600 mt-1">{course.createdAt}</p>
        </div>

        {course.updatedAt && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700">Updated At</h3>
            <p className="text-sm text-slate-600 mt-1">{course.updatedAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}



