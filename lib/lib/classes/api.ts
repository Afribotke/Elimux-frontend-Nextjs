import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ClassItem } from "./types";

export const getClasses = async (): Promise<ClassItem[]> => {
  return apiClient(\\\);
};

export const getClass = async (id: string): Promise<ClassItem> => {
  return apiClient(\\/\\);
};

export const createClass = async (data: ClassItem) => {
  return apiClient(ENDPOINTS.CLASSES, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
