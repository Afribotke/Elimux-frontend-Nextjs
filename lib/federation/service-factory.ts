//
// Federation Module — Service Factory
// Creates a FederationService instance with environment-based configuration.
//

import { FederationService } from "./service";
import { loadFederationEnv } from "./env";

export function createFederationService(): FederationService {
  const env = loadFederationEnv();

  // If an external federation API is configured, basePath becomes empty
  const basePath = env.federationBaseUrl
    ? \"\"
    : \"/federation\";

  return new FederationService(basePath);
}



