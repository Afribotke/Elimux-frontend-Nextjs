import { NextResponse } from "next/server";
import { EtimsClient } from "@/lib/etims/client";
import { submitInvoiceToEtims } from "@/lib/etims/submit-invoice";
import { mockSubmitInvoice } from "@/lib/etims/mock-etims";
import { Invoice } from "@/components/admin/invoices/invoice-types";

// TODO: Replace with your real DB fetch
async function loadInvoice(id: string): Promise<Invoice | null> {
  console.log("Loading invoice", id);
  return null; // placeholder
}

export async function POST(req: Request) {
  try {
    const { invoiceId } = await req.json();

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Missing invoiceId" },
        { status: 400 }
      );
    }

    const invoice = await loadInvoice(invoiceId);

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    const useMock = process.env.ETIMS_MOCK === "true";

    if (useMock) {
      const payload = await mockSubmitInvoice(
        // mapInvoiceToEtimsPayload is inside submit-invoice.ts
        // but mockSubmitInvoice accepts the payload directly
        {
          invoice_number: invoice.invoiceNumber,
          invoice_date: invoice.issueDate,
          seller_pin: invoice.seller.pin,
          buyer_pin: invoice.buyer.pin,
          currency: invoice.currency,
          payment_mode: invoice.paymentMode || "cash",
          line_items: invoice.lineItems.map((item) => ({
            item_code: item.itemCode,
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            tax_rate: item.taxRate,
            tax_amount: item.taxAmount,
            total_amount: item.totalAmount,
          })),
          subtotal: invoice.subTotal,
          total_tax: invoice.totalTax,
          total_amount: invoice.totalAmount,
          prn: invoice.etims?.prn,
          payment_reference: invoice.etims?.paymentReference,
          payment_channel: invoice.etims?.paymentChannel,
        }
      );

      return NextResponse.json(payload);
    }

    // REAL ETIMS CLIENT
    const client = new EtimsClient({
      baseUrl: process.env.ETIMS_BASE_URL!,
      apiKey: process.env.ETIMS_API_KEY,
    });

    const result = await submitInvoiceToEtims(client, invoice);

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err?.message || "ETIMS submission failed",
      },
      { status: 500 }
    );
  }
}
