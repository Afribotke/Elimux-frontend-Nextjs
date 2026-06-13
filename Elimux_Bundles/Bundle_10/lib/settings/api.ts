import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { ProfileSettings } from "./types";

export const updateProfile = async (data: ProfileSettings) => {
  return apiClient(\\/profile\, {
    method: "POST",
    body: JSON.stringify(data),
  });
};
