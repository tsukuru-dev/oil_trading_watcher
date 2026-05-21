export type AlertSeverity = "low" | "medium" | "high" | "critical";

export type Alert = {
  id: string;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
};

