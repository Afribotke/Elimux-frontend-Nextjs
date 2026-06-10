import { fetchPrograms } from '@/lib/api';

export default async function ProgramsPage({
  params,
}: {
  params: { id: string };
}) {
  const programs = await fetchPrograms(params.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-navy">Programs</h2>
        <span className="rounded-full bg-navy/5 px-3 py-1 text-sm text-navy">
          {programs.length} listed
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 font-medium">Program</th>
              <th className="px-6 py-3 font-medium">Level</th>
              <th className="px-6 py-3 font-medium">Duration</th>
              <th className="px-6 py-3 font-medium">Mode</th>
              <th className="px-6 py-3 font-medium">Fees</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {programs.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                <td className="px-6 py-4 text-gray-600">{p.level}</td>
                <td className="px-6 py-4 text-gray-600">{p.duration}</td>
                <td className="px-6 py-4 text-gray-600">{p.mode}</td>
                <td className="px-6 py-4 font-medium text-gold">{p.fees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
