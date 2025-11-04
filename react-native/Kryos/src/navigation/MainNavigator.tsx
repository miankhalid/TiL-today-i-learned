import type { MainStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import NewPostScreen from '@/screens/NewPost/NewPostScreen';

import { Paths } from './paths';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName={Paths.Tab} screenOptions={{ headerShown: false }}>
      <Stack.Screen component={TabNavigator} name={Paths.Tab} />
      <Stack.Screen component={NewPostScreen} name={Paths.NewPost} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
