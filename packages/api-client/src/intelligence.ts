import { createApiClient } from "./client";

export function getIntelligenceEvents(baseUrl: string) {
  return createApiClient({ baseUrl }).get("/api/v1/intelligence");
}

