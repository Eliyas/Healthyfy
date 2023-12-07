import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './src/amplifyconfiguration.json';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/home/HomeScreen';
import UCLoggingScreen from './screens/uc_logging/UCLoggingScreen';
import { TransitionPresets } from '@react-navigation/stack';
Amplify.configure(amplifyconfig);


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UCLogging" component={UCLoggingScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const Container = styled(View)`
  flex: 1;
`;
