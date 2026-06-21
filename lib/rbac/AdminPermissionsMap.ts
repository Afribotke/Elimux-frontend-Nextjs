import { AdminRole } from "./AdminRoleTypes";

export type Permission =
  | "manage_users"
  | "manage_institutions"
  | "manage_programs"
  | "manage_countries"
  | "view_logs"
  | "manage_settings";

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  superadmin: [
    "manage_users",
    "manage_institutions",
    "manage_programs",
    "manage_countries",
    "view_logs",
    "manage_settings"
  ],

  admin: [
    "manage_users",
    "manage_institutions",
    "manage_programs",
    "manage_countries",
    "view_logs"
  ],

  editor: [
    "manage_institutions",
    "manage_programs"
  ],

  viewer: []
};



