import { adminClient } from "./adminClient";

export async function getAdminPrograms() {
  const { data, error } = await adminClient
    .from("programs")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}

