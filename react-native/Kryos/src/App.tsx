import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { Button, View } from 'react-native';

import ApplicationNavigator from '@/navigation/Application';
import { ThemeProvider } from '@/theme';
import { useThemeManager } from '@/theme/hooks/useTheme';
import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

import '@/translations';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const storage = new MMKV();

// Example component to test theme
const Main = () => {
  const { variant, changeTheme } = useThemeManager();

  return (
    <Box flex={1} backgroundColor="mainBackground" justifyContent="center" alignItems="center">
      <Text variant="header">Theme Demo</Text>
      <Text variant="body" marginVertical="m">
        Current Theme: {variant}
      </Text>
      <Button
        title="Toggle Theme"
        onPress={() => changeTheme(variant === 'light' ? 'dark' : 'light')}
      />
      {/* We will render the actual navigator here later */}
      {/* <ApplicationNavigator /> */}
    </Box>
  );
};

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storage={storage}>
          <Main />
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

export default App;
