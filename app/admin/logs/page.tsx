"use client";

import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminLogsTable from "@/components/admin/AdminLogsTable";

export default function AdminLogsPage() {
  const logs = [
    { id: "1", action: "User Login", user: "John Doe", timestamp: "2026-06-20 10:00" },
    { id: "2", action: "Program Added", user: "Admin", timestamp: "2026-06-20 09:30" },
  ];

  return (
    <AdminPageLayout>
      <h2 className="text-xl font-semibold mb-4">System Logs</h2>
      <AdminLogsTable logs={logs} />
    </AdminPageLayout>
  );
}

