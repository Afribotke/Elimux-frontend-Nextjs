import { fetchPrograms } from "@/lib/api";

export async function ProgramsPage({ params }: { params: { id: string } }) {
  const programs = await fetchPrograms(params.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Programs</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Program Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {programs?.map((program: any) => (
            <tr key={program.id}>
              <td className="border px-4 py-2">{program.name}</td>
              <td className="border px-4 py-2">{program.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Welcome to Elimux</h1>
    </main>
  );
}
