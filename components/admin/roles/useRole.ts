"use client";

import { useState, useEffect } from "react";
import {
  UserRole,
  ROLE_PERMISSIONS,
  ROLE_HIERARCHY,
} from "./role-types";
import {
  canView,
  canEdit,
  canDelete,
  canManageStaff,
  canManageInstitution,
  canManagePayments,
  canManageEnrollments,
  hasAtLeastRole,
} from "./permissions";

interface UseRoleResult {
  role: UserRole;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManageStaff: boolean;
  canManageInstitution: boolean;
  canManagePayments: boolean;
  canManageEnrollments: boolean;
  hasAtLeast: (minimum: UserRole) => boolean;
}

export function useRole(): UseRoleResult {
  // In real implementation, this will come from auth/session
  const [role, setRole] = useState<UserRole>("viewer");

  useEffect(() => {
    // TODO: Replace with actual auth provider
    const stored = localStorage.getItem("user-role") as UserRole | null;
    if (stored && ROLE_HIERARCHY.includes(stored)) {
      setRole(stored);
    }
  }, []);

  return {
    role,
    canView: canView(role),
    canEdit: canEdit(role),
    canDelete: canDelete(role),
    canManageStaff: canManageStaff(role),
    canManageInstitution: canManageInstitution(role),
    canManagePayments: canManagePayments(role),
    canManageEnrollments: canManageEnrollments(role),
    hasAtLeast: (minimum: UserRole) => hasAtLeastRole(role, minimum),
  };
}
