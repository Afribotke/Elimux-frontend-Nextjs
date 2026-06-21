import { NextResponse } from "next/server";
import { EtimsClient } from "@/lib/etims/client";
import { checkEtimsStatus } from "@/lib/etims/check-status";
import { mockCheckStatus } from "@/lib/etims/mock-etims";

export async function POST(req: Request) {
  try {
    const { invoiceNumber } = await req.json();

    if (!invoiceNumber) {
      return NextResponse.json(
        { error: "Missing invoiceNumber" },
        { status: 400 }
      );
    }

    const useMock = process.env.ETIMS_MOCK === "true";

    if (useMock) {
      const result = await mockCheckStatus(invoiceNumber);
      return NextResponse.json(result);
    }

    // REAL ETIMS CLIENT
    const client = new EtimsClient({
      baseUrl: process.env.ETIMS_BASE_URL!,
      apiKey: process.env.ETIMS_API_KEY,
    });

    const result = await checkEtimsStatus(client, invoiceNumber);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "Failed to check ETIMS status",
      },
      { status: 500 }
    );
  }
}
