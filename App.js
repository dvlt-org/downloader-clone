import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import FeedbackSlider from "./screens/FeedbackSlider.jsx"
import VideoInfo from "./screens/VideoInfoSheet.jsx"
import { HomeBottoms } from "./navigations/index.js"
import FolderLock from "./screens/FolderLock.jsx"
import Settings from "./screens/Settings.jsx"
import FeedBack from "./screens/FeedBack.jsx"

import { Provider } from "react-redux"
import { store } from "./state/store.js"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={() => {
            return {
              headerShown: false
            }
          }}>
          <Stack.Screen name="Home" component={HomeBottoms} />
          <Stack.Screen name="FeedBack" component={FeedBack} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="FolderLock" component={FolderLock} />
          <Stack.Screen name="FeedbackSlider" component={FeedbackSlider} />
          <Stack.Screen name="VideoInfo" component={VideoInfo} options={{
            presentation: "formSheet",
            sheetAllowedDetents: "all",
            headerTitle: "Video Name",
            sheetCornerRadius: 50
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
