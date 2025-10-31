import { useThemeManager } from '@/theme/hooks/useTheme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import type { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

// @refresh reset
function ApplicationNavigator() {
  const { navigationTheme } = useThemeManager();

  // For now, we'll use a placeholder to determine which navigator to show.
  // In the next step, we will replace this with the actual auth state.
  const isAuthenticated = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
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

