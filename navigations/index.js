// navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Finished from "../screens/Finished";
import Progress from "../screens/Progress"
import HomeStack from "../screens/Home";

// componetns & icons
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DrawerContent from "../components/DrawerContent"

// just react
import React from "react"
import HomeView from "../screens/View";


const Drawer = createDrawerNavigator()
const BottomTab = createBottomTabNavigator()

export const HomeBottoms = () => {
    return (
        <BottomTab.Navigator
            initialRouteName='Tabs'
            screenOptions={({ route }) => {
                return {
                    tabBarIcon: ({ focused, size, color }) => {
                        if (route.name == "Home") {
                            return <MaterialIcons name='backup-table' size={20} color={color} />
                        } else if (route.name == "Progress") {
                            return <FontAwesomeIcons name='download' size={20} color={color} />
                        } else {
                            return <FontAwesomeIcons name='folder' size={20} color={color} />
                        }
                    },
                    headerShown: false
                }
            }}>
            <BottomTab.Screen name='Tabs' component={HomeDrawer} />
            <BottomTab.Screen name='Progress' component={Progress} />
            <BottomTab.Screen name='Finished' component={Finished} />
        </BottomTab.Navigator>
    )
}

export default function HomeDrawer() {
    return (
        <Drawer.Navigator screenOptions={() => {
            return {
                headerShown: false,
                drawerStyle: {
                    paddingVertical: 20
                },
                
            }
        }}
            drawerContent={DrawerContent}>
            <Drawer.Screen name="Stack" component={HomeStack} />
            <Drawer.Screen name="View" component={HomeView} />
        </Drawer.Navigator>
    )
}
