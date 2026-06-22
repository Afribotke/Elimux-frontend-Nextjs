"use client";

import { Program } from "./program-types";
import { StatusBadge } from "@/components/admin/status-badge";

interface ProgramDetailsProps {
  program: Program;
}

export function ProgramDetails({ program }: ProgramDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-slate-900">{program.name}</h2>

          {program.code && (
            <p className="text-sm text-slate-500">Code: {program.code}</p>
          )}

          <StatusBadge status={program.status} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Institution</h3>
          <p className="text-sm text-slate-600 mt-1">{program.institutionName}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Level</h3>
          <p className="text-sm text-slate-600 mt-1 capitalize">{program.level}</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Created At</h3>
          <p className="text-sm text-slate-600 mt-1">{program.createdAt}</p>
        </div>

        {program.updatedAt && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-medium text-slate-700">Updated At</h3>
            <p className="text-sm text-slate-600 mt-1">{program.updatedAt}</p>
          </div>
        )}
      </div>
    </div>
  );
}



