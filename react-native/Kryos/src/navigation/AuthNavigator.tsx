import type { AuthStackParamList } from './types';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '@/screens/Auth/LoginScreen';
import SignupScreen from '@/screens/Auth/SignupScreen';
import FeedScreen from '@/screens/Feed/FeedScreen';

const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Feed" screenOptions={{ headerShown: false }}>
      <Stack.Screen component={FeedScreen} name="Feed" />
      <Stack.Screen component={LoginScreen} name="Login" />
      <Stack.Screen component={SignupScreen} name="Signup" />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
