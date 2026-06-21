import Link from "next/link";

export const dynamic = "force-dynamic";

async function searchItems(query: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const programRes = await fetch(`${base}/api/search/programs?q=${query}`, { cache: "no-store" });
  const examRes = await fetch(`${base}/api/search/exams?q=${query}`, { cache: "no-store" });

  const programs = programRes.ok ? await programRes.json() : [];
  const exams = examRes.ok ? await examRes.json() : [];

  return {
    programs: programs?.data || [],
    exams: exams?.data || [],
  };
}

export default async function DiscoverPage({ searchParams }: any) {
  const q = searchParams?.q || "";
  const { programs, exams } = q ? await searchItems(q) : { programs: [], exams: [] };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Discover</h1>

      <form className="mb-6">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search programs or exams..."
          className="w-full border rounded px-3 py-2"
        />
      </form>

      {q && (
        <p className="text-gray-600 mb-4">
          Showing results for: <strong>{q}</strong>
        </p>
      )}

      <div className="space-y-6">
        {programs.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Programs</h2>
            <div className="space-y-3">
              {programs.map((p: any) => (
                <Link
                  key={p.id}
                  href={`/program/${p.id}`}
                  className="block bg-white shadow rounded p-4"
                >
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.institution_name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {exams.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Exams</h2>
            <div className="space-y-3">
              {exams.map((e: any) => (
                <Link
                  key={e.id}
                  href={`/exam/${e.id}`}
                  className="block bg-white shadow rounded p-4"
                >
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="text-sm text-gray-600">{e.institution_name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {q && programs.length === 0 && exams.length === 0 && (
          <p className="text-gray-500 text-center">No results found.</p>
        )}
      </div>
    </div>
  );
}

