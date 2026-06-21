export type CourseStatus = "active" | "inactive" | "draft" | "archived" | string;

export interface Course {
  id: string;
  name: string;
  code?: string | null;
  programId: string;
  programName: string;
  institutionId: string;
  institutionName: string;
  level: string; // e.g., Certificate, Diploma, Degree
  status: CourseStatus;
  createdAt: string;
  updatedAt?: string | null;
}

