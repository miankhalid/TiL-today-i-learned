import type { PropsWithChildren } from 'react';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useThemeManager } from '@/theme/hooks/useTheme';

type Properties = PropsWithChildren<
  {} & Omit<SafeAreaViewProps, 'mode'>
>;

function SafeScreen({
  children = undefined,
  style,
  ...props
}: Properties) {
  const { navigationTheme, variant } = useThemeManager();

  return (
    <SafeAreaView {...props} mode="padding" style={[{ flex: 1 }, style]}>
      <StatusBar
        backgroundColor={navigationTheme.colors.background}
        barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}
      />
      {children}
    </SafeAreaView>
  );
}

export default SafeScreen;
