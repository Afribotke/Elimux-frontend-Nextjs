import { adminClient } from "../adminClient";

export async function getAdminSettings() {
  const { data, error } = await adminClient
    .from("settings")
    .select("*");

  if (error) {
    console.error("Supabase getAdminSettings error:", error);
    return [];
  }

  return data;
}

export async function updateAdminSettings(key: string, value: string) {
  const { data, error } = await adminClient
    .from("settings")
    .update({ value })
    .eq("key", key)
    .select();

  if (error) {
    console.error("Supabase updateAdminSettings error:", error);
    return null;
  }

  return data;
}

