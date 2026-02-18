import AuthGateProvider from "@/providers/auth-gate-provider";
import { Slot } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <AuthGateProvider>
      <Slot />
    </AuthGateProvider>
  );
}
