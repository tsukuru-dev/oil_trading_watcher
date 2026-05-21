import { createApiClient } from "./client";

export function getSources(baseUrl: string) {
  return createApiClient({ baseUrl }).get("/api/v1/sources");
}

