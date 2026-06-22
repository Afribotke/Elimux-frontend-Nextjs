import CoursesHeader from "./CoursesHeader";
import { StatsCards } from "@/components/admin/stats-cards";
import { CourseTable } from "@/components/admin/courses/CourseTable";

const mockCourses = [
  {
    id: "1",
    name: "Introduction to Programming",
    code: "CS-101",
    programId: "1",
    programName: "Diploma in Information Technology",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    level: "certificate",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Business Communication",
    code: "BM-202",
    programId: "2",
    programName: "Certificate in Business Management",
    institutionId: "2",
    institutionName: "Mombasa College",
    level: "certificate",
    status: "pending",
    createdAt: "2024-02-14",
  },
  {
    id: "3",
    name: "Software Engineering Principles",
    code: "SE-301",
    programId: "1",
    programName: "Degree in Software Engineering",
    institutionId: "1",
    institutionName: "Nairobi Technical University",
    level: "degree",
    status: "inactive",
    createdAt: "2024-03-01",
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <CoursesHeader total={mockCourses.length} />

      <StatsCards
        items={[
          { label: "Total Courses", value: mockCourses.length },
          { label: "Active", value: 1 },
          { label: "Pending", value: 1 },
          { label: "Inactive", value: 1 },
        ]}
      />

      <CourseTable courses={mockCourses} />
    </div>
  );
}





