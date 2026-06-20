"use client";

import React from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AdminUsersTableProps = {
  users: User[];
};

export default function AdminUsersTable({ users }: AdminUsersTableProps) {
  return (
    <table className="w-full border rounded-xl bg-white shadow-sm text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Role</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t hover:bg-gray-50">
            <td className="p-3">{u.name}</td>
            <td className="p-3">{u.email}</td>
            <td className="p-3">{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
