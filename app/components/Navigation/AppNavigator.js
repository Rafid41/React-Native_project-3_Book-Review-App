// app\components\Navigation\AppNavigator.js
// controls all navigation fuctionalities
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home/Home";
import Auth from "../Auth/Auth";

import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        // initialRouteName="Home" means first app open e "Home" ashbe
        <Drawer.Navigator
            initialRouteName="Auth"
            // hides Navbar
            //screenOptions={{ headerShown: false }}
        >
            <Drawer.Screen
                name="Auth"
                component={Auth}
                options={{
                    headerShown: false,
                    swipeEnabled: false,
                    drawerLabel: "Logout",
                }}
            />
            <Drawer.Screen name="Home" component={Home} />
            {/* <Drawer.Screen
                name="Categories"
                component={Categories}
                options={{
                    drawerLabel: () => null,
                    // hides it from sliding window
                    drawerItemStyle: { display: "none" },
                }}
            /> */}
        </Drawer.Navigator>
    );
};

export default AppNavigator;
