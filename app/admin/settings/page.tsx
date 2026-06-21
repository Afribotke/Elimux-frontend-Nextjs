"use client";

import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminSettingsPanel from "@/components/admin/AdminSettingsPanel";

export default function AdminSettingsPage() {
  const settings = [
    { key: "site_name", label: "Site Name", value: "ElimuX" },
    { key: "support_email", label: "Support Email", value: "support@elimux.com" },
  ];

  const handleChange = (key: string, value: string) => {
    console.log("Setting updated:", key, value);
  };

  return (
    <AdminPageLayout>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <AdminSettingsPanel settings={settings} onChange={handleChange} />
    </AdminPageLayout>
  );
}



