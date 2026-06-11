export const dynamic = "force-dynamic";
import DashboardCard from '@/components/DashboardCard';
import { fetchInstitution, fetchAnalytics, fetchPrograms } from '@/lib/api';

export default async function DashboardPage({
  params,
}: {
  params: { id: string };
}) {
  const [institution, analytics, programs] = await Promise.all([
    fetchInstitution(params.id),
    fetchAnalytics(params.id),
    fetchPrograms(params.id),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-navy">
          Welcome, {institution.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {institution.country} · {institution.level} ·{' '}
          {institution.verified ? 'Verified' : 'Pending verification'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Profile views" value={analytics.views.toLocaleString()} hint="Last 30 days" />
        <DashboardCard label="Applications" value={analytics.applications} hint="This term" />
        <DashboardCard label="Enquiries" value={analytics.enquiries} />
        <DashboardCard label="Programs listed" value={programs.length} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-navy">Recent programs</h3>
        <ul className="divide-y divide-gray-100">
          {programs.slice(0, 3).map((p) => (
            <li key={p.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-ink">{p.name}</p>
                <p className="text-sm text-gray-500">
                  {p.level} · {p.duration}
                </p>
              </div>
              <span className="text-sm font-medium text-gold">{p.fees}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
