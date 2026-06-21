//
// Payments Module — PaymentsService
// High-level orchestrator that wraps any PaymentProvider.
//

import { PaymentProvider } from "./provider";
import { PaymentRequest, PaymentResponse } from "./types";
import { mapPaymentError } from "./error-map";

export class PaymentsService {
  constructor(private provider: PaymentProvider) {}

  async initiate(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      return await this.provider.initiatePayment(request);
    } catch (err: any) {
      const mapped = mapPaymentError(err.code);
      return {
        status: "failed",
        provider: this.provider.name,
        message: mapped.message,
        raw: err,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async status(reference: string): Promise<PaymentResponse> {
    try {
      return await this.provider.getPaymentStatus(reference);
    } catch (err: any) {
      const mapped = mapPaymentError(err.code);
      return {
        status: "failed",
        provider: this.provider.name,
        message: mapped.message,
        raw: err,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async refund(reference: string, amount?: number): Promise<PaymentResponse> {
    if (!this.provider.refundPayment) {
      return {
        status: "failed",
        provider: this.provider.name,
        message: "Refunds not supported by this provider",
        timestamp: new Date().toISOString(),
      };
    }

    try {
      return await this.provider.refundPayment(reference, amount);
    } catch (err: any) {
      const mapped = mapPaymentError(err.code);
      return {
        status: "failed",
        provider: this.provider.name,
        message: mapped.message,
        raw: err,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
