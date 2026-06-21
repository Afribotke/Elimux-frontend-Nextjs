import { adminClient } from "../adminClient";

export async function getAdminLogs() {
  const { data, error } = await adminClient
    .from("logs")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) {
    console.error("Supabase getAdminLogs error:", error);
    return [];
  }

  return data;
}



