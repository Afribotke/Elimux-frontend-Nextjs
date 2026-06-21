import { adminClient } from "./adminClient";

export async function getAdminLogs() {
  const { data, error } = await adminClient
    .from("logs")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}

