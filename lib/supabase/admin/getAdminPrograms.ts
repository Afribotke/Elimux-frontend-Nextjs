import { adminClient } from "../adminClient";

export async function getAdminPrograms() {
  const { data, error } = await adminClient
    .from("programs")
    .select("*, institutions(name)")
    .order("name");

  if (error) {
    console.error("Supabase getAdminPrograms error:", error);
    return [];
  }

  return data;
}



