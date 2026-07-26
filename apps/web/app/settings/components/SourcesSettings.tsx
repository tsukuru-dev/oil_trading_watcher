"use client";

import { useState } from "react";

type SourceColumn = {
  id: SourceColumnId;
  title: string;
  description: string;
  addLabel: string;
  sources: {
    name: string;
    detail: string;
    enabled: boolean;
    credibility: CredibilityRating;
  }[];
};

type SourceColumnId = "social" | "rss" | "news";
type CredibilityRating = "Very Poor" | "Poor" | "Average" | "Good" | "Very Good";

const credibilityRatings: CredibilityRating[] = [
  "Very Poor",
  "Poor",
  "Average",
  "Good",
  "Very Good"
];

const sourceColumns: SourceColumn[] = [
  {
    id: "social",
    title: "Social media",
    description: "Accounts, lists, and fast-moving market chatter.",
    addLabel: "Add social media source",
    sources: [
      {
        name: "Energy desk Twitter list",
        detail: "Verified analysts, ports, and commodity desks",
        enabled: true,
        credibility: "Good"
      },
      {
        name: "Shipping disruption watch",
        detail: "High-signal posts matching freight and chokepoint terms",
        enabled: true,
        credibility: "Average"
      },
      {
        name: "Regional operator mentions",
        detail: "Queued for review before alerts are enabled",
        enabled: false,
        credibility: "Poor"
      }
    ]
  },
  {
    id: "rss",
    title: "RSS feed",
    description: "Structured feeds from publishers and agencies.",
    addLabel: "Add RSS feed",
    sources: [
      {
        name: "Reuters energy",
        detail: "Oil, gas, OPEC, refining, and macro headlines",
        enabled: true,
        credibility: "Very Good"
      },
      {
        name: "EIA updates",
        detail: "Inventory reports, outlooks, and price summaries",
        enabled: true,
        credibility: "Very Good"
      },
      {
        name: "Port authority notices",
        detail: "Operational notices and weather disruption feeds",
        enabled: false,
        credibility: "Good"
      }
    ]
  },
  {
    id: "news",
    title: "News",
    description: "News API and wire-style market intelligence.",
    addLabel: "Add news source",
    sources: [
      {
        name: "Market news API",
        detail: "Broad market coverage filtered for crude and refined products",
        enabled: true,
        credibility: "Good"
      },
      {
        name: "Geopolitical risk feed",
        detail: "Conflict, sanctions, and policy events affecting supply",
        enabled: true,
        credibility: "Average"
      },
      {
        name: "Refinery outage monitor",
        detail: "Maintenance and unplanned outage mentions",
        enabled: true,
        credibility: "Good"
      }
    ]
  }
];

function getSourceFields(columnId: SourceColumnId) {
  if (columnId === "social") {
    return [
      { id: "handle", label: "Handle, list, or search URL", placeholder: "@energydesk or list URL" },
      { id: "keywords", label: "Keywords", placeholder: "OPEC, outage, refinery, sanctions" }
    ];
  }

  if (columnId === "rss") {
    return [
      { id: "feedUrl", label: "Feed URL", placeholder: "https://example.com/feed.xml" },
      { id: "publisher", label: "Publisher", placeholder: "Reuters, EIA, port authority" }
    ];
  }

  return [
    { id: "siteUrl", label: "Site or API URL", placeholder: "https://example.com/energy" },
    { id: "query", label: "Query or topic filter", placeholder: "crude oil supply disruption" }
  ];
}

export function SourcesSettings() {
  const [activeColumnId, setActiveColumnId] = useState<SourceColumnId | null>(null);
  const [newSourceEnabled, setNewSourceEnabled] = useState(true);
  const activeColumn = sourceColumns.find((column) => column.id === activeColumnId);

  return (
    <>
      <div className="source-board">
        {sourceColumns.map((column) => (
          <section className="source-column" key={column.id}>
            <div className="source-column-header">
              <h3>{column.title}</h3>
              <button
                aria-label={column.addLabel}
                className="icon-button"
                onClick={() => {
                  setNewSourceEnabled(true);
                  setActiveColumnId(column.id);
                }}
                type="button"
              >
                +
              </button>
            </div>
            <p className="source-column-copy">{column.description}</p>
            <div className="source-card-list">
              {[...column.sources]
                .sort((source, nextSource) => Number(nextSource.enabled) - Number(source.enabled))
                .map((source) => (
                  <article
                    className={`source-card${source.enabled ? "" : " disabled"}`}
                    key={source.name}
                  >
                    <div className="source-card-header">
                      <h4>{source.name}</h4>
                    </div>
                    <p>{source.detail}</p>
                    <span
                      className={`credibility-pill credibility-${source.credibility
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {source.credibility}
                    </span>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>

      {activeColumn && (
        <div className="modal-backdrop">
          <section
            aria-labelledby="source-modal-title"
            aria-modal="true"
            className="modal source-modal"
            role="dialog"
          >
            <div className="modal-header">
              <h2 id="source-modal-title">{activeColumn.addLabel}</h2>
              <button
                className="icon-button"
                onClick={() => {
                  setActiveColumnId(null);
                }}
                type="button"
              >
                x
              </button>
            </div>
            <form className="source-form">
              <div className="source-form-fields">
                <label className="field">
                  <span>Source name</span>
                  <input placeholder="Name shown in the source board" type="text" />
                </label>
                {getSourceFields(activeColumn.id).map((field) => (
                  <label className="field" key={field.id}>
                    <span>{field.label}</span>
                    <input placeholder={field.placeholder} type="text" />
                  </label>
                ))}
                <label className="field">
                  <span>Credibility rating</span>
                  <select defaultValue="Average">
                    {credibilityRatings.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Notes</span>
                  <textarea placeholder="Useful context, setup notes, or review instructions" rows={4} />
                </label>
              </div>
              <div className="source-form-actions">
                <div className="toggle-field">
                  <button
                    aria-checked={newSourceEnabled}
                    className={`toggle-switch${newSourceEnabled ? " active" : ""}`}
                    onClick={() => {
                      setNewSourceEnabled((isEnabled) => !isEnabled);
                    }}
                    role="switch"
                    type="button"
                  >
                    <span />
                  </button>
                  <span>{newSourceEnabled ? "On" : "Disabled"}</span>
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setActiveColumnId(null);
                  }}
                  type="button"
                >
                  Cancel
                </button>
                <button className="primary-button" type="button">
                  Save
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
