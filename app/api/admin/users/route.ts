import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  ];

  return NextResponse.json(users);
}
