import { NextResponse } from "next/server";

export async function GET() {
  const programs = [
    { id: "1", name: "Computer Science", level: "Degree", institutionName: "Nairobi University" },
    { id: "2", name: "Business Management", level: "Diploma", institutionName: "KCA University" },
  ];

  return NextResponse.json(programs);
}
