import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../components/DrawerContent"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "../screens/Home";
import FeedBack from "../screens/FeedBack"
import Settings from "../screens/Settings"

import React from "react"
import FolderLock from "../screens/FolderLock";

const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()


const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={() => {
                return {
                    headerShown: false
                }
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="FeedBack" component={FeedBack} />
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="FolderLock" component={FolderLock}/>
        </Stack.Navigator>
    )
}


export default function HomeDrawer() {
    return (
        <Drawer.Navigator screenOptions={() => {
            return {
                headerShown: false,
                drawerStyle: {
                    paddingVertical: 20
                }
            }
        }}
            drawerContent={DrawerContent}>
            <Drawer.Screen name="Stack" component={HomeStack} />
        </Drawer.Navigator>
    )
}
