import { revalidatePath } from "next/cache";

async function getInstitutions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/institutions`, {
    cache: "no-store",
  });
  const data = await res.json();
  return Array.isArray(data) ? data : data.raw ?? [];
}

async function createInstitution(formData: FormData) {
  "use server";

  const body = {
    name: formData.get("name"),
    country: formData.get("country"),
    city: formData.get("city"),
    website: formData.get("website"),
  };

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/admin/institutions`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  revalidatePath("/admin/institutions");
}

export default async function InstitutionsPage() {
  const institutions = await getInstitutions();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-800">Institutions</h1>

      <form
        action={createInstitution}
        className="rounded-lg border bg-white p-4 grid gap-3 md:grid-cols-4"
      >
        <input name="name" placeholder="Name" required className="border rounded px-3 py-2 text-sm" />
        <input name="country" placeholder="Country" className="border rounded px-3 py-2 text-sm" />
        <input name="city" placeholder="City" className="border rounded px-3 py-2 text-sm" />
        <input name="website" placeholder="Website" className="border rounded px-3 py-2 text-sm" />
        <button type="submit" className="col-span-full md:col-span-1 bg-slate-900 text-white px-3 py-2 rounded text-sm">
          Add Institution
        </button>
      </form>

      <div className="rounded-lg border bg-white overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Country</th>
              <th className="px-3 py-2 text-left">City</th>
              <th className="px-3 py-2 text-left">Website</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((inst: any) => (
              <tr key={inst.id} className="border-b">
                <td className="px-3 py-2">{inst.name}</td>
                <td className="px-3 py-2">{inst.country}</td>
                <td className="px-3 py-2">{inst.city}</td>
                <td className="px-3 py-2 text-sky-600 text-xs">{inst.website}</td>
              </tr>
            ))}
            {institutions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-3 py-6 text-center text-slate-500">
                  No institutions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
