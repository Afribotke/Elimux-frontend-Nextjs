import DashboardCard from '@/components/DashboardCard';
import { fetchAnalytics } from '@/lib/api';

export default async function AnalyticsPage({
  params,
}: {
  params: { id: string };
}) {
  const analytics = await fetchAnalytics(params.id);
  const maxViews = Math.max(...analytics.monthly.map((m) => m.views), 1);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-navy">Analytics</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Total views" value={analytics.views.toLocaleString()} />
        <DashboardCard label="Applications" value={analytics.applications} />
        <DashboardCard label="Enquiries" value={analytics.enquiries} />
        <DashboardCard
          label="Conversion rate"
          value={`${analytics.conversion_rate}%`}
          hint="Views → applications"
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-navy">Monthly views</h3>
        <div className="flex h-56 items-end gap-4">
          {analytics.monthly.map((m) => (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gold"
                style={{ height: `${(m.views / maxViews) * 100}%` }}
                title={`${m.views} views`}
              />
              <span className="text-xs text-gray-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
