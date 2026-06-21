import { adminClient } from "./adminClient";

export async function getAdminInstitutions() {
  const { data, error } = await adminClient
    .from("institutions")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}

