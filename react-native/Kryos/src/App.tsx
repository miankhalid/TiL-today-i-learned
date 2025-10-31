import 'react-native-gesture-handler';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/theme';
import { useThemeManager } from '@/theme/hooks/useTheme';
import '@/translations';

import Box from '@/components/atoms/Box';
import Text from '@/components/atoms/Text';

import { store } from '@/store';

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

export const storage: MMKV = new MMKV();

// Example component to test theme and redux
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider storage={storage}>
            <Main />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

function Main() {
  const { changeTheme, variant } = useThemeManager();

  return (
    <Box
      alignItems="center"
      backgroundColor="mainBackground"
      flex={1}
      justifyContent="center"
    >
      <Text variant="header">Theme Demo</Text>
      <Text marginVertical="m" variant="body">
        Current Theme: {variant}
      </Text>
      <Button
        onPress={() => { changeTheme(variant === 'light' ? 'dark' : 'light'); }}
        title="Toggle Theme"
      />
      {/* We will render the actual navigator here later */}
      {/* <ApplicationNavigator /> */}
    </Box>
  );
}

export default App;

