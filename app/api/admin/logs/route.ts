import { NextResponse } from "next/server";
import { getAdminLogs } from "@/lib/supabase/adminLogs";

export async function GET() {
  const logs = await getAdminLogs();
  return NextResponse.json(logs);
}

