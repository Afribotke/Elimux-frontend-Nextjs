import { StudentsHeader } from "@/components/admin/students/students-header";
import { StatsCards } from "@/components/admin/stats-cards";
import { StudentTable } from "@/components/admin/students/StudentTable";

const mockStudents = [
  {
    id: "1",
    firstName: "Elijah",
    lastName: "Kiptoo",
    email: "elijah.kiptoo@example.com",
    phone: "+254712345678",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    programId: "1",
    programName: "Diploma in Information Technology",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    firstName: "Mary",
    lastName: "Wanjiku",
    email: "mary.wanjiku@example.com",
    phone: "+254798765432",
    institutionId: "2",
    institutionName: "Mombasa College",
    programId: "2",
    programName: "Certificate in Business Management",
    status: "pending",
    createdAt: "2024-02-14",
  },
  {
    id: "3",
    firstName: "Brian",
    lastName: "Odhiambo",
    email: "brian.odhiambo@example.com",
    phone: "+254701234567",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    programId: "3",
    programName: "Degree in Software Engineering",
    status: "inactive",
    createdAt: "2024-03-01",
  },
];

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <StudentsHeader total={mockStudents.length} />

      <StatsCards
        items={[
          { label: "Total Students", value: mockStudents.length },
          { label: "Active", value: 1 },
          { label: "Pending", value: 1 },
          { label: "Inactive", value: 1 },
        ]}
      />

      <StudentTable students={mockStudents} />
    </div>
  );
}
