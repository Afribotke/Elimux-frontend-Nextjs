import Link from "next/link";
import { getTeachers } from "@/lib/teachers/api";

export const TeacherList = async () => {
  const teachers = await getTeachers();

  return (
    <div className="space-y-3">
      {teachers.map((t) => (
        <Link
          key={t.id}
          href={\/dashboard/teachers/\\}
          className="block p-4 bg-white rounded shadow hover:bg-gray-50"
        >
          <p className="font-semibold">{t.name}</p>
          <p className="text-sm text-gray-600">{t.email}</p>
        </Link>
      ))}
    </div>
  );
};
