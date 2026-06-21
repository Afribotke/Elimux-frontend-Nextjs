import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getInstitution(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/institution/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return await res.json();
}

export async function generateMetadata({ params }: any) {
  const data = await getInstitution(params.id);

  if (!data?.institution) {
    return { title: "Institution Not Found | ElimuX" };
  }

  return {
    title: `${data.institution.name} | ElimuX`,
    description: data.institution.description || "Explore institution details on ElimuX.",
  };
}

export default async function InstitutionPage({ params }: any) {
  const data = await getInstitution(params.id);

  if (!data?.institution) return notFound();

  const inst = data.institution;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold">{inst.name}</h1>

      <p className="text-gray-600">{inst.description}</p>

      <div className="bg-white shadow rounded-lg p-4 space-y-2">
        <p><strong>Country:</strong> {inst.country || "N/A"}</p>
        <p><strong>City:</strong> {inst.city || "N/A"}</p>
        <p><strong>Website:</strong> {inst.website || "N/A"}</p>
      </div>

      {data.programs.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Programs</h2>
          <div className="space-y-3">
            {data.programs.map((p: any) => (
              <Link
                key={p.id}
                href={`/program/${p.id}`}
                className="block bg-white shadow rounded p-4"
              >
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-600">{p.level}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {data.exams.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Exams</h2>
          <div className="space-y-3">
            {data.exams.map((e: any) => (
              <Link
                key={e.id}
                href={`/exam/${e.id}`}
                className="block bg-white shadow rounded p-4"
              >
                <h3 className="font-semibold">{e.title}</h3>
                <p className="text-sm text-gray-600">{e.exam_type}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/discover" className="block text-center text-blue-600 font-medium mt-6">
        ← Back to Discover
      </Link>
    </div>
  );
}