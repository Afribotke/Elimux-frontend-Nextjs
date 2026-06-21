//
// Payments Module — Core Types
// Unified payment types for all payment providers.
//

export type PaymentMethod =
  | "mpesa"
  | "card"
  | "bank"
  | "airtime"
  | "wallet"
  | "cash";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "cancelled"
  | "refunded";

export interface PaymentRequest {
  amount: number;
  currency: string;
  method: PaymentMethod;
  account: string; // phone, card number, bank account, etc.
  reference: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  status: PaymentStatus;
  provider: string;
  provider_reference?: string;
  message?: string;
  raw?: any;
  timestamp: string;
}

export interface PaymentError {
  code: string;
  message: string;
  retryable: boolean;
  raw?: any;
}
