import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getProgram(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/program/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return await res.json();
}

export default async function ApplyPage({ params }: any) {
  const data = await getProgram(params.programId);

  if (!data?.program) return notFound();

  const program = data.program;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">Apply to {program.title}</h1>

      <p className="text-gray-600">{program.description}</p>

      <form
        action="/api/applications/create"
        method="POST"
        className="space-y-4 bg-white shadow rounded p-4"
      >
        <input type="hidden" name="program_id" value={program.id} />

        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="full_name"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-medium"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}