export function IntelligenceDetailModal() {
  return (
    <div className="modal-backdrop">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="intelligence-title">
        <div className="modal-header">
          <h2 id="intelligence-title">Full intelligence detail</h2>
          <button className="ghost-button" type="button">
            Close
          </button>
        </div>
        <div className="modal-body">
          <p className="subtle">Source link, timestamp, credibility, relevance, flag reason, and related duplicates.</p>
        </div>
      </section>
    </div>
  );
}
