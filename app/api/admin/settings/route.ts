import { NextResponse } from "next/server";

export async function GET() {
  const settings = [
    { key: "site_name", label: "Site Name", value: "ElimuX" },
    { key: "support_email", label: "Support Email", value: "support@elimux.com" },
  ];

  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Settings updated:", body);

  return NextResponse.json({ success: true, updated: body });
}
