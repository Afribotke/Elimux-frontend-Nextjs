import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { Student } from "./types";

export const getStudents = async (): Promise<Student[]> => {
  return apiClient(\\\);
};

export const getStudent = async (id: string): Promise<Student> => {
  return apiClient(\\/\\);
};

export const createStudent = async (data: Student) => {
  return apiClient(ENDPOINTS.STUDENTS, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
