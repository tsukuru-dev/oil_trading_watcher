import { createApiClient } from "./client";

export function getPrices(baseUrl: string) {
  return createApiClient({ baseUrl }).get("/api/v1/prices");
}

