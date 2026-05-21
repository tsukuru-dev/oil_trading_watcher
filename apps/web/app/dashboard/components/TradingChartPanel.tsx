export function TradingChartPanel() {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2 className="panel-title">Trading Chart</h2>
        <div className="tabs">
          <button className="tab-button active" type="button">
            Brent
          </button>
          <button className="tab-button" type="button">
            WTI
          </button>
        </div>
      </div>
      <div className="chart-surface">
        <div className="chart-line" />
        <div className="chart-watermark">Live price panel</div>
      </div>
    </section>
  );
}
