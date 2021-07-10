import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/routers/MainStack";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    AveriaSansLibre_300Light: require("./assets/fonts/AveriaSansLibre-Light.ttf"),
    AveriaSansLibre_400Regular: require("./assets/fonts/AveriaSansLibre-Regular.ttf"),
    AveriaSansLibre_700Bold: require("./assets/fonts/AveriaSansLibre-Regular.ttf"),
    RobotoBlack: require("./assets/fonts/Roboto-Black.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
    RobotoLight: require("./assets/fonts/Roboto-Light.ttf"),
    RobotoMedium: require("./assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoThin: require("./assets/fonts/Roboto-Thin.ttf"),
  });
  if (!fontsLoaded) {
    style = {
      flex: 1,
      backgroundColor: "#4D4845",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <View style={style}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MainStack />
    </NavigationContainer>
  );
}
