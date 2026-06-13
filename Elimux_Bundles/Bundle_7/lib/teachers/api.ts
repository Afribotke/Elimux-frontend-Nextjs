import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { Teacher } from "./types";

export const getTeachers = async (): Promise<Teacher[]> => {
  return apiClient(\\\);
};

export const getTeacher = async (id: string): Promise<Teacher> => {
  return apiClient(\\/\\);
};

export const createTeacher = async (data: Teacher) => {
  return apiClient(ENDPOINTS.TEACHERS, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
