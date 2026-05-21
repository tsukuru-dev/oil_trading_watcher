import Link from "next/link";

export function TopPriceBar() {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <p className="eyebrow">Oil Trading Watcher</p>
        <h1 className="page-title">Market Intelligence</h1>
      </div>
      <div className="topbar-actions">
        <div className="price-strip" aria-label="Current prices and alerts">
          <span className="price-pill">
            Brent <strong>$84.20</strong>
          </span>
          <span className="price-pill">
            WTI <strong>$79.64</strong>
          </span>
          <span className="status-pill warning">2 alerts</span>
        </div>
        <Link className="ghost-button" href="/settings">
          Settings
        </Link>
      </div>
    </header>
  );
}
