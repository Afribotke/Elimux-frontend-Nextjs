import { getTeacher } from "@/lib/teachers/api";

export const TeacherCard = async ({ id }: { id: string }) => {
  const teacher = await getTeacher(id);

  return (
    <div className="p-6 bg-white rounded shadow w-96">
      <h2 className="text-xl font-bold mb-2">{teacher.name}</h2>
      <p className="text-gray-700 mb-1">Email: {teacher.email}</p>
      <p className="text-gray-700 mb-1">Phone: {teacher.phone}</p>
      <p className="text-gray-700">Subject: {teacher.subject}</p>
    </div>
  );
};
