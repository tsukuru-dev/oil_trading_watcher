import { IntelligenceFeed } from "./IntelligenceFeed";
import { TopPriceBar } from "./TopPriceBar";
import { TradingChartPanel } from "./TradingChartPanel";

export function DashboardShell() {
  return (
    <main>
      <TopPriceBar />
      <section>
        <IntelligenceFeed />
        <TradingChartPanel />
      </section>
    </main>
  );
}

