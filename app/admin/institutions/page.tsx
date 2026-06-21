import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamic = "force-dynamic";

export default async function AdminInstitutionsPage() {
  const supabase = createServerComponentClient({ cookies });

  const { data: institutions } = await supabase
    .from("institutions")
    .select("id, name, country, city")
    .order("name");

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Institutions</h2>

      <div className="bg-white shadow rounded-lg divide-y">
        {institutions?.map((inst) => (
          <div key={inst.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{inst.name}</div>
              <div className="text-sm text-gray-600">
                {inst.city}, {inst.country}
              </div>
            </div>
            <Link
              href={`/institution/${inst.id}`}
              className="text-sm text-blue-600 font-medium"
            >
              View
            </Link>
          </div>
        )) || (
          <div className="px-4 py-3 text-gray-500">No institutions found.</div>
        )}
      </div>
    </div>
  );
}