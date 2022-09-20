import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import ReservedStack from "./stack/ReservedStack";
import BottomTabNavigator from "./BottomTabNavigator";

import { useRecoilValue } from "recoil";
import { currentGymAtom } from "../recoil/Atom";

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
    const currentGym = useRecoilValue(currentGymAtom);

    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: "#010440",
                    height: 60,
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.toggleDrawer()}
                        style={styles.headerLeft}
                    >
                        <Entypo name="menu" size={40} color="#fff" />
                    </TouchableOpacity>
                ),
                drawerStyle: { width: 240 },
                drawerLabelStyle: { fontSize: 18 }
            })}
        >
            <Drawer.Screen
                name="ホーム"
                component={BottomTabNavigator}
                options={{
                    headerTitle: () => currentGym && <Text style={styles.text}>{currentGym.name}</Text>,
                    drawerIcon: ({ color }) => (
                        <FontAwesome
                            name="home"
                            size={24}
                            color={color}
                            style={{ marginRight: -20 }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="ReservedStack"
                component={ReservedStack}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    headerLeft: {
        paddingLeft: 12,
    },
    headerRight: {
        paddingRight: 12,
    },
    text: {
        fontSize: 18,
        color: "#fff",
    },
});

export default DrawerNavigator;
