"use client";

import { ReactNode } from "react";
import { useRole } from "./useRole";
import { UserRole } from "./role-types";

interface RoleGuardProps {
  minimumRole: UserRole;
  children: ReactNode;
  fallback?: ReactNode;
}

export function withRoleGuard(
  Component: React.ComponentType<any>,
  minimumRole: UserRole,
  fallback?: ReactNode
) {
  return function RoleGuardedComponent(props: any) {
    const { hasAtLeast, role } = useRole();

    if (!hasAtLeast(minimumRole)) {
      return (
        fallback || (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-lg font-semibold text-slate-800">
              Access Denied
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Your role ({role}) does not have permission to view this page.
            </p>
          </div>
        )
      );
    }

    return <Component {...props} />;
  };
}

