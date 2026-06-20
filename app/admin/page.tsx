"use client";

import AdminPageLayout from "@/components/admin/AdminPageLayout";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import AdminCharts from "@/components/admin/analytics/AdminCharts";
import AdminLineGraph from "@/components/admin/analytics/AdminLineGraph";
import AdminBarGraph from "@/components/admin/analytics/AdminBarGraph";
import AdminKPICard from "@/components/admin/analytics/AdminKPICard";
import AdminActivityFeed from "@/components/admin/analytics/AdminActivityFeed";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Users", value: 1240 },
    { label: "Institutions", value: 87 },
    { label: "Programs", value: 312 },
    { label: "Countries", value: 42 },
  ];

  const activities = [
    { id: "1", message: "New user registered", timestamp: "2 hours ago" },
    { id: "2", message: "Institution updated", timestamp: "5 hours ago" },
  ];

  return (
    <AdminPageLayout>
      <AdminStatsCards stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AdminCharts>
          <AdminLineGraph
            title="User Growth"
            labels={["Jan", "Feb", "Mar", "Apr"]}
            values={[200, 350, 500, 700]}
          />
        </AdminCharts>

        <AdminCharts>
          <AdminBarGraph
            title="Programs Added"
            labels={["Jan", "Feb", "Mar", "Apr"]}
            values={[10, 25, 40, 55]}
          />
        </AdminCharts>
      </div>

      <div className="mt-6">
        <AdminActivityFeed activities={activities} />
      </div>
    </AdminPageLayout>
  );
}
