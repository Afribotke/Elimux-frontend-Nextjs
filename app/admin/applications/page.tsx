async function getApplications() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/applications`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  return [];
}

export default async function ApplicationsPage() {
  const apps = await getApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Applications</h1>
        <p className="text-sm text-slate-500">
          Track student applications across programs and institutions.
        </p>
      </div>

      <div className="rounded-lg border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Student
              </th>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Program
              </th>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Institution
              </th>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {apps.map((row: any) => {
              const raw = row.raw ?? row;
              const student = row.expanded?.student ?? row.students;
              const program = row.expanded?.program ?? row.programs;
              const institution =
                row.expanded?.institution ?? row.programs?.institutions;
              return (
                <tr key={raw.id} className="border-b last:border-0">
                  <td className="px-3 py-2 text-xs">
                    {student
                      ? `${student.first_name} ${student.last_name}`
                      : "—"}
                  </td>
                  <td className="px-3 py-2 text-xs">{program?.name ?? "—"}</td>
                  <td className="px-3 py-2 text-xs">
                    {institution?.name ?? "—"}
                  </td>
                  <td className="px-3 py-2 text-xs capitalize">
                    {raw.status}
                  </td>
                </tr>
              );
            })}
            {apps.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-6 text-center text-sm text-slate-500"
                >
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
