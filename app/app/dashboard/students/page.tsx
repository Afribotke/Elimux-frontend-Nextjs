import { StudentList } from "@/components/students/StudentList";

export default function StudentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <StudentList />
    </div>
  );
}
