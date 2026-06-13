import { getClass } from "@/lib/classes/api";

export const ClassCard = async ({ id }: { id: string }) => {
  const classData = await getClass(id);

  return (
    <div className="p-6 bg-white rounded shadow w-96">
      <h2 className="text-xl font-bold mb-2">{classData.name}</h2>
      <p className="text-gray-700 mb-1">Teacher: {classData.teacher}</p>
      <p className="text-gray-700">Students: {classData.studentCount}</p>
    </div>
  );
};
