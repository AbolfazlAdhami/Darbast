import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar style="dark" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default Layout;
