"use client";

import Link from "next/link";
import { useState } from "react";

type TradesTab = "history" | "analytics" | "diary";

const tabs = [
  { id: "history", label: "Trade history" },
  { id: "analytics", label: "Analytics" },
  { id: "diary", label: "Trade diary" }
] satisfies { id: TradesTab; label: string }[];

const trades = [
  {
    market: "Brent crude",
    side: "Long",
    entry: "$83.40",
    exit: "$84.12",
    result: "+0.86%",
    date: "Today"
  },
  {
    market: "WTI crude",
    side: "Short",
    entry: "$80.05",
    exit: "$79.58",
    result: "+0.59%",
    date: "Yesterday"
  },
  {
    market: "Heating oil",
    side: "Long",
    entry: "$2.51",
    exit: "$2.48",
    result: "-1.20%",
    date: "Jul 24"
  }
];

const classes = {
  headerActions: "ml-auto flex items-center gap-2",
  contentGrid: "grid min-h-0 gap-3 overflow-auto",
  panel:
    "grid gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4",
  panelTitle: "m-0 text-sm font-bold text-[var(--color-text)]",
  panelCopy: "m-0 text-sm leading-snug text-[var(--color-text-muted)]",
  historyGrid: "grid gap-2",
  tradeCard:
    "grid gap-2 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 md:grid-cols-[1fr_auto]",
  tradeMeta: "flex flex-wrap gap-2",
  analyticsGrid: "grid gap-3 md:grid-cols-3",
  metricCard:
    "grid gap-1 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3",
  metricLabel: "text-xs font-bold uppercase tracking-[0.05em] text-[var(--color-text-muted)]",
  metricValue: "text-xl font-bold text-[var(--color-text)]",
  diaryEntry:
    "min-h-[180px] rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]"
};

export default function TradesPage() {
  const [activeTab, setActiveTab] = useState<TradesTab>("history");

  return (
    <main className="settings-page">
      <div className="settings-layout">
        <div className="settings-header">
          <Link aria-label="Back to dashboard" className="back-button" href="/dashboard">
            &larr;
          </Link>
          <div className="brand-lockup">
            <p className="eyebrow">Portfolio</p>
            <h1 className="page-title">My Trades</h1>
          </div>
          <div className={classes.headerActions}>
            <button className="primary-button" type="button">
              Upload latest CSV
            </button>
          </div>
        </div>

        <div className="settings-main">
          <div className="tabs">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  aria-pressed={isActive}
                  className={`tab-button${isActive ? " active" : ""}`}
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="settings-content">
            {activeTab === "history" && (
              <section className={classes.contentGrid} aria-label="Trade history">
                <div className={classes.panel}>
                  <h2 className={classes.panelTitle}>Trade history</h2>
                  <p className={classes.panelCopy}>
                    Latest uploaded trade rows will appear here after CSV import.
                  </p>
                  <div className={classes.historyGrid}>
                    {trades.map((trade) => (
                      <article className={classes.tradeCard} key={`${trade.market}-${trade.date}`}>
                        <div>
                          <h3 className="card-title">{trade.market}</h3>
                          <div className={classes.tradeMeta}>
                            <span className="status-pill">{trade.side}</span>
                            <span className="status-pill">Entry {trade.entry}</span>
                            <span className="status-pill">Exit {trade.exit}</span>
                          </div>
                        </div>
                        <div className={classes.tradeMeta}>
                          <span
                            className={`status-pill${
                              trade.result.startsWith("+") ? " positive" : " danger"
                            }`}
                          >
                            {trade.result}
                          </span>
                          <span className="status-pill">{trade.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === "analytics" && (
              <section className={classes.contentGrid} aria-label="Trade analytics">
                <div className={classes.analyticsGrid}>
                  <article className={classes.metricCard}>
                    <span className={classes.metricLabel}>Win rate</span>
                    <strong className={classes.metricValue}>67%</strong>
                  </article>
                  <article className={classes.metricCard}>
                    <span className={classes.metricLabel}>Average return</span>
                    <strong className={classes.metricValue}>+0.31%</strong>
                  </article>
                  <article className={classes.metricCard}>
                    <span className={classes.metricLabel}>Open risk</span>
                    <strong className={classes.metricValue}>Low</strong>
                  </article>
                </div>
                <div className={classes.panel}>
                  <h2 className={classes.panelTitle}>Performance breakdown</h2>
                  <p className={classes.panelCopy}>
                    CSV-driven analytics will summarize performance by market, setup, holding time,
                    and impact-tagged news context.
                  </p>
                </div>
              </section>
            )}

            {activeTab === "diary" && (
              <section className={classes.contentGrid} aria-label="Trade diary">
                <div className={classes.panel}>
                  <h2 className={classes.panelTitle}>Trade diary</h2>
                  <p className={classes.panelCopy}>
                    Record thesis, execution notes, and post-trade review against uploaded trades.
                  </p>
                  <textarea
                    className={classes.diaryEntry}
                    placeholder="Write trade notes, decision context, and review points..."
                  />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
