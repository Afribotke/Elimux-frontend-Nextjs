import Link from "next/link";
import { getStudents } from "@/lib/students/api";

export const StudentList = async () => {
  const students = await getStudents();

  return (
    <div className="space-y-3">
      {students.map((s) => (
        <Link
          key={s.id}
          href={\/dashboard/students/\\}
          className="block p-4 bg-white rounded shadow hover:bg-gray-50"
        >
          <p className="font-semibold">{s.name}</p>
          <p className="text-sm text-gray-600">{s.email}</p>
        </Link>
      ))}
    </div>
  );
};
