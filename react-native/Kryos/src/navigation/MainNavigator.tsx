import type { MainStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '@/screens/Feed/FeedScreen';
import HomeScreen from '@/screens/Home/HomeScreen';

const Stack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={FeedScreen} name="Feed" />
    </Stack.Navigator>
  );
}

export default MainNavigator;
