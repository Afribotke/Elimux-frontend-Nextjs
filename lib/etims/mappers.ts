//
// ETIMS Mapping Utilities
// Converts internal invoice structures to ETIMS payloads and vice versa.
//

import { Invoice } from "@/components/admin/invoices/invoice-types";
import { EtimsInvoicePayload, EtimsSubmissionResponse } from "./types";

/**
 * Maps internal Invoice → ETIMS payload format.
 */
export function mapInvoiceToEtimsPayload(
  invoice: Invoice
): EtimsInvoicePayload {
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
 * Maps ETIMS response → internal metadata for DB updates.
 */
export function mapEtimsResponseToMetadata(
  response: EtimsSubmissionResponse
) {
  return {
    etimsStatus: response.status,
    etimsReceiptNumber: response.etims_receipt_number,
    lastErrorMessage: response.status === "failed" ? response.message : null,
    submissionTimestamp: response.timestamp,
    rawEtimsResponse: response.raw_response,
  };
}