import { NextResponse } from "next/server";
import { getAdminPrograms } from "@/lib/supabase/adminPrograms";

export async function GET() {
  const programs = await getAdminPrograms();
  return NextResponse.json(programs);
}

