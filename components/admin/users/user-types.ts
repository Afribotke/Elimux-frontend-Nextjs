export type UserStatus = "active" | "suspended" | "pending" | string;

export type UserRole = "admin" | "staff" | "student" | string;

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  institution?: string | null;
}