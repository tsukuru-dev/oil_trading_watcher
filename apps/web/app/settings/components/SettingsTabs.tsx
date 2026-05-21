import { AlertSettings } from "./AlertSettings";
import { AppSettings } from "./AppSettings";
import { RulesSettings } from "./RulesSettings";
import { SourcesSettings } from "./SourcesSettings";

export function SettingsTabs() {
  return (
    <div className="settings-layout">
      <div className="brand-lockup">
        <p className="eyebrow">Configuration</p>
        <h1 className="page-title">Settings</h1>
      </div>
      <div className="tabs">
        <button className="tab-button active" type="button">
          Sources
        </button>
        <button className="tab-button" type="button">
          Rules
        </button>
        <button className="tab-button" type="button">
          Alerts
        </button>
        <button className="tab-button" type="button">
          App
        </button>
      </div>
      <div className="settings-grid">
        <SourcesSettings />
        <RulesSettings />
        <AlertSettings />
        <AppSettings />
      </div>
    </div>
  );
}
