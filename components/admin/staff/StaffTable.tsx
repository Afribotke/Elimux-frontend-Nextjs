import { Menu, Search, User } from 'lucide-react';
"use client";

import { StaffRoleBadge } from "@/components/admin/roles/StaffRoleBadge";
import { StaffRoleSelector } from "@/components/admin/roles/StaffRoleSelector";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: any;
  status: "active" | "invited" | "disabled";
}

interface StaffTableProps {
  staff: StaffMember[];
  onRoleChange?: (id: string, role: any) => void;
  onView?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function StaffTable({
  staff,
  onRoleChange,
  onView,
  onRemove,
}: StaffTableProps) {
  if (staff.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-500">
        No staff members found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full table-auto text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.email}</td>

                <td className="px-4 py-3">
                  <StaffRoleSelector
                    value={member.role}
                    onChange={(role) => onRoleChange?.(member.id, role)}
                  />
                </td>

                <td className="px-4 py-3 capitalize text-slate-600">
                  {member.status}
                </td>

                <td className="px-4 py-3 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView?.(member.id)}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {staff.map((member) => (
          <div key={member.id} className="p-4 space-y-2">
            <p className="font-medium">{member.name}</p>
            <p className="text-xs text-slate-500">{member.email}</p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Role</span>
              <StaffRoleSelector
                value={member.role}
                onChange={(role) => onRoleChange?.(member.id, role)}
              />
            </div>

            <p className="text-xs text-slate-500 capitalize">
              Status: {member.status}
            </p>

            <div className="flex justify-end pt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onView?.(member.id)}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




