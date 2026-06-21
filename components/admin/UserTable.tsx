"use client";

import { useMemo } from "react";
import { AdminUser } from "./users/user-types";
import { StatusBadge } from "./status-badge";
import { UserActions } from "./users/user-actions";
import { DataTableEmpty } from "./data-table-empty";
import { DataTableSkeleton } from "./data-table-skeleton";

interface UserTableProps {
  users: AdminUser[];
  loading?: boolean;
  searchQuery?: string;
}

export function UserTable({ users, loading = false, searchQuery = "" }: UserTableProps) {
  const filtered = useMemo(() => {
    if (!searchQuery) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.status.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  if (loading) {
    return <DataTableSkeleton rows={6} columns={4} />;
  }

  if (filtered.length === 0) {
    return (
      <DataTableEmpty
        title="No users found"
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
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">{user.name ?? "—"}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <UserActions user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-100">
        {filtered.map((user) => (
          <div key={user.id} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{user.name ?? user.email}</p>
              <UserActions user={user} />
            </div>

            <p className="text-xs text-slate-500">{user.email}</p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs capitalize text-slate-600">{user.role}</span>
              <StatusBadge status={user.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}