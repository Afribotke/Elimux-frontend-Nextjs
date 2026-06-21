import { revalidatePath } from "next/cache";

async function getPrograms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/programs`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  return data;
}

async function getInstitutions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/institutions`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.raw)) return data.raw;
  return [];
}

async function createProgram(formData: FormData) {
  "use server";

  const body = {
    institution_id: formData.get("institution_id"),
    name: formData.get("name"),
    category: formData.get("category"),
    duration_months: Number(formData.get("duration_months") || 0),
    tuition_fee: Number(formData.get("tuition_fee") || 0),
    currency: formData.get("currency") || "KES",
  };

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/programs`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/admin/programs");
}

export default async function ProgramsPage() {
  const [programs, institutions] = await Promise.all([
    getPrograms(),
    getInstitutions(),
  ]);

  const rows = Array.isArray(programs)
    ? programs
    : (programs || []).map((p: any) => p);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-800">Programs</h1>
        <p className="text-sm text-slate-500">
          Manage academic programs across institutions.
        </p>
      </div>

      <form
        action={createProgram}
        className="rounded-lg border bg-white p-4 grid gap-3 md:grid-cols-6"
      >
        <select
          name="institution_id"
          required
          className="border rounded px-3 py-2 text-sm w-full"
        >
          <option value="">Select institution</option>
          {institutions.map((inst: any) => (
            <option key={inst.id} value={inst.id}>
              {inst.name}
            </option>
          ))}
        </select>
        <input
          name="name"
          placeholder="Program name"
          required
          className="border rounded px-3 py-2 text-sm w-full"
        />
        <input
          name="category"
          placeholder="Category (e.g. Degree)"
          className="border rounded px-3 py-2 text-sm w-full"
        />
        <input
          name="duration_months"
          placeholder="Duration (months)"
          type="number"
          className="border rounded px-3 py-2 text-sm w-full"
        />
        <input
          name="tuition_fee"
          placeholder="Tuition fee"
          type="number"
          className="border rounded px-3 py-2 text-sm w-full"
        />
        <input
          name="currency"
          placeholder="Currency"
          defaultValue="KES"
          className="border rounded px-3 py-2 text-sm w-full"
        />
        <button
          type="submit"
          className="mt-2 md:mt-0 col-span-full md:col-span-2 inline-flex items-center justify-center rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add Program
        </button>
      </form>

      <div className="rounded-lg border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Program
              </th>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Institution
              </th>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Category
              </th>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Duration
              </th>
              <th className="px-3 py-2 text-left font-medium text-slate-600">
                Tuition
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any) => {
              const raw = row.raw ?? row;
              const inst = row.expanded?.institution ?? row.institutions;
              return (
                <tr key={raw.id} className="border-b last:border-0">
                  <td className="px-3 py-2">{raw.name}</td>
                  <td className="px-3 py-2 text-xs text-slate-700">
                    {inst?.name ?? "—"}
                  </td>
                  <td className="px-3 py-2">{raw.category}</td>
                  <td className="px-3 py-2">
                    {raw.duration_months ? `${raw.duration_months} months` : "—"}
                  </td>
                  <td className="px-3 py-2">
                    {raw.tuition_fee
                      ? `${raw.tuition_fee} ${raw.currency ?? "KES"}`
                      : "—"}
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-sm text-slate-500"
                >
                  No programs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
