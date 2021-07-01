import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/routers/MainStack";
import { StatusBar } from "expo-status-bar";

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MainStack />
    </NavigationContainer>
  );
}