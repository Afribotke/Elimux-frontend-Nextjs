"use client";

import { useMemo } from "react";
import { Program } from "./program-types";
import { StatusBadge } from "@/components/admin/status-badge";
import { DataTableEmpty } from "@/components/admin/data-table-empty";
import { DataTableSkeleton } from "@/components/admin/data-table-skeleton";

interface ProgramTableProps {
  programs: Program[];
  loading?: boolean;
  searchQuery?: string;
}

export function ProgramTable({
  programs,
  loading = false,
  searchQuery = "",
}: ProgramTableProps) {
  const filtered = useMemo(() => {
    if (!searchQuery) return programs;
    const q = searchQuery.toLowerCase();
    return programs.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.code?.toLowerCase() ?? "").includes(q) ||
        p.level.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        p.institutionName.toLowerCase().includes(q)
    );
  }, [programs, searchQuery]);

  if (loading) {
    return <DataTableSkeleton rows={6} columns={5} />;
  }

  if (filtered.length === 0) {
    return (
      <DataTableEmpty
        title="No programs found"
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
              <th className="px-4 py-3 text-left font-medium">Program</th>
              <th className="px-4 py-3 text-left font-medium">Institution</th>
              <th className="px-4 py-3 text-left font-medium">Level</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filtered.map((program) => (
              <tr key={program.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{program.name}</span>
                    {program.code && (
                      <span className="text-xs text-slate-500">{program.code}</span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">{program.institutionName}</td>

                <td className="px-4 py-3 capitalize">{program.level}</td>

                <td className="px-4 py-3">
                  <StatusBadge status={program.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((program) => (
          <div key={program.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{program.name}</p>
            </div>

            {program.code && (
              <p className="text-xs text-slate-500">Code: {program.code}</p>
            )}

            <p className="text-xs text-slate-500">{program.institutionName}</p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs capitalize text-slate-600">{program.level}</span>
              <StatusBadge status={program.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

