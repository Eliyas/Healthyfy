import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/home/HomeScreen";
import UCLoggingScreen from "../screens/uc_logging/UCLoggingScreen";

const Stack = createStackNavigator();

export default function RootNavigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="UCLogging" component={UCLoggingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
