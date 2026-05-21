export type IntelligenceEvent = {
  id: string;
  headline: string;
  body?: string;
  sourceUrl?: string;
  timestamp: string;
  credibilityScore: number;
  relevanceScore: number;
  flaggedReason?: string;
  duplicateReports?: IntelligenceEvent[];
};

