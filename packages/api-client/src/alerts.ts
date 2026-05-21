import { createApiClient } from "./client";

export function getAlerts(baseUrl: string) {
  return createApiClient({ baseUrl }).get("/api/v1/alerts");
}

