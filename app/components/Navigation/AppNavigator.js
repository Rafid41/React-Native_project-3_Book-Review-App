// app\components\Navigation\AppNavigator.js
// controls all navigation fuctionalities
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screen/Home/Home";
import Auth from "../Auth/Auth";
import Categories from "../Screen/Categories/Categories";
import BookDetail from "../Screen/BookDetail/BookDetail";
import Category_details from "../Screen/Categories/Category_details";

import { useNavigation } from "@react-navigation/native";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        // initialRouteName="Home" means first app open e "Home" ashbe
        <Drawer.Navigator
            initialRouteName="Home"
            // hides Navbar
            screenOptions={{
                // headerShown: false,
                drawerStyle: {
                    backgroundColor: "#b0edff",
                    width: 240,
                },
            }}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Categories" component={Categories} />

            <Drawer.Screen
                name="Auth"
                component={Auth}
                options={{
                    headerShown: false,
                    swipeEnabled: false,
                    drawerLabel: "Logout",
                }}
            />
            {/* Hidden navigation */}
            <Drawer.Screen
                name="Book Details"
                component={BookDetail}
                options={{
                    drawerLabel: () => null,
                    // hides it from sliding window
                    drawerItemStyle: { display: "none" },
                }}
            />
            <Drawer.Screen
                name="Category Details"
                component={Category_details}
                options={{
                    drawerLabel: () => null,
                    // hides it from sliding window
                    drawerItemStyle: { display: "none" },
                }}
            />
        </Drawer.Navigator>
    );
};

export default AppNavigator;
