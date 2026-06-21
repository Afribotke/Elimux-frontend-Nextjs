import { NextResponse } from "next/server";
import { getAdminInstitutions } from "@/lib/supabase/adminInstitutions";

export async function GET() {
  const institutions = await getAdminInstitutions();
  return NextResponse.json(institutions);
}
