import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const CATEGORY_MAP: Record<string, string[]> = {
  stem: ["science", "engineering", "technology", "mathematics", "physics", "chemistry", "biology"],
  business: ["business", "commerce", "accounting", "finance", "marketing", "entrepreneurship"],
  medicine: ["medicine", "nursing", "pharmacy", "clinical", "health", "medical"],
  ict: ["ict", "computer", "software", "programming", "information technology"],
  arts: ["arts", "design", "music", "creative", "media"],
};

async function searchCategory(keywords: string[]) {
  const q = keywords.join(" ");

  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const programRes = await fetch(`${base}/api/search/programs?q=${q}`, { cache: "no-store" });
  const examRes = await fetch(`${base}/api/search/exams?q=${q}`, { cache: "no-store" });

  const programs = programRes.ok ? await programRes.json() : [];
  const exams = examRes.ok ? await examRes.json() : [];

  return {
    programs: programs?.data || [],
    exams: exams?.data || [],
  };
}

export async function generateMetadata({ params }: any) {
  const slug = params.slug.toLowerCase();
  const keywords = CATEGORY_MAP[slug];

  if (!keywords) {
    return { title: "Category Not Found | ElimuX" };
  }

  return {
    title: `${slug.toUpperCase()} Programs & Exams | ElimuX`,
    description: `Explore ${slug} programs and exams on ElimuX.`,
  };
}

export default async function CategoryPage({ params }: any) {
  const slug = params.slug.toLowerCase();
  const keywords = CATEGORY_MAP[slug];

  if (!keywords) return notFound();

  const { programs, exams } = await searchCategory(keywords);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">{slug.toUpperCase()}</h1>

      <p className="text-gray-600 mb-6">
        Showing programs and exams related to <strong>{slug}</strong>.
      </p>

      {programs.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Programs</h2>
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
          <h2 className="text-xl font-semibold mb-2">Exams</h2>
          <div className="space-y-3">
            {exams.map((e: any) => (
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

      {programs.length === 0 && exams.length === 0 && (
        <p className="text-gray-500 text-center">No results found.</p>
      )}

      <Link href="/discover" className="block text-center text-blue-600 font-medium mt-6">
        ← Back to Discover
      </Link>
    </div>
  );
}