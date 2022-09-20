import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthNavigator from "./AuthNavigator";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { currentGymAtom, isLoginAtom } from "../recoil/Atom";

const AppNavigator: React.FC = () => {
    const isLogin = useRecoilValue(isLoginAtom);
    const currentGym = useRecoilValue(currentGymAtom);
    return (
        <NavigationContainer>
            {isLogin && currentGym ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;
