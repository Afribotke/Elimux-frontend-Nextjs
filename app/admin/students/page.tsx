async function getStudents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/students`, {
    cache: "no-store",
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-800">Students</h1>
      <p className="text-sm text-slate-500">
        View registered students (created via public onboarding).
      </p>

      <div className="rounded-lg border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Country</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s: any) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="px-3 py-2">
                  {s.first_name} {s.last_name}
                </td>
                <td className="px-3 py-2 text-xs">{s.email}</td>
                <td className="px-3 py-2 text-xs">{s.phone}</td>
                <td className="px-3 py-2 text-xs">{s.country}</td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  No students yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
