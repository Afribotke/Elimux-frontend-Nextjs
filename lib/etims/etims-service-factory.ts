//
// ETIMS Service Factory
// Creates ETIMS service instances with automatic mock/live switching.
//

import { EtimsService } from "./etims-service";
import { MockEtimsClient } from "./test-utils";
import { EtimsClient } from "./client";
import { isMockMode } from "./helpers";

export function createEtimsService() {
  const client = isMockMode() ? new MockEtimsClient() : new EtimsClient();
  return new EtimsService(client);
}
