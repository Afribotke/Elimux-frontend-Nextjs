export type EnrollmentStatus =
  | "active"
  | "completed"
  | "dropped"
  | "pending"
  | "suspended"
  | string;

export interface Enrollment {
  id: string;

  studentId: string;
  studentName: string;

  programId: string;
  programName: string;

  courseIds?: string[];
  courseNames?: string[];

  institutionId: string;
  institutionName: string;

  status: EnrollmentStatus;

  startDate: string;
  endDate?: string | null;

  createdAt: string;
  updatedAt?: string | null;
}

