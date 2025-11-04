import type { MainStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '@/screens/Feed/FeedScreen';
import HomeScreen from '@/screens/Home/HomeScreen';
import NewPostScreen from '@/screens/NewPost/NewPostScreen';

import { Paths } from './paths';

const Stack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName={Paths.Home} screenOptions={{ headerShown: false }}>
      <Stack.Screen component={HomeScreen} name={Paths.Home} />
      <Stack.Screen component={FeedScreen} name={Paths.Feed} />
      <Stack.Screen component={NewPostScreen} name={Paths.NewPost} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
