//
// ETIMS Constants
// Centralized constants used across the ETIMS module.
//

export const ETIMS_STATUSES = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
} as const;

export const ETIMS_DEFAULTS = {
  TIMEOUT_MS: 10000,
  RETRIES: 1,
} as const;

export const ETIMS_ENDPOINTS = {
  SUBMIT_INVOICE: "/submitInvoice",
  CHECK_STATUS: "/checkStatus",
} as const;

export const PAYMENT_MODES = {
  CASH: "cash",
  CARD: "card",
  MOBILE_MONEY: "mobile_money",
  BANK_TRANSFER: "bank_transfer",
} as const;

export const TAX_RATES = {
  VAT_16: 16,
  VAT_0: 0,
} as const;

export const ETIMS_ERROR_CODES = {
  INVALID_PAYLOAD: "400",
  UNAUTHORIZED: "401",
  FORBIDDEN: "403",
  NOT_FOUND: "404",
  TIMEOUT: "408",
  DUPLICATE: "409",
  UNPROCESSABLE: "422",
  SERVER_ERROR: "500",
  SERVICE_UNAVAILABLE: "503",
} as const;
