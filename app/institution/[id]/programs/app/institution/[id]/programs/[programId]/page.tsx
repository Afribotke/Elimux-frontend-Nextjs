import { createClient } from "@supabase/supabase-js";

interface Props {
  params: { id: string; programId: string };
}

export default async function ProgramDetails({ params }: Props) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch the specific program
  const { data: program, error } = await supabase
    .from("programs")
    .select("*")
    .eq("id", params.programId)
    .single();

  if (error || !program) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Program Details</h1>
        <p className="text-red-600">Program not found.</p>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{program.name}</h1>

      <p className="text-gray-700">{program.description}</p>

      <div className="p-4 border rounded-lg">
        <p><strong>Institution ID:</strong> {params.id}</p>
        <p><strong>Program ID:</strong> {params.programId}</p>
      </div>
    </main>
  );
}
