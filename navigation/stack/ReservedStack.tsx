import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReservedScreen from "../../screens/reservation/ReservedScreen";
import ReserveCancelScreen from "../../screens/reservation/ReserveCancelScreen";
import TimeLimitScreen from "../../screens/reservation/TimeLimitScreen";

const Stack = createNativeStackNavigator();

const ReservedStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={"Reserved"}>
      <Stack.Screen
        name="Reserved"
        component={ReservedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReserveCancel"
        component={ReserveCancelScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TimeLimit"
        component={TimeLimitScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ReservedStack;
