import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export default async function StudentApplicationsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: apps } = await supabase
    .from("applications")
    .select("id, program_id, full_name, status, programs(title)")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold">My Applications</h1>

      {apps?.length === 0 && (
        <p className="text-gray-500">You have not submitted any applications yet.</p>
      )}

      <div className="space-y-3">
        {apps?.map((app: any) => (
          <Link
            key={app.id}
            href={`/program/${app.program_id}`}
            className="block bg-white shadow rounded p-4"
          >
            <h3 className="font-semibold">{app.programs?.title}</h3>
            <p className="text-sm text-gray-600">Status: {app.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}



