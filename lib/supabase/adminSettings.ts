import { adminClient } from "./adminClient";

export async function getAdminSettings() {
  const { data, error } = await adminClient
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return data;
}

export async function updateAdminSettings(payload: any) {
  const { data, error } = await adminClient
    .from("settings")
    .update(payload)
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return data;
}

