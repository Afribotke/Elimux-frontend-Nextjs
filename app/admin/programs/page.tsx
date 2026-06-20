"use client";

import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminProgramsTable from "@/components/admin/AdminProgramsTable";

export default function AdminProgramsPage() {
  const programs = [
    { id: "1", name: "Computer Science", level: "Degree", institutionName: "Nairobi University" },
    { id: "2", name: "Business Management", level: "Diploma", institutionName: "KCA University" },
  ];

  return (
    <AdminPageLayout>
      <h2 className="text-xl font-semibold mb-4">Programs</h2>
      <AdminProgramsTable programs={programs} />
    </AdminPageLayout>
  );
}
