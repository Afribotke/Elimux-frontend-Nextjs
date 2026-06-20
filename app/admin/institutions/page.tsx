"use client";

import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminInstitutionsTable from "@/components/admin/AdminInstitutionsTable";

export default function AdminInstitutionsPage() {
  const institutions = [
    { id: "1", name: "Nairobi University", city: "Nairobi", country: "Kenya" },
    { id: "2", name: "Makerere University", city: "Kampala", country: "Uganda" },
  ];

  return (
    <AdminPageLayout>
      <h2 className="text-xl font-semibold mb-4">Institutions</h2>
      <AdminInstitutionsTable institutions={institutions} />
    </AdminPageLayout>
  );
}
