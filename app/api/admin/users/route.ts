import { NextResponse } from "next/server";
import { getAdminUsers } from "@/lib/supabase/adminUsers";

export async function GET() {
  const users = await getAdminUsers();
  return NextResponse.json(users);
}

