import React from "react";
import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./stack/HomeStack";
import ReservedStack from "./stack/ReservedStack";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator screenOptions={() => ({
            headerShown: false,
            tabBarStyle: { height: 66 }
        })}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={({ route }) => ({
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="home"
                            size={36}
                            color={focused ? "#BFF205" : "#010440"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => <Text style={[
                        styles.tabBarLabel,
                        {
                            color: focused ? "#BFF205" : "#010440"
                        }
                    ]}>ホーム</Text>,
                })}
            />
            <Tab.Screen
                name="ReservedStack"
                component={ReservedStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialCommunityIcons
                            name="timetable"
                            size={36}
                            color={focused ? "#BFF205" : "#010440"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => <Text style={[
                        styles.tabBarLabel,
                        {
                            color: focused ? "#BFF205" : "#010440"
                        }
                    ]}>予約済み</Text>,
                }}
            />
        </Tab.Navigator>
    );
};
const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 14,
        marginTop: -10,
        paddingBottom: 6
    },
});

export default BottomTabNavigator;
