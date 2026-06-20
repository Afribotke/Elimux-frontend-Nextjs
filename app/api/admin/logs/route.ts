import { NextResponse } from "next/server";

export async function GET() {
  const logs = [
    { id: "1", action: "User Login", user: "John Doe", timestamp: "2026-06-20 10:00" },
    { id: "2", action: "Program Added", user: "Admin", timestamp: "2026-06-20 09:30" },
  ];

  return NextResponse.json(logs);
}
