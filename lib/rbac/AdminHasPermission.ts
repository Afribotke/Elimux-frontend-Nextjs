import { ROLE_PERMISSIONS, Permission } from "./AdminPermissionsMap";
import { AdminRole } from "./AdminRoleTypes";

export function adminHasPermission(role: AdminRole, permission: Permission) {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}



