import { adminClient } from "../adminClient";

export async function getAdminCountries() {
  const { data, error } = await adminClient
    .from("countries")
    .select("*")
    .order("name");

  if (error) {
    console.error("Supabase getAdminCountries error:", error);
    return [];
  }

  return data;
}
