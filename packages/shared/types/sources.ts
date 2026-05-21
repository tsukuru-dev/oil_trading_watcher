export type SourceType = "twitter" | "rss" | "news_api" | "manual";

export type Source = {
  id: string;
  name: string;
  type: SourceType;
  enabled: boolean;
};

