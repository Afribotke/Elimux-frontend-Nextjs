import { cookies } from "next/headers";
import { adminClient } from "@/lib/supabase/adminClient";
import { AdminRole } from "./AdminRoleTypes";

export async function requireAdminRole(required: AdminRole[]) {
  const token = cookies().get("sb-access-token")?.value;

  if (!token) return null;

  const { data: user, error } = await adminClient.auth.getUser(token);

  if (error || !user) return null;

  const role = user.user_metadata?.role as AdminRole;

  if (!required.includes(role)) return null;

  return user;
}

