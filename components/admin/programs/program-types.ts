export type ProgramStatus = "active" | "inactive" | "draft" | "archived" | string;

export interface Program {
  id: string;
  name: string;
  code?: string | null;
  institutionId: string;
  institutionName: string;
  level: string; // e.g., Diploma, Certificate, Degree
  status: ProgramStatus;
  createdAt: string;
  updatedAt?: string | null;
}



