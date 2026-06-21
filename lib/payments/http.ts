//
// Payments HTTP Utility
// Centralized HTTP client for all payment providers (MPESA, Card, Bank, Wallet).
//

import { PAYMENT_DEFAULTS } from "./constants";
import { loadPaymentsEnv } from "./env";

export interface PaymentsHttpOptions extends RequestInit {
  baseUrl?: string;
  timeoutMs?: number;
  retries?: number;
}

export async function paymentsHttpRequest<T>(
  endpoint: string,
  options: PaymentsHttpOptions = {}
): Promise<T> {
  const env = loadPaymentsEnv();
  const baseUrl = options.baseUrl || env.mpesaBaseUrl || env.cardProviderBaseUrl || "";
  const timeoutMs = options.timeoutMs ?? env.timeoutMs ?? PAYMENT_DEFAULTS.TIMEOUT_MS;
  const retries = options.retries ?? env.retries ?? PAYMENT_DEFAULTS.RETRIES;

  if (!baseUrl) {
    throw new Error("Missing base URL for payments HTTP request");
  }

  const url = \\\\;
  let attempts = 0;

  while (attempts <= retries) {
    attempts++;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(\Payments request failed with status \: \\);
      }

      const data = await response.json();
      return data as T;
    } catch (err) {
      if (attempts > retries) {
        throw err;
      }
    }
  }

  throw new Error("Payments request failed unexpectedly");
}

