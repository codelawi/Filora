// app/_layout.tsx

import { BottomSheetProvider } from "@/providers/bottom-sheet-provider";
import { PortalHost } from "@rn-primitives/portal";
import { Slot } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toaster } from "sonner-native";

import "@/global.css";
import LoadingFontsProvider from "@/providers/loading-fonts-provider";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetProvider>
          <LoadingFontsProvider>
            <Slot />
          </LoadingFontsProvider>
          <PortalHost />
          <Toaster />
        </BottomSheetProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
