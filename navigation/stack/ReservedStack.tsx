import React from "react";
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

import { useRecoilValue } from 'recoil';
import { reservedInfoAtom } from '../../recoil/Atom';

const Stack = createNativeStackNavigator();

const ReservedStack: React.FC = () => {
  const reservedInfo = useRecoilValue(reservedInfoAtom);
  
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
