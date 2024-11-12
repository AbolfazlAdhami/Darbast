import React from "react";
import { Stack, Tabs } from "expo-router";

import { icons } from "@/constant";
import { IconTabBar } from "@/components";
import { Platform } from "react-native";

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffff",
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 25,
          marginBottom: 20,
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "خانه", tabBarIcon: ({ focused }) => <IconTabBar focused={focused} source={icons.home} /> }} />
      <Tabs.Screen name="chats" options={{ title: "چت ها", tabBarIcon: ({ focused }) => <IconTabBar focused={focused} source={icons.chat} /> }} />
      <Tabs.Screen name="rides" options={{ title: "دربست ها", tabBarIcon: ({ focused }) => <IconTabBar focused={focused} source={icons.list} /> }} />
      <Tabs.Screen name="profile" options={{ title: "پروفایل", tabBarIcon: ({ focused }) => <IconTabBar focused={focused} source={icons.profile} /> }} />
    </Tabs>
  );
};

export default Layout;
