import type { MMKV } from 'react-native-mmkv';

import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import { createContext, useCallback, useMemo, useState } from 'react';

import { darkTheme, theme as lightTheme } from '@/theme/restyleTheme';

export type ThemeContextType = {
  changeTheme: (variant: ThemeVariant) => void;
  navigationTheme: NavigationTheme;
  variant: ThemeVariant;
};

type ThemeVariant = 'dark' | 'light';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

type Properties = {
  readonly children: React.ReactNode;
  readonly storage: MMKV;
};

function ThemeProvider({ children, storage }: Properties) {
  const [variant, setVariant] = useState<ThemeVariant>(
    (storage.getString('theme') as ThemeVariant) || 'light',
  );



  const changeTheme = useCallback(
    (nextVariant: ThemeVariant) => {
      setVariant(nextVariant);
      storage.set('theme', nextVariant);
    },
    [storage],
  );

  const currentTheme = variant === 'dark' ? darkTheme : lightTheme;

  const navigationTheme = useMemo(() => {
    const navTheme = variant === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...navTheme,
      colors: {
        ...navTheme.colors,
        background: currentTheme.colors.bgBackground,
        card: currentTheme.colors.bgSurface,
        primary: currentTheme.colors.bgPrimary,
        text: currentTheme.colors.textPrimary,
      },
    };
  }, [variant, currentTheme]);

  const value = useMemo(
    () => ({ changeTheme, navigationTheme, variant }),
    [variant, changeTheme, navigationTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <RestyleThemeProvider theme={currentTheme}>{children}</RestyleThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
