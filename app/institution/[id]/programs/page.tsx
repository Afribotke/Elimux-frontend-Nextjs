import { createClient } from "@supabase/supabase-js";

interface Props {
  params: { id: string };
}

export default async function InstitutionPrograms({ params }: Props) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch programs for this institution
  const { data: programs, error } = await supabase
    .from("programs")
    .select("*")
    .eq("institution_id", params.id);

  if (error) {
    console.error(error);
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Programs for Institution: {params.id}
        </h1>
        <p className="text-red-600">Failed to load programs.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Programs for Institution: {params.id}
      </h1>

      {programs?.length === 0 && (
        <p className="text-gray-600">No programs found for this institution.</p>
      )}

      <ul className="space-y-4">
        {programs?.map((program) => (
          <li
            key={program.id}
            className="p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">{program.name}</h2>
            <p className="text-gray-600">{program.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
