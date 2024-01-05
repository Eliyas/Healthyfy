import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/home/HomeScreen";
import UCLoggingScreen from "../screens/uc_logging/UCLoggingScreen";
import MyStatsScreen from "../screens/MyStatsScreen";
import ReportPopup from "../components/ReportPopup";
import MyUCHealingRecommendations from "../screens/home/MyUCHealingRecommendations";
import WeightReport from "../screens/reports/WeightReport";
import MoodReport from "../screens/reports/MoodReport";

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
       <Stack.Screen name="MyStats" component={MyStatsScreen} />
       <Stack.Screen name="ReportModal" component={ReportPopup} />
       <Stack.Screen name="MyUCHealingRecommendations" component={MyUCHealingRecommendations} />
       <Stack.Screen name="WeightReport" component={WeightReport} />
       <Stack.Screen name="MoodReport" component={MoodReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
