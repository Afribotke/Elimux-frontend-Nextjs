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
import { getSupabaseClient } from "@/lib/supabase/client";

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
  const [role, setRole] = useState<UserRole>("viewer");

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getUser().then(({ data: { user } }) => {
      const userRole = user?.user_metadata?.role as UserRole | undefined;
      if (userRole && ROLE_HIERARCHY.includes(userRole)) {
        setRole(userRole);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const userRole = session?.user?.user_metadata?.role as UserRole | undefined;
        setRole(userRole && ROLE_HIERARCHY.includes(userRole) ? userRole : "viewer");
      }
    );

    return () => subscription.unsubscribe();
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



