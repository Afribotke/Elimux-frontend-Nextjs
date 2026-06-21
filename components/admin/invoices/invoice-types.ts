export type InvoiceStatus =
  | "draft"
  | "pending_submission"
  | "submitted"
  | "accepted"
  | "rejected"
  | "cancelled";

export type InvoicePaymentMode =
  | "cash"
  | "card"
  | "bank_transfer"
  | "mobile_money"
  | "cheque"
  | "other";

export type TaxType =
  | "vat"
  | "withholding_vat"
  | "excise"
  | "none";

export interface InvoiceLineItem {
  id: string;
  itemCode: string; // ETIMS item_code
  description: string;
  quantity: number;
  unitPrice: number;
  taxType: TaxType;
  taxRate: number; // percentage, e.g. 16
  taxAmount: number;
  totalAmount: number; // unitPrice * quantity + taxAmount
}

export interface InvoiceTaxBreakdown {
  taxType: TaxType;
  taxRate: number;
  taxableAmount: number;
  taxAmount: number;
}

export interface InvoiceEtimsMeta {
  // Core ETIMS identifiers
  etimsInvoiceNumber?: string; // ETIMS-assigned invoice ID (if different from local)
  etimsReceiptNumber?: string;
  etimsStatus?: "pending" | "success" | "failed";

  // PRN & payment linkage
  prn?: string; // Payment Registration Number
  paymentReference?: string;
  paymentChannel?: InvoicePaymentMode;

  // Submission & response logging
  submissionTimestamp?: string; // ISO string
  lastSyncedAt?: string; // ISO string
  lastErrorMessage?: string;
  rawRequestPayload?: unknown;
  rawResponsePayload?: unknown;
}

export interface PartyDetails {
  name: string;
  pin: string; // KRA PIN
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
}

export interface Invoice {
  id: string;

  // Numbering & identity
  invoiceNumber: string; // e.g. 001/2026/000123
  branchCode: string; // e.g. "001"
  sequenceNumber: number; // e.g. 123
  financialYear: number; // e.g. 2026

  // Parties
  seller: PartyDetails;
  buyer: PartyDetails;

  // Dates
  issueDate: string; // ISO date
  dueDate?: string; // ISO date
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime

  // Status & lifecycle
  status: InvoiceStatus;
  paymentMode?: InvoicePaymentMode;
  isCancelled?: boolean;
  cancellationReason?: string;

  // Monetary totals
  currency: string; // e.g. "KES"
  subTotal: number; // sum of line item (unitPrice * quantity)
  totalTax: number; // sum of taxAmount
  totalAmount: number; // subTotal + totalTax
  amountPaid?: number;
  balanceDue?: number;

  // Line items & tax breakdown
  lineItems: InvoiceLineItem[];
  taxBreakdown?: InvoiceTaxBreakdown[];

  // ETIMS integration metadata
  etims?: InvoiceEtimsMeta;

  // Free-form metadata
  notes?: string;
  reference?: string; // e.g. PO number, student ID, enrollment ID
}