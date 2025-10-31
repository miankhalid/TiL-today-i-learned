import type { RootStackParamList } from './types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/auth/useAuth';
import { useThemeManager } from '@/theme/hooks/useTheme';

import { LoadingScreen } from '@/screens';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

// @refresh reset
function ApplicationNavigator() {
   
  const { navigationTheme } = useThemeManager();
  const { loading, session } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session ? (
            <Stack.Screen component={MainNavigator} name="Main" />
          ) : (
            <Stack.Screen component={AuthNavigator} name="Auth" />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;


