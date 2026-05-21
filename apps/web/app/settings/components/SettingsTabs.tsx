import { AlertSettings } from "./AlertSettings";
import { AppSettings } from "./AppSettings";
import { RulesSettings } from "./RulesSettings";
import { SourcesSettings } from "./SourcesSettings";

export function SettingsTabs() {
  return (
    <main>
      <SourcesSettings />
      <RulesSettings />
      <AlertSettings />
      <AppSettings />
    </main>
  );
}

