import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Feed" }} />
      <Stack.Screen name="alerts/index" options={{ title: "Alerts" }} />
      <Stack.Screen name="saved/index" options={{ title: "Saved" }} />
      <Stack.Screen name="settings/index" options={{ title: "Settings" }} />
      <Stack.Screen name="(modals)/intelligence/[id]" options={{ presentation: "modal", title: "Intelligence" }} />
    </Stack>
  );
}

