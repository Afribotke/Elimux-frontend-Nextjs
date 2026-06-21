//
// ETIMS Integration Types
// ------------------------
// These types define the exact structure expected by ETIMS APIs.
// They are intentionally separate from your internal Invoice model.
//

export type EtimsStatus =
  | "pending"
  | "success"
  | "failed";

export interface EtimsLineItem {
  item_code: string;          // ETIMS item code
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;           // e.g. 16
  tax_amount: number;
  total_amount: number;
}

export interface EtimsInvoicePayload {
  invoice_number: string;     // e.g. 001/2026/000123
  invoice_date: string;       // ISO date
  seller_pin: string;         // KRA PIN
  buyer_pin: string;          // KRA PIN
  currency: string;           // e.g. KES
  payment_mode: string;       // cash, card, mobile_money, etc.
  line_items: EtimsLineItem[];
  subtotal: number;
  total_tax: number;
  total_amount: number;

  // Optional PRN fields (ETIMS supports PRN for card/mobile payments)
  prn?: string;
  payment_reference?: string;
  payment_channel?: string;
}

export interface EtimsSubmissionResponse {
  status: EtimsStatus;
  etims_receipt_number?: string;
  message?: string;
  timestamp: string;          // ISO datetime
  raw_response?: unknown;     // store full ETIMS payload for audit
}

export interface EtimsError {
  code: string;
  message: string;
  details?: unknown;
}

