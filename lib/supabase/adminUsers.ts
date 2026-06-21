import { adminClient } from "./adminClient";

export async function getAdminUsers() {
  const { data, error } = await adminClient
    .from("users")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}
