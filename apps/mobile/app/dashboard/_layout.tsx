import type { AppStateStatus } from "react-native";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import { StyledStack } from "@/components/navigation/stack";
import { useIsLoggedIn } from "@/lib/session";
import { focusManager } from "@tanstack/react-query";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function Dashboard() {
  const router = useRouter();

  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    if (isLoggedIn !== undefined && !isLoggedIn) {
      return router.replace("server-address");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <StyledStack
      contentClassName="bg-gray-100 dark:bg-background"
      headerClassName="bg-gray-100 dark:bg-background text-foreground"
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Home" }}
      />
      <Stack.Screen
        name="favourites"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="bookmarks/[slug]/index"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="bookmarks/new"
        options={{
          headerTitle: "New Bookmark",
          headerBackTitle: "Back",
          headerTransparent: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="bookmarks/[slug]/manage_lists"
        options={{
          headerTitle: "Manage Lists",
          headerBackTitle: "Back",
          headerTransparent: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="bookmarks/[slug]/info"
        options={{
          headerBackTitle: "Back",
          headerTransparent: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="lists/new"
        options={{
          headerTitle: "New List",
          headerBackTitle: "Back",
          headerTransparent: true,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="archive"
        options={{
          headerTitle: "",
          headerBackTitle: "Back",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerTitle: "",
          headerBackTitle: "",
          headerTransparent: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings/theme"
        options={{
          title: "Theme",
          headerTitle: "Theme",
          headerBackTitle: "Back",
        }}
      />
    </StyledStack>
  );
}
