import Link from "next/link";
import { getClasses } from "@/lib/classes/api";

export const ClassList = async () => {
  const classes = await getClasses();

  return (
    <div className="space-y-3">
      {classes.map((c) => (
        <Link
          key={c.id}
          href={\/dashboard/classes/\\}
          className="block p-4 bg-white rounded shadow hover:bg-gray-50"
        >
          <p className="font-semibold">{c.name}</p>
          <p className="text-sm text-gray-600">Students: {c.studentCount}</p>
        </Link>
      ))}
    </div>
  );
};
