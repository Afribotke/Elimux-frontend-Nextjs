import { adminClient } from "../adminClient";

export async function getAdminUsers() {
  const { data, error } = await adminClient
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getAdminUsers error:", error);
    return [];
  }

  return data;
}
