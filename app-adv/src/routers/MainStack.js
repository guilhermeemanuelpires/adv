import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ViewMap,
  Login,
  Profile,
  Register,
  RecoverPassword,
  AddressRegister,
  Settings,
  ProfileMap
} from "../views/";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="ViewMap"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ViewMap" component={ViewMap} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="AddressRegister" component={AddressRegister} />
    <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="ProfileMap" component={ProfileMap} />
  </Stack.Navigator>
);
