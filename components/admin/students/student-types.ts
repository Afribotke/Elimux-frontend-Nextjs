export type StudentStatus = 
  | "active"
  | "inactive"
  | "suspended"
  | "graduated"
  | "pending"
  | string;

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;

  institutionId: string;
  institutionName: string;

  programId: string;
  programName: string;

  courseIds?: string[];
  courseNames?: string[];

  status: StudentStatus;

  createdAt: string;
  updatedAt?: string | null;
}

