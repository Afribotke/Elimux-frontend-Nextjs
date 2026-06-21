export type InstitutionStatus = "active" | "inactive" | "pending" | string;

export interface Institution {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  type: string;
  status: InstitutionStatus;
  createdAt: string;
  adminName?: string | null;
}

