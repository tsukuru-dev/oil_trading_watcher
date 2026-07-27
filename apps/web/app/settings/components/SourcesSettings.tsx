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

type Source = SourceColumn["sources"][number];
type EditingSource = {
  column: SourceColumn;
  source?: Source;
};
type DeletingSource = {
  columnTitle: string;
  sourceName: string;
};
type SourceColumnId = "social" | "rss" | "news";
type CredibilityRating = "Very Poor" | "Poor" | "Average" | "Good" | "Very Good";

function cx(...classNames: (string | false | undefined)[]) {
  return classNames.filter(Boolean).join(" ");
}

const credibilityRatings: CredibilityRating[] = [
  "Very Poor",
  "Poor",
  "Average",
  "Good",
  "Very Good"
];

const credibilityClassNames: Record<CredibilityRating, string> = {
  "Very Poor": "border-red-500/40 bg-red-950/35 text-red-300",
  Poor: "border-orange-400/40 bg-orange-950/35 text-orange-300",
  Average: "border-yellow-300/40 bg-yellow-950/35 text-yellow-200",
  Good: "border-emerald-300/40 bg-green-950/35 text-green-300",
  "Very Good": "border-teal-300/50 bg-teal-950/40 text-teal-200"
};

const classes = {
  board: "grid h-full min-h-0 gap-3",
  column:
    "grid min-h-0 min-w-0 gap-2.5 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3",
  columnHeader: "flex items-start justify-between gap-2.5",
  columnTitle: "m-0 text-sm leading-tight text-[var(--color-text)]",
  columnCopy: "m-0 text-xs leading-snug text-[var(--color-text-muted)]",
  cardList: "grid min-h-0 content-start gap-2 overflow-auto pr-0.5",
  card:
    "relative grid justify-items-start gap-2 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 hover:border-[var(--color-border-strong)]",
  cardDisabled: "opacity-50 grayscale hover:opacity-70",
  cardHeader: "flex items-start justify-between gap-2.5",
  cardTitle: "m-0 pr-[60px] text-[13px] leading-tight text-[var(--color-text)]",
  cardCopy: "m-0 text-xs leading-snug text-[var(--color-text-muted)]",
  cardActions:
    "invisible absolute right-2 top-2 z-10 flex gap-1.5 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
  editActionButton: "icon-button h-6 w-6 scale-y-[-1] text-[11px]",
  deleteActionButton: "icon-button h-6 w-6 text-[11px] hover:border-red-500/60 hover:text-red-300",
  credibilityPill: "rounded-full border px-2.5 py-1 text-[11px] font-bold leading-none",
  sourceModal:
    "modal grid max-h-[min(720px,calc(100vh_-_80px))] max-w-[min(560px,calc(100vw_-_40px))] grid-rows-[auto_minmax(0,1fr)] gap-4 overflow-hidden",
  confirmModal: "modal grid w-[min(420px,calc(100vw_-_40px))] gap-4",
  confirmCopy: "m-0 text-[var(--color-text-muted)]",
  form: "grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-3",
  formFields: "grid min-h-0 gap-3 overflow-auto pr-0.5",
  field: "grid gap-1.5",
  fieldLabel: "text-xs font-bold uppercase tracking-[0.05em] text-[var(--color-text-muted)]",
  fieldControl:
    "w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)] focus:shadow-[0_0_0_3px_rgba(20,184,166,0.18)]",
  formActions: "flex items-center justify-end gap-2.5",
  toggleField: "mr-auto flex items-center gap-2.5 text-[13px] font-bold text-[var(--color-text-muted)]",
  toggleSwitchBase: "flex h-[26px] w-[46px] items-center rounded-full border p-0.5",
  toggleSwitchOn: "border-transparent bg-[var(--color-accent)]",
  toggleSwitchOff: "border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]",
  toggleKnobBase: "h-5 w-5 rounded-full transition",
  toggleKnobOn: "translate-x-5 bg-[#041014]",
  toggleKnobOff: "translate-x-0 bg-[var(--color-text-muted)]"
};

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
  const [editingSource, setEditingSource] = useState<EditingSource | null>(null);
  const [deletingSource, setDeletingSource] = useState<DeletingSource | null>(null);
  const [newSourceEnabled, setNewSourceEnabled] = useState(true);

  return (
    <>
      <div
        className={classes.board}
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
      >
        {sourceColumns.map((column) => (
          <section
            className={classes.column}
            key={column.id}
            style={{ gridTemplateRows: "auto auto minmax(0, 1fr)" }}
          >
            <div className={classes.columnHeader}>
              <h3 className={classes.columnTitle}>{column.title}</h3>
              <button
                aria-label={column.addLabel}
                className="icon-button"
                onClick={() => {
                  setNewSourceEnabled(true);
                  setEditingSource({ column });
                }}
                type="button"
              >
                +
              </button>
            </div>
            <p className={classes.columnCopy}>{column.description}</p>
            <div className={classes.cardList}>
              {[...column.sources]
                .sort((source, nextSource) => Number(nextSource.enabled) - Number(source.enabled))
                .map((source) => (
                  <article
                    className={cx("group", classes.card, !source.enabled && classes.cardDisabled)}
                    key={source.name}
                  >
                    <div className={classes.cardHeader}>
                      <h4 className={classes.cardTitle}>{source.name}</h4>
                      <div className={classes.cardActions}>
                        <button
                          aria-label={`Edit ${source.name}`}
                          className={classes.editActionButton}
                          onClick={() => {
                            setNewSourceEnabled(source.enabled);
                            setEditingSource({ column, source });
                          }}
                          type="button"
                        >
                          &#9998;
                        </button>
                        <button
                          aria-label={`Delete ${source.name}`}
                          className={classes.deleteActionButton}
                          onClick={() => {
                            setDeletingSource({
                              columnTitle: column.title,
                              sourceName: source.name
                            });
                          }}
                          type="button"
                        >
                          &#128465;
                        </button>
                      </div>
                    </div>
                    <p className={classes.cardCopy}>{source.detail}</p>
                    <span
                      className={cx(
                        classes.credibilityPill,
                        credibilityClassNames[source.credibility]
                      )}
                    >
                      {source.credibility}
                    </span>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>

      {editingSource && (
        <div className="modal-backdrop">
          <section
            aria-labelledby="source-modal-title"
            aria-modal="true"
            className={classes.sourceModal}
            role="dialog"
          >
            <div className="modal-header">
              <h2 id="source-modal-title">
                {editingSource.source
                  ? `Edit ${editingSource.source.name}`
                  : editingSource.column.addLabel}
              </h2>
              <button
                className="icon-button"
                onClick={() => {
                  setEditingSource(null);
                }}
                type="button"
              >
                x
              </button>
            </div>
            <form className={classes.form}>
              <div className={classes.formFields}>
                <label className={classes.field}>
                  <span className={classes.fieldLabel}>Source name</span>
                  <input
                    className={classes.fieldControl}
                    defaultValue={editingSource.source?.name}
                    placeholder="Name shown in the source board"
                    type="text"
                  />
                </label>
                {getSourceFields(editingSource.column.id).map((field) => (
                  <label className={classes.field} key={field.id}>
                    <span className={classes.fieldLabel}>{field.label}</span>
                    <input
                      className={classes.fieldControl}
                      placeholder={field.placeholder}
                      type="text"
                    />
                  </label>
                ))}
                <label className={classes.field}>
                  <span className={classes.fieldLabel}>Credibility rating</span>
                  <select
                    className={classes.fieldControl}
                    defaultValue={editingSource.source?.credibility ?? "Average"}
                  >
                    {credibilityRatings.map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={classes.field}>
                  <span className={classes.fieldLabel}>Notes</span>
                  <textarea
                    className={classes.fieldControl}
                    placeholder="Useful context, setup notes, or review instructions"
                    rows={4}
                  />
                </label>
              </div>
              <div className={classes.formActions}>
                <div className={classes.toggleField}>
                  <button
                    aria-checked={newSourceEnabled}
                    className={cx(
                      classes.toggleSwitchBase,
                      newSourceEnabled ? classes.toggleSwitchOn : classes.toggleSwitchOff
                    )}
                    onClick={() => {
                      setNewSourceEnabled((isEnabled) => !isEnabled);
                    }}
                    role="switch"
                    type="button"
                  >
                    <span
                      className={cx(
                        classes.toggleKnobBase,
                        newSourceEnabled ? classes.toggleKnobOn : classes.toggleKnobOff
                      )}
                    />
                  </button>
                  <span>{newSourceEnabled ? "On" : "Disabled"}</span>
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setEditingSource(null);
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

      {deletingSource && (
        <div className="modal-backdrop">
          <section
            aria-labelledby="delete-source-title"
            aria-modal="true"
            className={classes.confirmModal}
            role="dialog"
          >
            <div className="modal-header">
              <h2 id="delete-source-title">Delete source?</h2>
              <button
                className="icon-button"
                onClick={() => {
                  setDeletingSource(null);
                }}
                type="button"
              >
                x
              </button>
            </div>
            <p className={classes.confirmCopy}>
              This will remove {deletingSource.sourceName} from {deletingSource.columnTitle}.
            </p>
            <div className={classes.formActions}>
              <button
                className="ghost-button"
                onClick={() => {
                  setDeletingSource(null);
                }}
                type="button"
              >
                Cancel
              </button>
              <button className="danger-button" type="button">
                Delete
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
