import type { AuthStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@/screens/Auth/LoginScreen';
import SignupScreen from '@/screens/Auth/SignupScreen';
import FeedScreen from '@/screens/Feed/FeedScreen';

import { Paths } from './paths';

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={Paths.Feed}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={FeedScreen} name={Paths.Feed} />
      <Stack.Screen component={LoginScreen} name={Paths.Login} />
      <Stack.Screen component={SignupScreen} name={Paths.Signup} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
