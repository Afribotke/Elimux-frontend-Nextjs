"use client";

import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminCountriesTable from "@/components/admin/AdminCountriesTable";

export default function AdminCountriesPage() {
  const countries = [
    { code: "KE", name: "Kenya", region: "Africa" },
    { code: "UG", name: "Uganda", region: "Africa" },
  ];

  return (
    <AdminPageLayout>
      <h2 className="text-xl font-semibold mb-4">Countries</h2>
      <AdminCountriesTable countries={countries} />
    </AdminPageLayout>
  );
}
