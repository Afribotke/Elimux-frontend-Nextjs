export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
