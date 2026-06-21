//
// ETIMS Validators
// Ensures ETIMS payloads and responses meet required structure.
//

import { EtimsInvoicePayload, EtimsSubmissionResponse } from "./types";

export function validateEtimsPayload(payload: EtimsInvoicePayload): string[] {
  const errors: string[] = [];

  if (!payload.invoice_number) errors.push("Missing invoice_number");
  if (!payload.invoice_date) errors.push("Missing invoice_date");
  if (!payload.seller_pin) errors.push("Missing seller_pin");
  if (!payload.buyer_pin) errors.push("Missing buyer_pin");

  if (!payload.line_items || payload.line_items.length === 0) {
    errors.push("Invoice must contain at least one line item");
  }

  if (payload.total_amount <= 0) {
    errors.push("total_amount must be greater than zero");
  }

  return errors;
}

export function validateEtimsResponse(
  response: EtimsSubmissionResponse
): string[] {
  const errors: string[] = [];

  if (!response.status) errors.push("Missing ETIMS status");
  if (!response.timestamp) errors.push("Missing ETIMS timestamp");

  return errors;
}

