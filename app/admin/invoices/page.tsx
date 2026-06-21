async function getInvoices() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/invoices`, {
    cache: "no-store",
  });
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function InvoicesPage() {
  const invoices = await getInvoices();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-800">Invoices</h1>
      <p className="text-sm text-slate-500">
        Monitor payments linked to applications and students.
      </p>

      <div className="rounded-lg border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left">Student</th>
              <th className="px-3 py-2 text-left">Program</th>
              <th className="px-3 py-2 text-left">Institution</th>
              <th className="px-3 py-2 text-left">Amount</th>
              <th className="px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((row: any) => {
              const raw = row.raw ?? row;
              const student = row.expanded?.student ?? row.students;
              const program = row.expanded?.program ?? row.programs;
              const institution =
                row.expanded?.institution ??
                row.applications?.programs?.institutions;

              return (
                <tr key={raw.id} className="border-b last:border-0">
                  <td className="px-3 py-2 text-xs">
                    {student
                      ? `${student.first_name} ${student.last_name}`
                      : "—"}
                  </td>
                  <td className="px-3 py-2 text-xs">{program?.name ?? "—"}</td>
                  <td className="px-3 py-2 text-xs">{institution?.name ?? "—"}</td>
                  <td className="px-3 py-2 text-xs">
                    {raw.amount} {raw.currency}
                  </td>
                  <td className="px-3 py-2 text-xs capitalize">{raw.status}</td>
                </tr>
              );
            })}

            {invoices.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-slate-500">
                  No invoices yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
