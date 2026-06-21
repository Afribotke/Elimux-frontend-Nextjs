import { Invoice } from "@/components/admin/invoices/invoice-types";
import { EtimsInvoicePayload, EtimsSubmissionResponse } from "./types";
import { EtimsClient } from "./client";

/**
 * mapInvoiceToEtimsPayload
 * ------------------------
 * Converts your internal Invoice model into the exact ETIMS payload format.
 */
export function mapInvoiceToEtimsPayload(invoice: Invoice): EtimsInvoicePayload {
  return {
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
  };
}

/**
 * submitInvoiceToEtims
 * --------------------
 * Sends the invoice to ETIMS using the ETIMS client.
 * Handles:
 * - Payload mapping
 * - API call
 * - Error normalization
 * - Response shaping
 */
export async function submitInvoiceToEtims(
  client: EtimsClient,
  invoice: Invoice
): Promise<EtimsSubmissionResponse> {
  const payload = mapInvoiceToEtimsPayload(invoice);

  try {
    const response = await client.request<EtimsSubmissionResponse>(
      "/submitInvoice",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    return {
      ...response,
      raw_response: response,
    };
  } catch (err: any) {
    return {
      status: "failed",
      message: err?.message || "ETIMS submission failed",
      timestamp: new Date().toISOString(),
      raw_response: err,
    };
  }
}
