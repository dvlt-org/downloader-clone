import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { NavigationContainer } from "@react-navigation/native"
import Progress from "./screens/Progress.jsx"
import Finished from "./screens/Finished.jsx"
import Drawer from "./navigations/index.js"
import { StyleSheet } from 'react-native';
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs"

const BottomTab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
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
        <BottomTab.Screen name='Tabs' component={Drawer} listeners={({ navigation }) => {
          return {
            tabPress: () => {
            }
          }
        }} />
        <BottomTab.Screen name='Progress' component={Progress} />
        <BottomTab.Screen name='Finished' component={Finished} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
