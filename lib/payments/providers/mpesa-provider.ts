//
// Payments Module — MpesaProvider
// Real MPESA integration using STK Push and status queries.
//

import { PaymentProvider } from "../provider";
import { PaymentRequest, PaymentResponse } from "../types";
import { paymentsHttpRequest } from "../http";
import { PAYMENT_ENDPOINTS, PAYMENT_PROVIDERS } from "../constants";
import { loadPaymentsEnv } from "../env";

export class MpesaProvider implements PaymentProvider {
  name = PAYMENT_PROVIDERS.MPESA;

  private env = loadPaymentsEnv(true);

  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    const payload = {
      amount: request.amount,
      msisdn: request.account,
      reference: request.reference,
      description: request.description || "Payment",
      shortCode: this.env.mpesaShortCode,
      passkey: this.env.mpesaPasskey,
    };

    const data = await paymentsHttpRequest<any>(PAYMENT_ENDPOINTS.MPESA_STK, {
      method: "POST",
      body: JSON.stringify(payload),
      baseUrl: this.env.mpesaBaseUrl,
    });

    return {
      status: data.status || "processing",
      provider: this.name,
      provider_reference: data.checkoutRequestID,
      message: data.message || "MPESA STK Push initiated",
      raw: data,
      timestamp: new Date().toISOString(),
    };
  }

  async getPaymentStatus(reference: string): Promise<PaymentResponse> {
    const payload = {
      checkoutRequestID: reference,
      shortCode: this.env.mpesaShortCode,
      passkey: this.env.mpesaPasskey,
    };

    const data = await paymentsHttpRequest<any>(PAYMENT_ENDPOINTS.MPESA_C2B, {
      method: "POST",
      body: JSON.stringify(payload),
      baseUrl: this.env.mpesaBaseUrl,
    });

    return {
      status: data.status || "pending",
      provider: this.name,
      provider_reference: reference,
      message: data.message || "MPESA status retrieved",
      raw: data,
      timestamp: new Date().toISOString(),
    };
  }

  async refundPayment(): Promise<PaymentResponse> {
    return {
      status: "failed",
      provider: this.name,
      message: "MPESA does not support refunds via API",
      timestamp: new Date().toISOString(),
    };
  }
}