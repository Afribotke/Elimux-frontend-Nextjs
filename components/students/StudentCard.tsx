import { getStudent } from "@/lib/students/api";

export const StudentCard = async ({ id }: { id: string }) => {
  const student = await getStudent(id);

  return (
    <div className="p-6 bg-white rounded shadow w-96">
      <h2 className="text-xl font-bold mb-2">{student.name}</h2>
      <p className="text-gray-700 mb-1">Email: {student.email}</p>
      <p className="text-gray-700 mb-1">Phone: {student.phone}</p>
      <p className="text-gray-700">Class: {student.className}</p>
    </div>
  );
};
