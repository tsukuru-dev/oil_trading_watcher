"use client";

import Link from "next/link";
import { useState } from "react";

type NewsItem = {
  headline: string;
  summary: string;
  source: string;
  age: string;
  impact: "High impact" | "Medium impact" | "Watching";
  confidence: string;
  duplicates: number;
};

type NewsColumn = {
  id: "social" | "news";
  title: string;
  description: string;
  items: NewsItem[];
};

const classes = {
  page: "settings-page",
  layout: "settings-layout",
  header: "settings-header",
  main: "settings-main",
  headerActions: "ml-auto flex items-center gap-2",
  content: "settings-content h-full",
  filterPanel:
    "grid gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3",
  filterGrid: "grid gap-3 md:grid-cols-4",
  field: "grid gap-1.5",
  fieldLabel: "text-xs font-bold uppercase tracking-[0.05em] text-[var(--color-text-muted)]",
  fieldControl:
    "w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 py-2 text-[13px] text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]",
  board: "grid h-full min-h-0 gap-3",
  column:
    "grid min-h-0 min-w-0 gap-2.5 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3",
  columnHeader: "flex items-start justify-between gap-2.5",
  columnTitle: "m-0 text-sm leading-tight text-[var(--color-text)]",
  columnCopy: "m-0 text-xs leading-snug text-[var(--color-text-muted)]",
  cardList: "grid min-h-0 content-start gap-2 overflow-auto pr-0.5"
};

const impactClassNames: Record<NewsItem["impact"], string> = {
  "High impact": "status-pill danger",
  "Medium impact": "status-pill warning",
  Watching: "status-pill"
};

const newsColumns: NewsColumn[] = [
  {
    id: "social",
    title: "Social media",
    description: "Posts, analyst chatter, operator mentions, and fast-moving source signals.",
    items: [
      {
        headline: "Pipeline outage rumor flagged across monitored energy desks",
        summary: "Multiple desk accounts are repeating disruption language around a regional pipeline.",
        source: "Energy desk Twitter list",
        age: "2 min ago",
        impact: "High impact",
        confidence: "Credible 82%",
        duplicates: 3
      },
      {
        headline: "Shipping delay mention near key crude export terminal",
        summary: "Port-adjacent posts mention queueing and weather constraints near loading windows.",
        source: "Shipping disruption watch",
        age: "8 min ago",
        impact: "Medium impact",
        confidence: "Credible 68%",
        duplicates: 2
      },
      {
        headline: "Duplicate social reports mention storage draw expectations",
        summary: "Trader posts are converging around a sharper draw ahead of inventory data.",
        source: "Regional operator mentions",
        age: "14 min ago",
        impact: "Watching",
        confidence: "Credible 54%",
        duplicates: 4
      }
    ]
  },
  {
    id: "news",
    title: "News",
    description: "RSS, news API, wire, agency, and publisher intelligence.",
    items: [
      {
        headline: "OPEC delegate comment detected from verified wire source",
        summary: "A wire update points to continued discipline language ahead of the next meeting.",
        source: "Reuters energy",
        age: "4 min ago",
        impact: "High impact",
        confidence: "Credible 91%",
        duplicates: 1
      },
      {
        headline: "Refinery restart chatter appears in regional trade reports",
        summary: "Trade coverage suggests a previously delayed restart is moving back on schedule.",
        source: "Market news API",
        age: "11 min ago",
        impact: "Medium impact",
        confidence: "Credible 77%",
        duplicates: 2
      },
      {
        headline: "Weather disruption risk rising around Gulf infrastructure",
        summary: "Forecast and agency updates show elevated risk near key Gulf production assets.",
        source: "Geopolitical risk feed",
        age: "21 min ago",
        impact: "Watching",
        confidence: "Credible 63%",
        duplicates: 2
      }
    ]
  }
];

export default function NewsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className={classes.page}>
      <div className={classes.layout}>
        <div className={classes.header}>
          <Link aria-label="Back to dashboard" className="back-button" href="/dashboard">
            &larr;
          </Link>
          <div className="brand-lockup">
            <p className="eyebrow">Intelligence</p>
            <h1 className="page-title">News</h1>
          </div>
          <div className={classes.headerActions}>
            <button
              aria-expanded={showFilters}
              className="ghost-button"
              onClick={() => {
                setShowFilters((isVisible) => !isVisible);
              }}
              type="button"
            >
              Sort / Filter
            </button>
          </div>
        </div>
        <div className={classes.main}>
          {showFilters && (
            <section aria-label="Sort and filter rules" className={classes.filterPanel}>
              <div className={classes.filterGrid}>
                <label className={classes.field}>
                  <span className={classes.fieldLabel}>Date range</span>
                  <select className={classes.fieldControl} defaultValue="24h">
                    <option value="1h">Last hour</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="custom">Custom range</option>
                  </select>
                </label>
                <label className={classes.field}>
                  <span className={classes.fieldLabel}>Source name</span>
                  <select className={classes.fieldControl} defaultValue="all">
                    <option value="all">All sources</option>
                    <option value="energy-desk-twitter-list">Energy desk Twitter list</option>
                    <option value="shipping-disruption-watch">Shipping disruption watch</option>
                    <option value="reuters-energy">Reuters energy</option>
                    <option value="market-news-api">Market news API</option>
                  </select>
                </label>
                <label className={classes.field}>
                  <span className={classes.fieldLabel}>Type</span>
                  <select className={classes.fieldControl} defaultValue="all">
                    <option value="all">All types</option>
                    <option value="social">Social media</option>
                    <option value="news">News</option>
                  </select>
                </label>
                <label className={classes.field}>
                  <span className={classes.fieldLabel}>Impact</span>
                  <select className={classes.fieldControl} defaultValue="all">
                    <option value="all">All impacts</option>
                    <option value="high">High impact</option>
                    <option value="medium">Medium impact</option>
                    <option value="watching">Watching</option>
                  </select>
                </label>
              </div>
            </section>
          )}
          <div className={classes.content}>
            <div
              className={classes.board}
              style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
            >
              {newsColumns.map((column) => (
                <section
                  className={classes.column}
                  key={column.id}
                  style={{ gridTemplateRows: "auto auto minmax(0, 1fr)" }}
                >
                  <div className={classes.columnHeader}>
                    <h2 className={classes.columnTitle}>{column.title}</h2>
                  </div>
                  <p className={classes.columnCopy}>{column.description}</p>
                  <div className={classes.cardList}>
                    {column.items.map((item) => (
                      <article className="intelligence-card" key={item.headline}>
                        <div className="score-row">
                          <span className={impactClassNames[item.impact]}>{item.impact}</span>
                          <span className="status-pill positive">{item.confidence}</span>
                        </div>
                        <h3 className="card-title">{item.headline}</h3>
                        <p className="card-copy">{item.summary}</p>
                        <div className="card-meta">
                          {item.source} - {item.age} - Duplicate reports: {item.duplicates}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
