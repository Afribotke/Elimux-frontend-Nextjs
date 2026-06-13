import { ENDPOINTS } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/client";

export const apiLogin = (data: { email: string; password: string }) =>
  apiClient(ENDPOINTS.AUTH_LOGIN, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const apiRegister = (data: { name: string; email: string; password: string }) =>
  apiClient(ENDPOINTS.AUTH_REGISTER, {
    method: "POST",
    body: JSON.stringify(data),
  });
