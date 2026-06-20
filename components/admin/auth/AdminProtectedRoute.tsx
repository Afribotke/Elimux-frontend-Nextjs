"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type AdminProtectedRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
};

export default function AdminProtectedRoute({
  isAuthenticated,
  children
}: AdminProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/access-denied");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
