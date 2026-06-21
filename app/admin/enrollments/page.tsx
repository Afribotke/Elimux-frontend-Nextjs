import { EnrollmentsHeader } from "@/components/admin/enrollments/enrollments-header";
import { StatsCards } from "@/components/admin/stats-cards";
import { EnrollmentTable } from "@/components/admin/enrollments/EnrollmentTable";

const mockEnrollments = [
  {
    id: "1",
    studentId: "1",
    studentName: "Elijah Kiptoo",
    programId: "1",
    programName: "Diploma in Information Technology",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    status: "active",
    startDate: "2024-01-15",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Mary Wanjiku",
    programId: "2",
    programName: "Certificate in Business Management",
    institutionId: "2",
    institutionName: "Mombasa College",
    status: "pending",
    startDate: "2024-02-20",
    createdAt: "2024-02-14",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Brian Odhiambo",
    programId: "3",
    programName: "Degree in Software Engineering",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    status: "completed",
    startDate: "2023-09-01",
    createdAt: "2023-08-20",
  },
];

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6">
      <EnrollmentsHeader total={mockEnrollments.length} />

      <StatsCards
        items={[
          { label: "Total Enrollments", value: mockEnrollments.length },
          { label: "Active", value: 1 },
          { label: "Pending", value: 1 },
          { label: "Completed", value: 1 },
        ]}
      />

      <EnrollmentTable enrollments={mockEnrollments} />
    </div>
  );
}



