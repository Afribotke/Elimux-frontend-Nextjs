//
// Payments Module — Provider Interface
// Contract that all payment providers must implement.
//

import { PaymentRequest, PaymentResponse } from "./types";

export interface PaymentProvider {
  name: string;

  /**
   * Initiates a payment with the given request payload.
   */
  initiatePayment(request: PaymentRequest): Promise<PaymentResponse>;

  /**
   * Retrieves the status of a payment using a provider reference or internal reference.
   */
  getPaymentStatus(reference: string): Promise<PaymentResponse>;

  /**
   * Optionally supports refunds for a given provider reference.
   */
  refundPayment?(reference: string, amount?: number): Promise<PaymentResponse>;
}



