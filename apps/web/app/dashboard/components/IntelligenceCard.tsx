type IntelligenceCardProps = {
  headline: string;
};

export function IntelligenceCard({ headline }: IntelligenceCardProps) {
  return (
    <article className="intelligence-card">
      <div className="score-row">
        <span className="status-pill danger">High impact</span>
        <span className="status-pill positive">Credible 82%</span>
      </div>
      <h3 className="card-title">{headline}</h3>
      <p className="card-copy">Detected from monitored sources and queued for review.</p>
      <div className="card-meta">Reuters · 2 min ago · Duplicate reports: 3</div>
    </article>
  );
}
