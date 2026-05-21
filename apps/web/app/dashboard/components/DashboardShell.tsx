import { IntelligenceFeed } from "./IntelligenceFeed";
import { TopPriceBar } from "./TopPriceBar";
import { TradingChartPanel } from "./TradingChartPanel";

export function DashboardShell() {
  return (
    <main className="app-shell">
      <TopPriceBar />
      <section className="dashboard-grid">
        <IntelligenceFeed />
        <TradingChartPanel />
      </section>
    </main>
  );
}
