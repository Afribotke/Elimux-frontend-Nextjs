import { adminClient } from "./adminClient";

export async function getAdminCountries() {
  const { data, error } = await adminClient
    .from("countries")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Supabase error:", error);
    return [];
  }

  return data || [];
}
