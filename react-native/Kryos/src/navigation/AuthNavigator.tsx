import type { AuthStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@/screens/Auth/LoginScreen';
import SignupScreen from '@/screens/Auth/SignupScreen';
import FeedScreen from '@/screens/Feed/DummyFeedScreen';

import { Paths } from './paths';

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Paths.DummyFeed}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={FeedScreen} name={Paths.DummyFeed} />
      <Stack.Screen component={LoginScreen} name={Paths.Login} />
      <Stack.Screen component={SignupScreen} name={Paths.Signup} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
