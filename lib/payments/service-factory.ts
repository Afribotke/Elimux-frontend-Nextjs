//
// Payments Module — Service Factory
// Creates a PaymentsService instance with the correct provider.
//

import { PaymentsService } from "./service";
import { PaymentProvider } from "./provider";
import { MockPaymentsProvider } from "./test-utils";
import { MpesaProvider } from "./providers/mpesa-provider";
import { loadPaymentsEnv } from "./env";

export function createPaymentsService(): PaymentsService {
  const env = loadPaymentsEnv();

  let provider: PaymentProvider;

  if (env.mpesaBaseUrl && env.mpesaConsumerKey && env.mpesaConsumerSecret) {
    provider = new MpesaProvider();
  } else {
    provider = new MockPaymentsProvider();
  }

  return new PaymentsService(provider);
}



