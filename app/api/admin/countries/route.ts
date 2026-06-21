import { NextResponse } from "next/server";
import { getAdminCountries } from "@/lib/supabase/adminCountries";

export async function GET() {
  const countries = await getAdminCountries();
  return NextResponse.json(countries);
}



