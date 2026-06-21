//
// ETIMS HTTP Utility
// Handles ETIMS HTTP requests with timeout, retries, and error normalization.
//

import { etimsError, etimsInfo } from "./logger";
import { getEtimsConfig } from "./etims-config";

export async function etimsHttpRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const config = getEtimsConfig();
  const url = `${config.baseUrl}${endpoint}`;

  let attempts = 0;

  while (attempts <= config.retries) {
    attempts++;

    try {
      etimsInfo(`ETIMS Request → ${url}`, { attempt: attempts });

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
          ...(options.headers || {}),
        },
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const text = await response.text();
        etimsError("ETIMS HTTP Error", {
          status: response.status,
          body: text,
        });

        throw new Error(`ETIMS request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (err: any) {
      if (attempts > config.retries) {
        etimsError("ETIMS request failed after retries", {
          endpoint,
          error: err.message,
        });
        throw err;
      }

      etimsInfo("Retrying ETIMS request due to error", {
        attempt: attempts,
        error: err.message,
      });
    }
  }

  throw new Error("ETIMS request failed unexpectedly");
}
