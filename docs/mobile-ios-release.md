# iOS Release Setup

The Expo app is configured for EAS iOS builds.

## Current Identifiers

- Bundle ID: `com.oiltradingwatcher.app`
- URL scheme: `oilwatcher`

## Build Commands

From `apps/mobile`:

```bash
eas build --platform ios --profile preview
eas build --platform ios --profile production
```

## Before App Store Submission

- Set the final Apple bundle identifier if `com.oiltradingwatcher.app` should change.
- Run `eas init` or link the app to an Expo project so `extra.eas.projectId` is populated.
- Add the App Store Connect app ID to `submit.production.ios.ascAppId`.
- Configure Apple Developer credentials through EAS.

