import { NextResponse } from "next/server";

export async function GET() {
  const countries = [
    { code: "KE", name: "Kenya", region: "Africa" },
    { code: "UG", name: "Uganda", region: "Africa" },
  ];

  return NextResponse.json(countries);
}
