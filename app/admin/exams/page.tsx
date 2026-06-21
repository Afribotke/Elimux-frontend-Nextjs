import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export default async function AdminExamsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: exams } = await supabase
    .from("exams")
    .select("id, title, exam_type, institutions(name)")
    .order("title");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Exams</h2>

      <div className="bg-white shadow rounded-lg divide-y">
        {exams?.map((e) => (
          <div key={e.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{e.title}</div>
              <div className="text-sm text-gray-600">
                {e.exam_type} · {e.institutions?.name}
              </div>
            </div>
            <Link
              href={`/exam/${e.id}`}
              className="text-sm text-blue-600 font-medium"
            >
              View
            </Link>
          </div>
        )) || (
          <div className="px-4 py-3 text-gray-500">No exams found.</div>
        )}
      </div>
    </div>
  );
}
