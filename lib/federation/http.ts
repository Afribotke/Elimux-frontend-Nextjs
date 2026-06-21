//
// Federation Module — HTTP Utility
// Centralized HTTP client for federation-related operations.
//

import { loadFederationEnv } from "./env";

export interface FederationHttpOptions extends RequestInit {
  baseUrl?: string;
  timeoutMs?: number;
  retries?: number;
}

export async function federationHttpRequest<T>(
  endpoint: string,
  options: FederationHttpOptions = {}
): Promise<T> {
  const env = loadFederationEnv();
  const baseUrl = options.baseUrl || env.federationBaseUrl || "";
  const timeoutMs = options.timeoutMs ?? env.timeoutMs;
  const retries = options.retries ?? env.retries;

  if (!baseUrl) {
    throw new Error("Missing FEDERATION_BASE_URL for federation HTTP request");
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
        throw new Error(\Federation request failed with status \: \\);
      }

      const data = await response.json();
      return data as T;
    } catch (err) {
      if (attempts > retries) {
        throw err;
      }
    }
  }

  throw new Error("Federation request failed unexpectedly");
}

