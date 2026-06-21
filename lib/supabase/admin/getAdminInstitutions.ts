import { adminClient } from "../adminClient";

export async function getAdminInstitutions() {
  const { data, error } = await adminClient
    .from("institutions")
    .select("*")
    .order("name");

  if (error) {
    console.error("Supabase getAdminInstitutions error:", error);
    return [];
  }

  return data;
}



