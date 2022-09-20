import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import ReserveCheckScreen from "../../screens/reservation/ReserveCheckScreen";
import ReserveDoneScreen from "../../screens/reservation/ReserveDoneScreen";

const Stack = createNativeStackNavigator();

const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"LocationJudge"}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="ReserveCheck"
                component={ReserveCheckScreen}
                options={{ title: "予約状況" }}
            />
            <Stack.Screen
                name="ReserveDone"
                component={ReserveDoneScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;
