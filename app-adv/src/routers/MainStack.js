import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    ViewMap,
    Login,
    Profile,
    Register,
    RecoverPassword
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
        <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
    </Stack.Navigator>
);