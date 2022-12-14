import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import ReserveCheckScreen from "../../screens/reservation/ReserveCheckScreen";
import ReservedScreen from "../../screens/reservation/ReservedScreen";
import ReserveDoneScreen from "../../screens/reservation/ReserveDoneScreen";
import LogInScreen from "../../screens/auth/LogInScreen";
import OpeningScreen from "../../screens/OpeningScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import LocationJudgeScreen from "../../screens/LocationJudgeScreen";
import ReserveCancelScreen from "../../screens/reservation/ReserveCancelScreen";
import TimeLimitScreen from "../../screens/reservation/TimeLimitScreen";

const Stack = createNativeStackNavigator();

const LocationStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LocationJudge"
        component={LocationJudgeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LocationStack;
