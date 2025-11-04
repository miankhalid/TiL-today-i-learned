import type { MainStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import NewPostScreen from '@/screens/NewPost/NewPostScreen';

import TabNavigator from './TabNavigator';

const Stack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={TabNavigator} name="Tab" />
      <Stack.Screen component={NewPostScreen} name="NewPost" />
    </Stack.Navigator>
  );
}

export default MainNavigator;
