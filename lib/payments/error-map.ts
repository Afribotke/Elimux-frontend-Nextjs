//
// Payments Module — Error Mapping
// Normalizes provider error codes into friendly messages and retry hints.
//

import { PaymentError } from "./types";

export interface PaymentErrorInfo extends PaymentError {
  provider?: string;
}

export const PAYMENT_ERROR_MAP: Record<string, PaymentErrorInfo> = {
  // Generic
  GENERIC_ERROR: {
    code: "GENERIC_ERROR",
    message: "An unexpected payment error occurred",
    retryable: false,
  },

  // MPESA-like errors
  MPESA_TIMEOUT: {
    code: "MPESA_TIMEOUT",
    message: "M-Pesa did not respond in time",
    retryable: true,
  },
  MPESA_INSUFFICIENT_FUNDS: {
    code: "MPESA_INSUFFICIENT_FUNDS",
    message: "Insufficient funds in the M-Pesa wallet",
    retryable: false,
  },
  MPESA_INVALID_MSISDN: {
    code: "MPESA_INVALID_MSISDN",
    message: "The phone number is invalid",
    retryable: false,
  },

  // Card-like errors
  CARD_DECLINED: {
    code: "CARD_DECLINED",
    message: "The card was declined",
    retryable: false,
  },
  CARD_EXPIRED: {
    code: "CARD_EXPIRED",
    message: "The card has expired",
    retryable: false,
  },
  CARD_NETWORK_ERROR: {
    code: "CARD_NETWORK_ERROR",
    message: "Card network error — please try again",
    retryable: true,
  },
};

/**
 * Maps a raw provider error code to a normalized PaymentErrorInfo.
 */
export function mapPaymentError(code?: string): PaymentErrorInfo {
  if (!code) return PAYMENT_ERROR_MAP.GENERIC_ERROR;
  return PAYMENT_ERROR_MAP[code] || PAYMENT_ERROR_MAP.GENERIC_ERROR;
}

