import { createApiClient } from "./client";

export function getRules(baseUrl: string) {
  return createApiClient({ baseUrl }).get("/api/v1/rules");
}

