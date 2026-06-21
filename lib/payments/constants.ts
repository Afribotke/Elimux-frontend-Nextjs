//
// Payments Module — Constants
// Shared constants for all payment providers.
//

export const PAYMENT_PROVIDERS = {
  MPESA: "mpesa",
  CARD: "card",
  BANK: "bank",
  AIRTIME: "airtime",
  WALLET: "wallet",
  CASH: "cash",
} as const;

export const PAYMENT_CURRENCIES = [
  "KES",
  "USD",
  "EUR",
  "GBP",
] as const;

export const PAYMENT_DEFAULTS = {
  TIMEOUT_MS: 15000,
  RETRIES: 1,
};

export const PAYMENT_ENDPOINTS = {
  MPESA_STK: "/mpesa/stk",
  MPESA_C2B: "/mpesa/c2b",
  CARD_CHARGE: "/card/charge",
  BANK_TRANSFER: "/bank/transfer",
  WALLET_TRANSFER: "/wallet/transfer",
};



