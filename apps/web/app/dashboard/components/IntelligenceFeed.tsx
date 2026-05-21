import { IntelligenceCard } from "./IntelligenceCard";

export function IntelligenceFeed() {
  return (
    <aside className="panel">
      <div className="panel-header">
        <h2 className="panel-title">Intelligence Feed</h2>
        <button className="ghost-button" type="button">
          Filter
        </button>
      </div>
      <div className="panel-body feed-list">
        <IntelligenceCard />
        <IntelligenceCard />
      </div>
    </aside>
  );
}
