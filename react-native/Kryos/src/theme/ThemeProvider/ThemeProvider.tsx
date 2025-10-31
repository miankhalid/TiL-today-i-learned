import type { PropsWithChildren } from 'react';
import type { MMKV } from 'react-native-mmkv';

import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from '@react-navigation/native';
import { ThemeProvider as RestyleThemeProvider } from '@shopify/restyle';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { darkTheme, theme as lightTheme } from '@/theme/restyleTheme';

type ThemeVariant = 'light' | 'dark';

type ThemeContextType = {
  variant: ThemeVariant;
  changeTheme: (variant: ThemeVariant) => void;
  navigationTheme: NavigationTheme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

type Properties = PropsWithChildren<{
  readonly storage: MMKV;
}>;

function ThemeProvider({ children, storage }: Properties) {
  const [variant, setVariant] = useState<ThemeVariant>(
    (storage.getString('theme') as ThemeVariant) || 'light',
  );

  useEffect(() => {
    const storedTheme = storage.getString('theme') as ThemeVariant | undefined;
    if (storedTheme) {
      setVariant(storedTheme);
    } else {
      storage.set('theme', 'light');
    }
  }, [storage]);

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
        background: currentTheme.colors.mainBackground,
        card: currentTheme.colors.cardBackground,
        text: currentTheme.colors.mainForeground,
        primary: currentTheme.colors.primary,
      },
    };
  }, [variant, currentTheme]);

  const value = useMemo(
    () => ({ variant, changeTheme, navigationTheme }),
    [variant, changeTheme, navigationTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <RestyleThemeProvider theme={currentTheme}>{children}</RestyleThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
