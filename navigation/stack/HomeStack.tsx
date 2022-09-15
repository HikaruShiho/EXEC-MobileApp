import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import ReserveCheckScreen from "../../screens/reservation/ReserveCheckScreen";
import ReserveDoneScreen from "../../screens/reservation/ReserveDoneScreen";
import LogInScreen from "../../screens/auth/LogInScreen";
import OpeningScreen from "../../screens/OpeningScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import LocationJudgeScreen from "../../screens/LocationJudgeScreen";

import { useRecoilValue } from "recoil";
import { currentGymAtom, isLoginAtom } from "../../recoil/Atom";

const Stack = createNativeStackNavigator();

const HomeStack: React.FC = () => {
    const loginState = useRecoilValue(isLoginAtom);
    const currentGym = useRecoilValue(currentGymAtom);

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={"Opening"}>
            {loginState === null ?(
                <>
                    <Stack.Screen
                        name="Opening"
                        component={OpeningScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LogIn"
                        component={LogInScreen}
                        options={{ headerShown: false }}
                    />
                </>
            ): currentGym === null ? (
                <Stack.Screen
                    name="LocationJudge"
                    component={LocationJudgeScreen}
                    options={{ headerShown: false, title: 'LocationJudge' }}
                />
            ) : (
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                />
            )}
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
