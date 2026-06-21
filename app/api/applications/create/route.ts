import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const form = await req.formData();

  const payload = {
    program_id: form.get("program_id"),
    full_name: form.get("full_name"),
    email: form.get("email"),
    phone: form.get("phone"),
  };

  const { error } = await supabase.from("applications").insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect("/student/applications");
}