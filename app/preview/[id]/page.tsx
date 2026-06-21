import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getProgramOrExam(id: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const programRes = await fetch(`${base}/api/program/${id}`, { cache: "no-store" });
  const examRes = await fetch(`${base}/api/exam/${id}`, { cache: "no-store" });

  const programJson = programRes.ok ? await programRes.json() : null;
  const examJson = examRes.ok ? await examRes.json() : null;

  return programJson?.program || examJson?.exam || null;
}

export async function generateMetadata({ params }: any) {
  const item = await getProgramOrExam(params.id);

  if (!item) {
    return {
      title: "Not Found | ElimuX",
    };
  }

  return {
    title: `${item.title} | ElimuX`,
    description: item.description || "Explore details on ElimuX.",
  };
}

export default async function PreviewPage({ params }: any) {
  const item = await getProgramOrExam(params.id);

  if (!item) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      <p className="text-gray-700 mb-6">{item.description}</p>

      <div className="bg-white shadow rounded-lg p-4 space-y-2 text-sm">
        {item.institution_name && (
          <p><strong>Institution:</strong> {item.institution_name}</p>
        )}
        {item.level && <p><strong>Level:</strong> {item.level}</p>}
        {item.duration && <p><strong>Duration:</strong> {item.duration}</p>}
        {item.study_mode && <p><strong>Study Mode:</strong> {item.study_mode}</p>}
        {item.fees && <p><strong>Fees:</strong> KES {item.fees}</p>}
        {item.exam_type && <p><strong>Exam Type:</strong> {item.exam_type}</p>}
        {item.exam_date && <p><strong>Exam Date:</strong> {item.exam_date}</p>}
        {item.country && <p><strong>Country:</strong> {item.country}</p>}
      </div>

      <p className="text-center text-gray-500 mt-10 text-sm">
        Shared via ElimuX
      </p>
    </div>
  );
}