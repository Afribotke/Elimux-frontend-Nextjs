async function getCounts() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const [inst, prog, stud, apps] = await Promise.all([
    fetch(`${base}/api/admin/institutions`, { cache: "no-store" }),
    fetch(`${base}/api/admin/programs`, { cache: "no-store" }),
    fetch(`${base}/api/admin/students`, { cache: "no-store" }),
    fetch(`${base}/api/admin/applications`, { cache: "no-store" }),
  ]);

  const institutions = await inst.json();
  const programs = await prog.json();
  const students = await stud.json();
  const applications = await apps.json();

  return {
    institutions: Array.isArray(institutions) ? institutions.length : 0,
    programs: Array.isArray(programs) ? programs.length : 0,
    students: Array.isArray(students) ? students.length : 0,
    applications: Array.isArray(applications) ? applications.length : 0,
  };
}

export default async function AdminHomePage() {
  const counts = await getCounts();

  const cards = [
    { label: "Institutions", value: counts.institutions },
    { label: "Programs", value: counts.programs },
    { label: "Students", value: counts.students },
    { label: "Applications", value: counts.applications },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-slate-800">Overview</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border bg-white px-4 py-3 flex flex-col gap-1"
          >
            <div className="text-xs uppercase tracking-wide text-slate-500">
              {card.label}
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {card.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
