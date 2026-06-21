async function getAnalytics() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/analytics`, {
    cache: "no-store",
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function AnalyticsPage() {
  const events = await getAnalytics();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-800">Analytics</h1>
      <p className="text-sm text-slate-500">
        Recent platform events for admin insight.
      </p>

      <div className="rounded-lg border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left">Event</th>
              <th className="px-3 py-2 text-left">Institution</th>
              <th className="px-3 py-2 text-left">Actor</th>
              <th className="px-3 py-2 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e: any) => (
              <tr key={e.id} className="border-b last:border-0">
                <td className="px-3 py-2 text-xs">{e.event_type}</td>
                <td className="px-3 py-2 text-xs">{e.institution_id ?? "—"}</td>
                <td className="px-3 py-2 text-xs">{e.actor_user_id ?? "—"}</td>
                <td className="px-3 py-2 text-xs">
                  {new Date(e.created_at).toLocaleString()}
                </td>
              </tr>
            ))}

            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-slate-500">
                  No analytics events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
