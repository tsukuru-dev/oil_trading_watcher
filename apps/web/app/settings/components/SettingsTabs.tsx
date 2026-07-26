"use client";

import Link from "next/link";
import { useState } from "react";

import { AlertSettings } from "./AlertSettings";
import { AppSettings } from "./AppSettings";
import { RulesSettings } from "./RulesSettings";
import { SourcesSettings } from "./SourcesSettings";

type SettingsTab = "sources" | "rules" | "alerts" | "app";

const tabs = [
  { id: "sources", label: "Sources" },
  { id: "rules", label: "Rules" },
  { id: "alerts", label: "Alerts" },
  { id: "app", label: "App" }
] satisfies { id: SettingsTab; label: string }[];

export function SettingsTabs() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("sources");

  return (
    <div className="settings-layout">
      <div className="settings-header">
        <Link aria-label="Back to dashboard" className="back-button" href="/dashboard">
          &larr;
        </Link>
        <div className="brand-lockup">
          <p className="eyebrow">Configuration</p>
          <h1 className="page-title">Settings</h1>
        </div>
      </div>
      <div className="settings-main">
        <div className="tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                aria-pressed={isActive}
                className={`tab-button${isActive ? " active" : ""}`}
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="settings-content">
          {activeTab === "sources" && <SourcesSettings />}
          {activeTab === "rules" && <RulesSettings />}
          {activeTab === "alerts" && <AlertSettings />}
          {activeTab === "app" && <AppSettings />}
        </div>
      </div>
    </div>
  );
}
