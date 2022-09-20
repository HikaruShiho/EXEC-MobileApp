import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInScreen from "../screens/auth/LogInScreen";
import OpeningScreen from "../screens/OpeningScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import LocationJudgeScreen from "../screens/LocationJudgeScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Opening"}
    >
      <Stack.Screen
        name="Opening"
        component={OpeningScreen} />
      <Stack.Screen
        name="Register"
        component={RegisterScreen} />
      <Stack.Screen
        name="LogIn"
        component={LogInScreen} />
      <Stack.Screen
        name="LocationJudge"
        component={LocationJudgeScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
