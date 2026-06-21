//
// Payments Module — Test Utilities
// Provides a mock payments provider for testing and local development.
//

import { PaymentProvider } from "./provider";
import { PaymentRequest, PaymentResponse } from "./types";

export class MockPaymentsProvider implements PaymentProvider {
  name = "mock-payments";
  mode: "success" | "fail" | "pending" = "success";

  setSuccess() {
    this.mode = "success";
  }

  setFailure() {
    this.mode = "fail";
  }

  setPending() {
    this.mode = "pending";
  }

  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    if (this.mode === "success") {
      return {
        status: "success",
        provider: this.name,
        provider_reference: "MOCK_REF_123",
        message: "Mock payment successful",
        raw: request,
        timestamp: new Date().toISOString(),
      };
    }

    if (this.mode === "pending") {
      return {
        status: "pending",
        provider: this.name,
        message: "Mock payment pending",
        raw: request,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: "failed",
      provider: this.name,
      message: "Mock payment failed",
      raw: request,
      timestamp: new Date().toISOString(),
    };
  }

  async getPaymentStatus(reference: string): Promise<PaymentResponse> {
    return this.initiatePayment({
      amount: 0,
      currency: "KES",
      method: "mpesa",
      account: "000000",
      reference,
    });
  }

  async refundPayment(reference: string): Promise<PaymentResponse> {
    if (this.mode === "success") {
      return {
        status: "success",
        provider: this.name,
        provider_reference: reference,
        message: "Mock refund successful",
        timestamp: new Date().toISOString(),
      };
    }

    return {
      status: "failed",
      provider: this.name,
      provider_reference: reference,
      message: "Mock refund failed",
      timestamp: new Date().toISOString(),
    };
  }
}

