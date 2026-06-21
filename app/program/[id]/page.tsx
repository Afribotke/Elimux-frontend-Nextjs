import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getProgram(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/program/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json.program;
}

export async function generateMetadata({ params }: any) {
  const program = await getProgram(params.id);

  if (!program) {
    return {
      title: "Program Not Found | ElimuX",
    };
  }

  return {
    title: `${program.title} | ElimuX`,
    description: program.description || "Explore program details on ElimuX.",
  };
}

export default async function ProgramPage({ params }: any) {
  const program = await getProgram(params.id);

  if (!program) return notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/preview/${program.id}`;
  const encodedTitle = encodeURIComponent(program.title);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">{program.title}</h1>

      <p className="text-gray-600 mb-4">{program.description}</p>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Program Details</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Institution:</strong> {program.institution_name || "N/A"}</p>
          <p><strong>Level:</strong> {program.level || "N/A"}</p>
          <p><strong>Duration:</strong> {program.duration || "N/A"}</p>
          <p><strong>Study Mode:</strong> {program.study_mode || "N/A"}</p>
          <p><strong>Tuition Fees:</strong> {program.fees ? `KES ${program.fees}` : "N/A"}</p>
          <p><strong>Country:</strong> {program.country || "N/A"}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Share This Program</h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <Link
            href={`https://wa.me/?text=${encodedTitle}%0A${shareUrl}`}
            target="_blank"
            className="bg-green-600 text-white text-center py-2 rounded"
          >
            WhatsApp
          </Link>

          <Link
            href={`sms:?body=${encodedTitle}%0A${shareUrl}`}
            className="bg-blue-600 text-white text-center py-2 rounded"
          >
            SMS
          </Link>

          <Link
            href={`mailto:?subject=${encodedTitle}&body=${shareUrl}`}
            className="bg-gray-700 text-white text-center py-2 rounded"
          >
            Email
          </Link>

          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="bg-black text-white text-center py-2 rounded"
          >
            Copy Link
          </button>
        </div>
      </div>

      <Link
        href="/discover"
        className="block text-center text-blue-600 font-medium mt-6"
      >
        ← Back to Discover
      </Link>
    </div>
  );
}