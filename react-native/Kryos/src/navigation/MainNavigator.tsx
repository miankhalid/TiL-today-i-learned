import type { MainStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@/screens/Home/HomeScreen';

const Stack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={HomeScreen} name="Home" />
    </Stack.Navigator>
  );
}

export default MainNavigator;
