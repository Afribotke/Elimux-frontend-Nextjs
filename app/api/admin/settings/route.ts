import { NextResponse } from "next/server";
import { getAdminSettings, updateAdminSettings } from "@/lib/supabase/adminSettings";

export async function GET() {
  const settings = await getAdminSettings();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const body = await req.json();
  const updated = await updateAdminSettings(body);
  return NextResponse.json(updated);
}

