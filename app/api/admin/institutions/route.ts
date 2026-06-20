import { NextResponse } from "next/server";

export async function GET() {
  const institutions = [
    { id: "1", name: "Nairobi University", city: "Nairobi", country: "Kenya" },
    { id: "2", name: "Makerere University", city: "Kampala", country: "Uganda" },
  ];

  return NextResponse.json(institutions);
}
