import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ReserveCheckScreen from '../screens/reservation/ReserveCheckScreen';
import ReservedScreen from '../screens/reservation/ReservedScreen';
import ReserveDoneScreen from '../screens/reservation/ReserveDoneScreen';
import LogInScreen from '../screens/auth/LogInScreen';
import OpeningScreen from '../screens/OpeningScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LocationJudgeScreen from '../screens/LocationJudgeScreen';

import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../recoil/Atom';
import ReserveCancelScreen from '../screens/reservation/ReserveCancelScreen';
import TimeLimitScreen from '../screens/reservation/TimeLimitScreen';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const HomeStack = () => {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{
//                     headerShown: false,
//                     title: "ホーム",
//                 }}
//             />
//             <Stack.Screen
//                 name="ReserveCheck"
//                 component={ReserveCheckScreen}
//                 options={{ title: "予約状況" }}
//             />
//             <Stack.Screen
//                 name="ReserveDone"
//                 component={ReserveDoneScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="Reserved"
//                 component={ReservedScreen}
//                 options={{ title: "予約中マシン" }}
//             />
//         </Stack.Navigator>
//     )
// }


const AppNavigator = () => {
    const loginState = useRecoilValue(isLoginAtom);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"LocationJudge"}>
                {/* {loginState ? (
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                            title: "ホーム",
                        }}
                    />
                ) : (
                    <Stack.Screen
                        name="Opening"
                        component={OpeningScreen}
                        options={{ headerShown: false }}
                    />
                )} */}
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        title: "ホーム",
                    }}
                />
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
                <Stack.Screen
                    name="LocationJudge"
                    component={LocationJudgeScreen}
                    options={{ headerShown: false }}
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
        </NavigationContainer>
    );
}

export default AppNavigator;