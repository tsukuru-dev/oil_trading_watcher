import { IntelligenceCard } from "./IntelligenceCard";

export function IntelligenceFeed() {
  const cards = [
    "Pipeline outage rumor flagged across monitored energy desks",
    "Shipping delay mention near key crude export terminal",
    "OPEC delegate comment detected from verified wire source",
    "Refinery restart chatter appears in regional trade reports",
    "Weather disruption risk rising around Gulf infrastructure",
    "Duplicate social reports mention storage draw expectations"
  ];

  return (
    <aside className="panel">
      <div className="panel-header">
        <h2 className="panel-title">Intelligence Feed</h2>
        <button className="ghost-button" type="button">
          Filter
        </button>
      </div>
      <div className="panel-body feed-list">
        {cards.map((headline) => (
          <IntelligenceCard headline={headline} key={headline} />
        ))}
      </div>
    </aside>
  );
}
