import { UserRole, ROLE_HIERARCHY, ROLE_PERMISSIONS } from "./role-types";

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return userRole === requiredRole;
}

export function hasAtLeastRole(userRole: UserRole, minimumRole: UserRole): boolean {
  const userIndex = ROLE_HIERARCHY.indexOf(userRole);
  const requiredIndex = ROLE_HIERARCHY.indexOf(minimumRole);
  return userIndex >= requiredIndex;
}

export function can(userRole: UserRole, action: keyof typeof ROLE_PERMISSIONS["viewer"]): boolean {
  return ROLE_PERMISSIONS[userRole][action];
}

export function canView(role: UserRole): boolean {
  return can(role, "canView");
}

export function canEdit(role: UserRole): boolean {
  return can(role, "canEdit");
}

export function canDelete(role: UserRole): boolean {
  return can(role, "canDelete");
}

export function canManageStaff(role: UserRole): boolean {
  return can(role, "canManageStaff");
}

export function canManageInstitution(role: UserRole): boolean {
  return can(role, "canManageInstitution");
}

export function canManagePayments(role: UserRole): boolean {
  return can(role, "canManagePayments");
}

export function canManageEnrollments(role: UserRole): boolean {
  return can(role, "canManageEnrollments");
}
