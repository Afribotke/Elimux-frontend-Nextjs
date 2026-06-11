import { createClient } from '@supabase/supabase-js';

export default async function ProgramsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: programs, error } = await supabase
    .from('programs')
    .select('*');

  if (error) {
    return <div>Error loading programs: {error.message}</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Programs</h1>

      <table className="min-w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {programs?.map((program) => (
            <tr key={program.id} className="border-b">
              <td className="p-2">{program.id}</td>
              <td className="p-2">{program.name}</td>
              <td className="p-2">{program.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
