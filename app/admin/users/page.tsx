"use client";

import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminUsersTable from "@/components/admin/AdminUsersTable";

export default function AdminUsersPage() {
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  ];

  return (
    <AdminPageLayout>
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <AdminUsersTable users={users} />
    </AdminPageLayout>
  );
}
