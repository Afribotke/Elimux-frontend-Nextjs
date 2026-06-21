import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: programs } = await supabase
    .from("programs")
    .select("id, title, level, institutions(name)")
    .order("title");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Programs</h2>

      <div className="bg-white shadow rounded-lg divide-y">
        {programs?.map((p) => (
          <div key={p.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-600">
                {p.level} · {p.institutions?.name}
              </div>
            </div>
            <Link
              href={`/program/${p.id}`}
              className="text-sm text-blue-600 font-medium"
            >
              View
            </Link>
          </div>
        )) || (
          <div className="px-4 py-3 text-gray-500">No programs found.</div>
        )}
      </div>
    </div>
  );
}

